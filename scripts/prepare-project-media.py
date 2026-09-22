from pathlib import Path
import subprocess,json,hashlib,argparse,os
parser=argparse.ArgumentParser(description='Create silent web project loops and posters without modifying source media.')
parser.add_argument('--source', type=Path, default=Path(r'D:\Jayveer\Documents\Website Videos'))
parser.add_argument('--only', help='Encode only this project slug')
args=parser.parse_args()
source=args.source.resolve()
os.chdir(Path(__file__).resolve().parents[1])
for folder in ['public/videos/projects','public/images/projects','output/portfolio']:
 Path(folder).mkdir(parents=True,exist_ok=True)
clips=[('Glasgow Airport.mp4','glasgow-airport',0),('Edinburgh University.mp4','university-of-edinburgh',2),('St James Quarter.mp4','st-james-centre',9),('Armadillo.mp4','sec-armadillo',10),('Kelvingrove Art Gallery.mp4','kelvingrove-art-gallery',8)]
if args.only:
 clips=[clip for clip in clips if clip[1]==args.only]
 if not clips: parser.error('Unknown project slug')
originals={name:hashlib.sha256((source/name).read_bytes()).hexdigest() for name in [clip[0] for clip in clips]+['glasgow airport.jpg']}
results=[]
for name,slug,start in clips:
 target=Path('public/videos/projects')/(slug+'.mp4')
 duration=min(9,float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',str(source/name)]))-start)
 fade=0.6 if duration>=9 else 0.4
 duration=int(duration*25)/25
 filters=f'[0:v]fps=25,scale=1920:1080:force_original_aspect_ratio=decrease:force_divisible_by=2,setsar=1,format=yuv420p,split=2[bodyin][headin];[bodyin]trim=start={fade}:end={duration},setpts=PTS-STARTPTS[body];[headin]trim=start=0:end={fade},setpts=PTS-STARTPTS[head];[body][head]xfade=transition=fade:duration={fade}:offset={duration-2*fade},format=yuv420p[v]'
 subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-ss',str(start),'-t',str(duration),'-i',str(source/name),'-filter_complex_threads','1','-filter_complex',filters,'-map','[v]','-an','-sn','-dn','-c:v','libx264','-preset','slow','-crf','19','-maxrate','10M','-bufsize','20M','-threads','4','-pix_fmt','yuv420p','-movflags','+faststart','-map_metadata','-1','-y',str(target)],check=True)
 for width,suffix in [(1280,'-poster'),(640,'-poster-small')]:
  subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-i',str(target),'-frames:v','1','-vf',f'scale={width}:-1','-c:v','libwebp','-quality','85','-y',f'public/images/projects/{slug}{suffix}.webp'],check=True)
 info=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration,size:stream=codec_name,codec_type,width,height,r_frame_rate','-of','json',str(target)]))
 results.append({'source':name,'sourceBytes':(source/name).stat().st_size,'output':str(target).replace('\\','/'),'bytes':target.stat().st_size,'sourceStartSeconds':start,'loopCrossfadeSeconds':fade,'probe':info})
 print(slug,target.stat().st_size,flush=True)
for width,suffix in ([] if args.only else [(1440,''),(720,'-small')]):
 subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-i',str(source/'glasgow airport.jpg'),'-frames:v','1','-vf',f'scale={width}:-2','-c:v','libwebp','-quality','86','-y',f'public/images/projects/glasgow-airport{suffix}.webp'],check=True)
if not args.only: subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-i',str(source/'glasgow airport.jpg'),'-frames:v','1','-vf','scale=1440:-2','-q:v','3','-y','public/images/projects/glasgow-airport.jpg'],check=True)
Path(f'output/portfolio/{args.only or "media"}-report.json').write_text(json.dumps(results,indent=2),encoding='utf-8')
for name,digest in originals.items():
 assert hashlib.sha256((source/name).read_bytes()).hexdigest()==digest
print('Original source hashes unchanged.',flush=True)
