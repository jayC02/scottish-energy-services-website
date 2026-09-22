from pathlib import Path
import subprocess,json,hashlib,argparse,os
parser=argparse.ArgumentParser(description='Create silent web project loops and posters without modifying source media.')
parser.add_argument('--source', type=Path, default=Path(r'D:\Jayveer\Documents\Website Videos'))
source=parser.parse_args().source.resolve()
os.chdir(Path(__file__).resolve().parents[1])
for folder in ['public/videos/projects','public/images/projects','output/portfolio']:
 Path(folder).mkdir(parents=True,exist_ok=True)
clips=[('Edinburgh University.mp4','university-of-edinburgh',2),('St James Quarter.mp4','st-james-centre',9),('Armadillo.mp4','sec-armadillo',10),('Kelvingrove Art Gallery.mp4','kelvingrove-art-gallery',8)]
originals={name:hashlib.sha256((source/name).read_bytes()).hexdigest() for name in [clip[0] for clip in clips]+['glasgow airport.jpg']}
results=[]
for name,slug,start in clips:
 target=Path('public/videos/projects')/(slug+'.mp4')
 filters='[0:v]fps=25,scale=1920:1080:force_original_aspect_ratio=decrease,setsar=1,format=yuv420p,split=2[bodyin][headin];[bodyin]trim=start=0.6:end=9,setpts=PTS-STARTPTS[body];[headin]trim=start=0:end=0.6,setpts=PTS-STARTPTS[head];[body][head]xfade=transition=fade:duration=0.6:offset=7.8,format=yuv420p[v]'
 subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-ss',str(start),'-t','9','-i',str(source/name),'-filter_complex_threads','1','-filter_complex',filters,'-map','[v]','-an','-sn','-dn','-c:v','libx264','-preset','slow','-crf','19','-maxrate','10M','-bufsize','20M','-threads','4','-pix_fmt','yuv420p','-movflags','+faststart','-map_metadata','-1','-y',str(target)],check=True)
 for width,suffix in [(1280,'-poster'),(640,'-poster-small')]:
  subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-i',str(target),'-frames:v','1','-vf',f'scale={width}:-1','-c:v','libwebp','-quality','85','-y',f'public/images/projects/{slug}{suffix}.webp'],check=True)
 info=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration,size:stream=codec_name,codec_type,width,height,r_frame_rate','-of','json',str(target)]))
 results.append({'source':name,'sourceBytes':(source/name).stat().st_size,'output':str(target).replace('\\','/'),'bytes':target.stat().st_size,'sourceStartSeconds':start,'loopCrossfadeSeconds':0.6,'probe':info})
 print(slug,target.stat().st_size,flush=True)
for width,suffix in [(1440,''),(720,'-small')]:
 subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-i',str(source/'glasgow airport.jpg'),'-frames:v','1','-vf',f'scale={width}:-2','-c:v','libwebp','-quality','86','-y',f'public/images/projects/glasgow-airport{suffix}.webp'],check=True)
subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-i',str(source/'glasgow airport.jpg'),'-frames:v','1','-vf','scale=1440:-2','-q:v','3','-y','public/images/projects/glasgow-airport.jpg'],check=True)
Path('output/portfolio/media-report.json').write_text(json.dumps(results,indent=2),encoding='utf-8')
for name,digest in originals.items():
 assert hashlib.sha256((source/name).read_bytes()).hexdigest()==digest
print('Original source hashes unchanged.',flush=True)
