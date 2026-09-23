"""Audit built HTML using Python standard library: python scripts/audit-seo.py."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import json, collections, xml.etree.ElementTree as ET, hashlib, re
root=Path(__file__).resolve().parents[1]
class Page(HTMLParser):
 def __init__(self,html):
  super().__init__();self.meta={};self.canon=[];self.h1=0;self.title='';self.in_title=False;self.jsons=[];self.in_json=False;self.buf='';self.links=[];self.assets=[];self.ids=set();self.imgissues=[];self.visible=[];self.in_body=False;self.hidden=0;self.feed(html)
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='body':self.in_body=True
  if tag in ['script','style']:self.hidden+=1
  if tag=='title':self.in_title=True
  if tag=='h1':self.h1+=1
  if a.get('id'):self.ids.add(a['id'])
  if tag=='meta':self.meta[a.get('name',a.get('property',''))]=a.get('content','')
  if tag=='link' and a.get('rel')=='canonical':self.canon.append(a.get('href'))
  if tag=='a' and a.get('href'):self.links.append(a['href'])
  if tag in ['img','video','script']:
   for key in ['src','poster','data-src']:
    if a.get(key):self.assets.append(a[key])
  if tag=='img' and 'alt' not in a:self.imgissues.append(a.get('src'))
  if tag=='script' and a.get('type')=='application/ld+json':self.in_json=True;self.buf=''
 def handle_endtag(self,tag):
  if tag=='title':self.in_title=False
  if tag=='body':self.in_body=False
  if tag=='script' and self.in_json:self.jsons.append(json.loads(self.buf));self.in_json=False
  if tag in ['script','style']:self.hidden=max(0,self.hidden-1)
 def handle_data(self,data):
  if self.in_title:self.title+=data
  if self.in_json:self.buf+=data
  if self.in_body and not self.hidden and data.strip():self.visible.append(data.strip())
def route(p):
 rel=p.relative_to(root/'dist').as_posix()
 return '/' if rel=='index.html' else '/'+rel.removesuffix('/index.html').removesuffix('.html')
pages={route(p):Page(p.read_text(encoding='utf-8')) for p in (root/'dist').rglob('*.html')}
errors=[];notes=[];rows=[];canonicals={};titles=collections.defaultdict(list);descriptions=collections.defaultdict(list)
for path,p in pages.items():
 if len(p.canon)!=1:errors.append(f'{path}: canonical count {len(p.canon)}');continue
 canonical=p.canon[0];cp=urlsplit(canonical).path
 canonical_page=path==cp and 'noindex' not in p.meta.get('robots','')
 if not canonical.startswith('https://www.scottishenergyservices.co.uk/'):errors.append(f'{path}: wrong canonical origin')
 if cp not in pages:errors.append(f'{path}: canonical target missing {cp}')
 if not p.title or not p.meta.get('description'):errors.append(f'{path}: metadata missing')
 if not p.jsons:errors.append(f'{path}: JSON-LD missing')
 for key in ['og:title','og:description','og:image','og:url','og:site_name','og:locale','twitter:image','twitter:title']:
  if not p.meta.get(key):errors.append(f'{path}: missing {key}')
 if p.h1!=1:
  (notes if path=='/' else errors).append(f'{path}: {p.h1} H1s; homepage excluded from body edits by request' if path=='/' else f'{path}: {p.h1} H1s')
 if p.imgissues:errors.append(f'{path}: missing image alt {p.imgissues}')
 if canonical_page:titles[p.title].append(path);descriptions[p.meta['description']].append(path);canonicals[path]=p
 for href in p.links+p.assets:
  u=urlsplit(href)
  if u.scheme or u.netloc or not u.path.startswith('/'):continue
  target=unquote(u.path).rstrip('/') or '/'
  if target in pages:
   if u.fragment and unquote(u.fragment) not in pages[target].ids:errors.append(f'{path}: broken anchor {href}')
  elif not (root/'dist'/target.lstrip('/')).is_file():errors.append(f'{path}: missing internal URL {href}')
 rows.append({'path':path,'canonical':canonical,'title':p.title,'description':p.meta['description'],'h1':p.h1,'canonicalIndexable':canonical_page})
for label,groups in [('title',titles),('description',descriptions)]:
 for value,paths in groups.items():
  if len(paths)>1:errors.append(f'Duplicate canonical {label}: {paths}')
ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9'}
sitemap=set()
for p in (root/'dist').glob('sitemap-*.xml'):
 tree=ET.parse(p)
 for loc in tree.findall('s:url/s:loc',ns):sitemap.add(urlsplit(loc.text).path)
if sitemap!=set(canonicals):errors.append(f'Sitemap mismatch missing={set(canonicals)-sitemap}, extra={sitemap-set(canonicals)}')
# Every canonical URL must be reachable from home through crawlable links.
seen=set();queue=['/']
while queue:
 path=queue.pop()
 if path in seen or path not in pages:continue
 seen.add(path)
 queue.extend((urlsplit(h).path.rstrip('/') or '/') for h in pages[path].links if h.startswith('/'))
if set(canonicals)-seen:errors.append(f'Orphan canonical pages: {set(canonicals)-seen}')
for path in ['/','/projects']:
 baseline=root/'output/seo'/('before-'+('index.html' if path=='/' else 'projects-index.html'))
 if baseline.exists() and Page(baseline.read_text(encoding='utf-8')).visible!=pages[path].visible:errors.append(f'{path}: protected visible body text changed')
hashes=root/'output/seo/protected-hashes.json'
if hashes.exists():
 for path,digest in json.loads(hashes.read_text()).items():
  if hashlib.sha256((root/path).read_bytes()).hexdigest()!=digest:errors.append(f'Protected file changed: {path}')
report={'pages':len(pages),'canonicalPages':len(canonicals),'sitemapURLs':len(sitemap),'errors':errors,'notes':notes,'routes':rows}
(root/'output/seo').mkdir(parents=True,exist_ok=True)
(root/'output/seo/audit-results.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
print(json.dumps({k:v for k,v in report.items() if k!='routes'},indent=2))
raise SystemExit(bool(errors))
