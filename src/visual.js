import * as THREE from 'three';
const asset=name=>chrome.runtime.getURL('assets/'+name);
const nearest=t=>{t.magFilter=THREE.NearestFilter;t.minFilter=THREE.NearestFilter;t.generateMipmaps=false;t.colorSpace=THREE.SRGBColorSpace;return t;};
const image=name=>new Promise((resolve,reject)=>{const i=new Image();i.onload=()=>resolve(i);i.onerror=reject;i.src=asset(name);});
function crop(img,x,y,w,h){const c=document.createElement('canvas');c.width=w;c.height=h;c.getContext('2d').drawImage(img,x,y,w,h,0,0,w,h);const t=nearest(new THREE.CanvasTexture(c));t.flipY=false;return t;}
const rad=d=>d*Math.PI/180;
const tx=(x,y,z)=>new THREE.Matrix4().makeTranslation(x,y,z);
const rx=d=>new THREE.Matrix4().makeRotationX(rad(d)),ry=d=>new THREE.Matrix4().makeRotationY(rad(d)),rz=d=>new THREE.Matrix4().makeRotationZ(rad(d));
function armPose(a=0,b=0,s=0,equip=0){
 return tx(.64-.3*a,-.6-.6*equip+.4*Math.sin(Math.sqrt(s)*Math.PI*2),-.72-.4*Math.sin(s*Math.PI))
  .multiply(ry(45)).multiply(ry(70*a)).multiply(rz(-20*b)).multiply(tx(-1,3.6,3.5))
  .multiply(rz(120)).multiply(rx(200)).multiply(ry(-135)).multiply(tx(5.6,0,0))
  .multiply(tx(-5/16,2/16,0)).multiply(tx(-1/16,4/16,0));
}
function createHand(parent){
 let renderer;try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:false,powerPreference:'low-power'});}catch{return null;}
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setClearColor(0,0);
 const canvas=renderer.domElement;canvas.className='hand-3d';canvas.style.cssText='position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;max-width:none!important;pointer-events:none!important;';canvas.hidden=true;parent.append(canvas);
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(70,Math.max(16/9,innerWidth/innerHeight),.05,100);
 scene.add(new THREE.AmbientLight(0xffffff,2.3));const light=new THREE.DirectionalLight(0xffffff,1.05);light.position.set(-.2,1,-.7);scene.add(light);
 const held=new THREE.Group(),arm=new THREE.Group();scene.add(held,arm);held.matrixAutoUpdate=arm.matrixAutoUpdate=false;
 // Project the cover from a fixed grip on the arm. A DOM image preserves support
 // for third-party covers without requiring WebGL CORS access to their pixels.
 const card=document.createElement('img');card.className='held-card';card.alt='手持视频';card.hidden=true;
 card.style.cssText='position:fixed!important;left:0!important;top:0!important;width:280px!important;height:158px!important;max-width:none!important;object-fit:cover;transform-origin:0 0!important;pointer-events:none!important;';parent.append(card);
 const rest=armPose(),palm=new THREE.Vector3(0,.375,0).applyMatrix4(rest);
 const grip=rest.clone().invert().multiply(tx(palm.x,palm.y,palm.z)).multiply(rz(15)).multiply(tx(-.37,.20,.02)).multiply(new THREE.Matrix4().makeScale(.0015,-.0015,.0015));
 const projection=new THREE.Matrix4();
 const models={pickaxe:new THREE.Group(),flint:new THREE.Group(),tnt:new THREE.Group()};Object.values(models).forEach(m=>held.add(m));
 // The original generated model is 16x16 with a 1/16-block extrusion.
 for(const [name,file]of [['pickaxe','diamond_pickaxe.png'],['flint','flint_and_steel.png']]){
  image(file).then(img=>{const c=document.createElement('canvas');c.width=16;c.height=16;const ctx=c.getContext('2d');ctx.drawImage(img,0,0,16,16);const rgba=ctx.getImageData(0,0,16,16).data,geo=new THREE.BoxGeometry(1/16,1/16,1/16),palette=new Map();
   for(let y=0;y<16;y++)for(let x=0;x<16;x++){const i=(y*16+x)*4;if(rgba[i+3]<128)continue;const color=(rgba[i]<<16)|(rgba[i+1]<<8)|rgba[i+2];if(!palette.has(color))palette.set(color,new THREE.MeshLambertMaterial({color}));const m=new THREE.Mesh(geo,palette.get(color));m.position.set((x-7.5)/16,(7.5-y)/16,0);models[name].add(m);}refresh();
  }).catch(()=>{});
 }
 image('steve.png').then(img=>{const faces=[[40,20,4,12],[48,20,4,12],[44,16,4,4],[48,16,4,4],[44,20,4,12],[52,20,4,12]];arm.add(new THREE.Mesh(new THREE.BoxGeometry(4/16,12/16,4/16),faces.map(v=>new THREE.MeshLambertMaterial({map:crop(img,...v)}))));refresh();}).catch(()=>{});
 const loader=new THREE.TextureLoader(),material=f=>new THREE.MeshLambertMaterial({map:nearest(loader.load(asset(f),refresh))}),side=material('tnt_side.png');
 models.tnt.add(new THREE.Mesh(new THREE.BoxGeometry(1,1,1),[side,side,material('tnt_top.png'),material('tnt_bottom.png'),side,side]));
 let mode='pickaxe',visible=false,swinging=false,frame=0,start=0,oneShot=0;
 let currentKey='pickaxe',requested={mode:'pickaxe',key:'pickaxe',cover:''},equip=0,lastTime=0,queuedSwing=false;
 function applyRequested(){
  mode=requested.mode;currentKey=requested.key;
  for(const [key,m]of Object.entries(models))m.visible=key===mode;
  arm.visible=mode==='hand'||mode==='item';held.visible=!arm.visible;
  card.hidden=!visible||mode!=='item';
  if(mode==='item'&&requested.cover){if(card.getAttribute('src')!==requested.cover)card.src=requested.cover;}
  else card.removeAttribute('src');
 }
 // Keep the usual 16:9 game framing in narrow browser windows instead of clipping the entire tool.
 function resize(){renderer.setSize(innerWidth,innerHeight,false);camera.aspect=Math.max(16/9,innerWidth/innerHeight);camera.updateProjectionMatrix();refresh();}
 function draw(time=0){
  frame=0;if(!visible||document.hidden)return;
  const delta=lastTime?Math.min(time-lastTime,50):0;lastTime=time;
  if(currentKey!==requested.key){
   equip=Math.min(1,equip+delta/150);
   if(equip===1){applyRequested();oneShot=0;start=time;}
  }else equip=Math.max(0,equip-delta/200);
  if(queuedSwing&&equip===0&&currentKey===requested.key){queuedSwing=false;oneShot=time+300;}
  const s=swinging?((time-start)%300)/300:oneShot&&time<oneShot?1-(oneShot-time)/300:0;
  const a=Math.sin(Math.sqrt(s)*Math.PI),b=Math.sin(s*s*Math.PI);
  if(mode==='hand'||mode==='item'){
   // Java 1.21.1 first-person right arm transform, followed by HumanoidModel's arm pivot.
   arm.matrix.copy(armPose(a,b,s,equip));
   if(mode==='item'){
    projection.set(innerWidth/2,0,0,innerWidth/2,0,-innerHeight/2,0,innerHeight/2,0,0,1,0,0,0,0,1)
     .multiply(camera.projectionMatrix).multiply(arm.matrix).multiply(grip);
    card.style.transform=`matrix3d(${projection.elements.join(',')})`;
   }
  }else{
   // Same translation and attack curve as Java ItemInHandRenderer.
   held.matrix.copy(tx(.56-.4*a,-.52-.6*equip+.2*Math.sin(Math.sqrt(s)*Math.PI*2),-.72-.2*Math.sin(s*Math.PI)))
    .multiply(ry(45-20*b)).multiply(rz(-20*a)).multiply(rx(-80*a)).multiply(ry(-45));
   if(mode==='tnt')held.matrix.multiply(ry(45)).multiply(new THREE.Matrix4().makeScale(.4,.4,.4));
   else held.matrix.multiply(tx(1.13/16,3.2/16,1.13/16)).multiply(ry(-90)).multiply(rz(25)).multiply(new THREE.Matrix4().makeScale(.68,.68,.68));
  }
  renderer.render(scene,camera);if(swinging||time<oneShot||equip>0||currentKey!==requested.key)frame=requestAnimationFrame(draw);
 }
 function refresh(){if(!frame&&visible){lastTime=performance.now();frame=requestAnimationFrame(draw);}}
 document.addEventListener('visibilitychange',refresh);window.addEventListener('resize',resize);resize();
 return {set(nextMode,nextVisible,nextSwing=false,item=null){
  const wasVisible=visible;visible=nextVisible;
  requested={mode:nextMode,key:nextMode==='item'?`item:${item?.id||item?.cover||''}`:nextMode,cover:item?.cover||''};
  if(!visible||!wasVisible){equip=0;oneShot=0;queuedSwing=false;applyRequested();}
  if(nextSwing&&!swinging)start=performance.now();swinging=nextSwing;
  canvas.hidden=!visible;if(!visible&&frame){cancelAnimationFrame(frame);frame=0;}refresh();
 },swingOnce(){if(currentKey!==requested.key||equip>0)queuedSwing=true;else oneShot=performance.now()+300;refresh();}};
}
globalThis.BiliCraftVisual={asset,createHand};


