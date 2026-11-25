// 本地预览入口：只读取同目录运行资源，只监听 127.0.0.1。
// 关闭启动窗口或按 Ctrl+C 即停止。不会修改系统设置或安装软件。
const http=require('node:http'),fs=require('node:fs/promises'),path=require('node:path'),cp=require('node:child_process');
const root=__dirname;const manifest=require('./web-manifest.json');
const allowed=new Set([...manifest.map(entry=>entry.file),'web-manifest.json']);
const types={'.html':'text/html; charset=utf-8','.glb':'model/gltf-binary','.bin':'application/octet-stream','.mp3':'audio/mpeg','.mp4':'video/mp4','.jpg':'image/jpeg','.txt':'text/plain; charset=utf-8','.json':'application/json'};
const server=http.createServer(async(req,res)=>{
 try{
  let name=decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\//,'');if(!name)name='index.html';
  if(!allowed.has(name)){res.writeHead(404);res.end('Not found');return;}
  const data=await fs.readFile(path.join(root,name));
  const headers={'Content-Type':types[path.extname(name)]||'application/octet-stream','Cache-Control':'no-cache','Accept-Ranges':'bytes','X-Preview-App':'Childhood-WebXR'};
  const range=req.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
  if(range){const start=Number(range[1]),end=range[2]?Math.min(Number(range[2]),data.length-1):data.length-1;
   if(start>end){res.writeHead(416,{'Content-Range':`bytes */${data.length}`});res.end();return;}
   res.writeHead(206,{...headers,'Content-Range':`bytes ${start}-${end}/${data.length}`,'Content-Length':end-start+1});res.end(req.method==='HEAD'?undefined:data.subarray(start,end+1));
  }else{res.writeHead(200,{...headers,'Content-Length':data.length});res.end(req.method==='HEAD'?undefined:data);}
 }catch(error){res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('Resource missing: '+error.message);}
});
let port=8080;
server.on('error',error=>{if(error.code==='EADDRINUSE'&&port<8099){port++;server.listen(port,'127.0.0.1');}else{console.error(error.message);process.exitCode=1;}});
server.on('listening',()=>{
 const url=`http://127.0.0.1:${port}/`;console.log('\nBackrooms WebXR preview\n'+url+'\nKeep this window open. Close it or press Ctrl+C to stop.\n');
 if(!process.argv.includes('--no-open')&&!process.env.WEBXR_PREVIEW_NO_OPEN){
  if(process.platform==='win32')cp.execFile('cmd.exe',['/c','start','',url],{windowsHide:true},error=>{if(error)console.log('Open this address in your browser: '+url);});
  else console.log('Open the URL above in your browser.');
 }
});
server.listen(port,'127.0.0.1');
