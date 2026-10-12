(() => {
  'use strict';
  if (document.getElementById('bilicraft-root')) return;
  const host = document.createElement('div');
  host.id = 'bilicraft-root';
  host.style.cssText = 'all:initial!important;color:#fff!important;font:14px/1.5 "Microsoft YaHei",system-ui,sans-serif!important;position:fixed!important;inset:0!important;z-index:2147483600!important;pointer-events:none!important;';
  document.documentElement.append(host);
  const shadow = host.attachShadow({mode: 'open'});
  const pickaxe = `<svg viewBox="0 0 32 32" shape-rendering="crispEdges" aria-hidden="true"><path fill="#172b28" d="M4 4h17v3h5v5h3v9h-6v-7h-3v-3h-4L6 27H1v-6L13 9H4z"/><path fill="#795331" d="M3 23h3v-3h3v-3h3v-3h3v-3h4v4h-3v3h-3v3h-3v3H7v3H3z"/><path fill="#c99b59" d="M4 22h2v-2h3v-3h3v-3h3v-3h2v2h-2v3h-3v3H9v3H6v3H4z"/><path fill="#2b8c80" d="M5 5h15v3h5v5h3v7h-4v-7h-4v-3H5z"/><path fill="#71e8cd" d="M5 5h15v3h-3V7H5zm15 3h4v4h-2v-2h-2zm5 5h2v6h-2z"/></svg>`;
  const heart = `<svg viewBox="0 0 11 10" shape-rendering="crispEdges"><path fill="#210d10" d="M1 0h3v1h3V0h3v1h1v5h-1v1H9v1H8v1H7v1H4V9H3V8H2V7H1V6H0V1h1z"/><path fill="#df3e46" d="M1 2h3v1h3V2h3v4H9v1H8v1H7v1H4V8H3V7H2V6H1z"/><path fill="#ff9190" d="M2 2h2v2H2z"/></svg>`;
  const food = `<svg viewBox="0 0 11 10" shape-rendering="crispEdges"><path fill="#261b12" d="M5 0h5v1h1v5H9v2H6v1H4v1H0V6h3V4h1V1h1z"/><path fill="#bc7641" d="M5 2h4v1h1v2H8v2H5V6H4V4h1z"/><path fill="#eee2c2" d="M1 7h3V6h1v2H3v1H1z"/><path fill="#e3a363" d="M6 2h2v2H6z"/></svg>`;
  shadow.innerHTML = `<style>
    :host{font:14px/1.5 "Microsoft YaHei",system-ui,sans-serif;color:#fff;color-scheme:dark}*{box-sizing:border-box}button,a{-webkit-tap-highlight-color:transparent}button{font:inherit;color:inherit;cursor:pointer}button:focus-visible,a:focus-visible{outline:3px solid #b4ed81;outline-offset:3px}[hidden]{display:none!important}
    .world{position:fixed;inset:0;overflow:hidden;pointer-events:none}.world-card{position:absolute;width:256px;background:#252d24;border:3px solid #c2c8b3;box-shadow:inset 0 0 0 2px #4e5945,5px 5px 0 #16201388;pointer-events:auto;transform-origin:center;animation:placed .22s ease-out}.world-card a{display:block;color:#f2f1df;text-decoration:none}.world-card img{display:block;width:100%;height:140px;object-fit:cover;background:#414937}.world-card .caption{padding:9px 12px;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.world-card .tag{position:absolute;top:7px;left:7px;padding:2px 6px;font:10px monospace;background:#151e18bd;color:#c4eda2}.world-card .retrieve{position:absolute;right:6px;top:6px;background:#1b261deb;border:1px solid #b0c495;padding:2px 7px;font-size:11px}.world-card .retrieve:hover{background:#53713b}.world-card.mining{filter:brightness(.9)}
    .badge{position:fixed;top:92px;right:24px;display:flex;align-items:center;gap:10px;pointer-events:auto;background:#1b241fed;border:1px solid #697761;box-shadow:3px 3px #0003;padding:10px 13px;backdrop-filter:blur(8px)}.badge svg{width:24px;height:24px}.badge b{font:12px monospace;letter-spacing:1px}.badge small{display:block;color:#abbda2;font-size:10px}.badge button{background:#3e5135;border:1px solid #748b62;padding:4px 8px;font-size:11px}
    .hud{position:fixed;bottom:18px;left:50%;transform:translateX(-50%);width:min(540px,94vw);filter:drop-shadow(2px 4px 0 #0008)}.hint{text-align:center;font-size:12px;text-shadow:2px 2px #142015;margin:0 auto 16px;color:#eff6e7;background:#172118cc;width:max-content;max-width:100%;padding:6px 14px;border:1px solid #75856b}.hint kbd{color:#c9e799;font:inherit}.stats{display:flex;justify-content:space-between;margin:0 6px 6px;align-items:flex-end}.vitals{display:flex;gap:3px}.vitals svg{width:20px;height:18px}.level{color:#a4e65d;font:bold 22px monospace;text-shadow:2px 2px #193519;line-height:20px}.experience{height:9px;background:#15200f;border:2px solid #0b1309;box-shadow:0 1px #9b9d8f;margin:0 3px 7px}.experience i{display:block;height:100%;background:repeating-linear-gradient(90deg,#88ca43 0 13px,#659d35 13px 15px);box-shadow:inset 0 2px #b3eb71;transition:width .3s}
    .hotbar{display:grid;grid-template-columns:repeat(9,1fr);gap:3px;background:#45473e;padding:5px;border:3px solid #13160f;box-shadow:inset 2px 2px #b6b6a2,inset -2px -2px #686959,0 0 0 2px #b1b1a3;pointer-events:auto}.slot{position:relative;aspect-ratio:1;border:2px solid #22271f;background:#777c6b;box-shadow:inset 2px 2px #454c3d,inset -2px -2px #a4a694;padding:5px;min-width:0}.slot.active{outline:3px solid #f4f5df;outline-offset:1px;z-index:1;background:#858c75}.slot:hover{background:#919d7b}.slot svg{width:100%;height:100%;filter:drop-shadow(2px 2px #273125)}.slot img{width:100%;height:33px;object-fit:cover;image-rendering:pixelated;box-shadow:2px 3px #26311b}.slot .num{position:absolute;top:0;left:3px;font:10px monospace;color:#e2e7d5;text-shadow:1px 1px #000}.slot .count{position:absolute;bottom:0;right:4px;font:bold 12px monospace;text-shadow:2px 2px #000}.itemname{text-align:center;font-size:12px;margin-top:10px;color:#d7e1c9;text-shadow:1px 2px #14200e;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .hand{position:fixed;right:-18px;bottom:-40px;width:300px;height:365px;transform-origin:88% 95%;pointer-events:none;filter:drop-shadow(7px 7px #0003)}.arm{position:absolute;bottom:-50px;right:26px;width:114px;height:285px;background:linear-gradient(90deg,#9a694c 0 15%,#c58d67 15% 72%,#dda278 72% 87%,#b37b56 87%);transform:rotate(-29deg);border:5px solid #754e3c;box-shadow:inset 0 55px #36aaa9,inset 12px 55px #208986}.arm:after{content:"";position:absolute;top:67px;left:17px;width:20px;height:18px;background:#b67d58;box-shadow:43px 40px #d19870,18px 110px #ac7754}.tool{position:absolute;top:4px;left:5px;width:236px;height:236px;transform:rotate(-10deg)}.tool svg{width:100%;height:100%;image-rendering:pixelated}.held{position:absolute;top:65px;left:15px;width:166px;height:105px;border:6px solid #b0ba91;transform:rotate(-23deg);background:#34412a;object-fit:cover;box-shadow:7px 8px #1a291c}.hand.swing{animation:swing .32s ease-in-out infinite}
    .outline{position:fixed;pointer-events:none;border:2px solid #d5efb8;background:#bde88b0a;box-shadow:0 0 0 2px #263323bb,0 0 24px #c2ed9030;overflow:hidden}.target-label{position:absolute;top:8px;left:8px;padding:4px 8px;background:#152015dd;font-size:11px;color:#e6f5ce}.cracks{position:absolute;inset:0;width:100%;height:100%;opacity:0;filter:drop-shadow(2px 1px #eff3d3aa)}.progress{position:absolute;bottom:0;height:5px;left:0;background:#b8ec7d;width:0}.ghost{position:fixed;width:256px;height:186px;border:2px dashed #c2f58f;background:#8dbc6126;opacity:.8;pointer-events:none;overflow:hidden}.ghost img{width:100%;height:140px;object-fit:cover;opacity:.7}.ghost span{display:block;background:#182717e0;font-size:11px;text-align:center;padding:7px}.toast{position:fixed;top:24px;left:50%;transform:translateX(-50%);padding:12px 22px;max-width:90vw;background:#202b20f5;border:2px solid #b9ce98;box-shadow:4px 4px #0005;font-size:13px;z-index:10}.particle{position:fixed;width:9px;height:9px;pointer-events:none;background:#96bc7b;box-shadow:2px 2px #293820}.drop{position:fixed;width:74px;height:46px;object-fit:cover;border:3px solid #dbe9b3;z-index:4}.reticle{position:fixed;width:17px;height:17px;pointer-events:none;filter:drop-shadow(1px 1px #000);transform:translate(-50%,-50%)}.reticle:before,.reticle:after{content:"";background:#f1f6e6;position:absolute}.reticle:before{left:8px;top:0;width:2px;height:18px}.reticle:after{left:0;top:8px;height:2px;width:18px}
    @keyframes swing{0%,100%{transform:rotate(0) translate(0)}45%{transform:rotate(-24deg) translate(-38px,28px)}}@keyframes placed{from{transform:scale(.75);opacity:.3}to{transform:scale(1);opacity:1}}@media(max-width:850px){.hand{transform:scale(.68);transform-origin:right bottom}.vitals{gap:1px}.vitals svg{width:15px}.badge{right:12px;top:78px}}@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
  </style>
  <div class="world"></div>
  <div class="badge"><span>${pickaxe}</span><div><b>BILICRAFT</b><small class="mode-label">世界已就绪</small></div><button class="toggle" title="Alt + M">进入采集</button></div>
  <div class="hud" hidden><div class="hint"><kbd>长按左键</kbd> 挖掘 · <kbd>1—9</kbd> 切换 · <kbd>Esc</kbd> 浏览</div><div class="stats"><div class="vitals">${heart.repeat(10)}</div><span class="level">0</span><div class="vitals">${food.repeat(10)}</div></div><div class="experience"><i></i></div><div class="hotbar"></div><div class="itemname">钻石镐 · 长按视频卡片采集</div></div>
  <div class="hand" hidden><div class="arm"></div><div class="tool">${pickaxe}</div><img class="held" alt="手持视频" hidden></div>
  <div class="outline" hidden><span class="target-label">视频方块 · 长按挖掘</span><svg class="cracks" viewBox="0 0 300 180" preserveAspectRatio="none"><g fill="none" stroke="#172018" stroke-width="5"><path d="M150 90l-24-22 6-21-25-15 5-32M126 68l-36 5-22-17-28 6L0 42M150 90l33-13 8-25 30-14 10-38M183 77l38 16 26-8 14 17 39-8M150 90l-9 30-27 11 3 27-19 22M141 120l24 13 14 30 27 17M114 131l-28-14-18 17-33-3L0 155"/></g><g fill="none" stroke="#172018" stroke-width="2"><path d="M68 56l4-32M221 38l40 4 15-16M247 85l-3-27 17-10M179 163l25-22 31 8 21-21M86 117l-20-20-26 2M132 47l29-17M117 158l-32 2"/></g></svg><div class="progress"></div></div>
  <div class="ghost" hidden><img alt="放置预览"><span>左键放置 · Esc 取消</span></div><div class="reticle" hidden></div><div class="toast" role="status" hidden></div>`;
  const $ = query => shadow.querySelector(query);
  const asset = name => chrome.runtime.getURL(`assets/${name}`);
  const nativeStyle = document.createElement('style');
  nativeStyle.textContent = `
    .hud{--unit:3px;width:calc(182 * var(--unit));max-width:none;filter:none;bottom:12px}
    .hotbar{height:calc(22 * var(--unit));grid-template-columns:repeat(9,1fr);gap:0;padding:var(--unit);border:0;box-shadow:none;background:transparent url('${asset('hotbar.png')}') center/100% 100%;image-rendering:pixelated}
    .slot,.slot:hover,.slot.active{border:0;outline:0;box-shadow:none;background:transparent;padding:calc(2 * var(--unit));aspect-ratio:1}
    .slot.active:before{content:'';position:absolute;inset:calc(-2 * var(--unit));background:url('${asset('hotbar_selection.png')}') center/100% 100%;pointer-events:none}
    .slot img.tool-icon{width:100%;height:100%;box-shadow:none;object-fit:contain}.slot img{height:calc(11 * var(--unit));image-rendering:pixelated}
    .stats{margin:0 0 calc(2 * var(--unit));height:calc(9 * var(--unit))}.vitals{gap:0}.vitals .native-icon{display:block;width:calc(9 * var(--unit));height:calc(9 * var(--unit));margin-right:calc(-1 * var(--unit));background-size:100% 100%;image-rendering:pixelated}
    .vitals .heart{background-image:url('${asset('full.png')}'),url('${asset('container.png')}')}.vitals .food{background-image:url('${asset('food_full.png')}'),url('${asset('food_empty.png')}')}
    .experience{height:calc(5 * var(--unit));margin:0 0 calc(3 * var(--unit));border:0;box-shadow:none;background:transparent url('${asset('experience_bar_background.png')}') center/100% 100%;image-rendering:pixelated}
    .experience i{height:100%;box-shadow:none;background:transparent url('${asset('experience_bar_progress.png')}') left center/calc(182 * var(--unit)) 100%}
    .level{align-self:center;font-size:24px}.itemname{position:absolute;bottom:calc(49 * var(--unit));width:100%;font-size:13px;pointer-events:none}.hint{margin-bottom:32px}.hand-3d{filter:none}.crack-texture{position:absolute;inset:0;background-size:100% 100%;image-rendering:pixelated;mix-blend-mode:multiply;pointer-events:none}
    .effects-world{position:fixed;inset:0;overflow:hidden;pointer-events:none}.bomb{position:absolute;width:64px;height:64px;perspective:350px;transform:translate(-50%,-50%)}.bomb-cube{width:64px;height:64px;transform-style:preserve-3d;transform:rotateX(-20deg) rotateY(-32deg);animation:none}.bomb-face{position:absolute;inset:0;background-image:url('${asset('tnt_side.png')}');background-size:100% 100%;image-rendering:pixelated}.bomb-front{transform:translateZ(32px)}.bomb-right{transform:rotateY(90deg) translateZ(32px);filter:brightness(.7)}.bomb-left{transform:rotateY(-90deg) translateZ(32px);filter:brightness(.85)}.bomb-top{transform:rotateX(90deg) translateZ(32px);background-image:url('${asset('tnt_top.png')}')}.smoke{position:absolute;width:8px;height:8px;left:28px;top:-30px;background:#636363;box-shadow:6px -5px #999;animation:smoke .8s infinite steps(5)}.blast{position:fixed;width:180px;height:180px;image-rendering:pixelated;pointer-events:none}.tnt-hint{color:#ffb095}
    @keyframes smoke{to{transform:translate(12px,-48px) scale(2);opacity:0}}
    @media(max-width:650px){.hud{--unit:2px}.level{font-size:18px}.itemname{font-size:11px}.hint{font-size:10px;margin-bottom:26px}.hand-3d{height:340px!important;width:302px!important}}
  `;
  shadow.append(nativeStyle);
  $('.stats .vitals').innerHTML = '<i class="native-icon heart"></i>'.repeat(10);
  shadow.querySelectorAll('.vitals')[1].innerHTML = '<i class="native-icon food"></i>'.repeat(10);
  const crackTexture=document.createElement('div');crackTexture.className='crack-texture';$('.outline').append(crackTexture);
  const effectsWorld=document.createElement('div');effectsWorld.className='effects-world';shadow.prepend(effectsWorld);
  const hand3d=globalThis.BiliCraftVisual?.createHand(shadow);
  const patchStyle=document.createElement('style');
  patchStyle.textContent=`
    .world-card{border:0!important;box-shadow:none!important;background:transparent!important;animation:none!important;transform:none!important;color:#18191c}
    .world-card img{background:transparent;width:100%;height:auto;object-fit:cover}.world-card a,.world-card .visual{display:block;text-decoration:none;color:inherit}.world-card .caption{padding:7px 0;font-size:14px;line-height:20px;white-space:normal;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
    .world-card[data-kind="avatar"] img{border-radius:50%;object-fit:cover}.world-card[data-kind="icon"] img{object-fit:contain}.target-label,.world-card .tag,.world-card .retrieve{display:none!important}
    .floating-drop{position:absolute;width:68px;height:68px;padding:4px;background:transparent;border:0;pointer-events:auto;cursor:pointer;filter:drop-shadow(0 10px 5px #0005)}.floating-drop img{width:100%;height:100%;object-fit:contain;animation:float-item 2s ease-in-out infinite;image-rendering:auto}.floating-drop:after{content:'';position:absolute;bottom:-8px;left:15px;width:38px;height:7px;border-radius:50%;background:#0002}.floating-drop:hover{filter:drop-shadow(0 0 6px #c6f694)}
    .bomb{pointer-events:auto;cursor:crosshair}.bomb-motion{width:64px;height:64px;transform-style:preserve-3d}.bomb-cube{animation:none;filter:none}.bomb-face{backface-visibility:hidden}.bomb-back{transform:rotateY(180deg) translateZ(32px)}.bomb-bottom{transform:rotateX(-90deg) translateZ(32px);background-image:url('${asset('tnt_bottom.png')}')}
    .bomb-face:after{content:'';position:absolute;inset:0;background:#fff;opacity:0;pointer-events:none}.bomb .smoke{display:none}.bomb.primed .smoke{display:block}
    .bomb.primed .bomb-motion{animation:tnt-hop .55s linear both}.bomb.primed .bomb-cube{animation:tnt-swell 4s linear forwards}.bomb.primed .bomb-face:after{animation:tnt-flash 4s steps(1,end) forwards}
    @keyframes tnt-hop{0%{transform:translateY(0);animation-timing-function:ease-out}40%{transform:translateY(-28px);animation-timing-function:ease-in}85%{transform:translateY(0);animation-timing-function:ease-out}93%{transform:translateY(-3px);animation-timing-function:ease-in}100%{transform:translateY(0)}}
    @keyframes tnt-swell{0%,87.5%{transform:rotateX(-20deg) rotateY(-32deg) scale(1)}95%{transform:rotateX(-20deg) rotateY(-32deg) scale(1.04)}98%{transform:rotateX(-20deg) rotateY(-32deg) scale(1.16)}100%{transform:rotateX(-20deg) rotateY(-32deg) scale(1.3)}}
    @keyframes tnt-flash{0%,16%,32%,48%,62%,74%,84%,92%,97%,100%{opacity:.92}8%,24%,40%,55%,68%,79%,88%,95%,99%{opacity:0}}
    @keyframes float-item{0%,100%{transform:translateY(0) rotate(-5deg)}50%{transform:translateY(-10px) rotate(5deg)}}
  `;
  shadow.append(patchStyle);$('.target-label')?.remove();
  const bombs=new Map(),worldNodes=new Map(),hidden=new Map(),liveOriginals=new Map();
  const toolsList=['pickaxe','tnt','flint'];
  const toolNames=['钻石镐','TNT','打火石'];
  const toolImages=['diamond_pickaxe.png','tnt_side.png','flint_and_steel.png'];
  let state={items:[],sound:true,revision:-1},enabled=false,selected=0,target=null,mining=null,pending=false;
  let mouse={x:innerWidth/2,y:innerHeight/2},currentPage=pageKey(),toastTimer,suppressClickUntil=0;
  const bag=()=>state.items.filter(x=>!x.placement&&!x.drop);
  const chosen=()=>selected>=3?bag()[selected-3]:null;
  const toolMode=()=>selected<3?toolsList[selected]:chosen()?'item':'hand';
  function pageKey(){const u=new URL(location.href),q=new URLSearchParams();for(const k of ['keyword','search_type','page','tid'])if(u.searchParams.has(k))q.set(k,u.searchParams.get(k));return u.origin+u.pathname+(q.size?'?'+q:'');}
  function canonical(href){try{const u=new URL(href,location.href),m=u.pathname.match(/^\/video\/(BV[a-zA-Z0-9]+|av\d+)/);return /(^|\.)bilibili\.com$/.test(u.hostname)&&m?`https://www.bilibili.com/video/${m[1]}/`:null;}catch{return null;}}
  function safeURL(href){try{const u=new URL(href,location.href);return ['https:','http:'].includes(u.protocol)?u.href:'';}catch{return '';}}
  async function send(action,data={}){try{const res=await chrome.runtime.sendMessage({scope:'bilicraft-store',action,...data});if(!res?.ok)throw Error(res?.error||'插件连接失败');applyState(res.state);return res.state;}catch(e){toast(e.message.includes('invalidated')?'插件已更新，请刷新页面':e.message);return null;}}
  function applyState(next){if(next.revision<=state.revision)return;if(next.lastAction==='reset'){cancelBombs(true);stopMining();}state=next;render();reconcile();}
  function toast(text){$('.toast').textContent=text;$('.toast').hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('.toast').hidden=true,2400);}
  function sound(kind){if(!state.sound)return;const names={hit:'stone1.ogg',collect:'pop.ogg',place:'stone2.ogg',fuse:'fuse.ogg',explosion:'explode1.ogg'};const effect=new Audio(asset(names[kind]||'stone1.ogg'));effect.volume=kind==='explosion'?.25:.28;void effect.play().catch(()=>{});return effect;}
  function updateHand(swing=false){hand3d?.set(toolMode(),enabled,swing,chosen());$('.hand').hidden=!enabled||!!hand3d;}
  function setMode(value){enabled=value;stopMining();target=null;if(!value){cancelBombs(false);suppressClickUntil=0;}$('.outline').hidden=true;$('.hud').hidden=!enabled;$('.reticle').hidden=!enabled;$('.toggle').textContent=enabled?'退出采集':'进入采集';$('.mode-label').textContent=enabled?'采集中':'浏览中';render();}
  function setImage(img,src){if(src){if(img.getAttribute('src')!==src)img.src=src;}else img.removeAttribute('src');}
  function render(){
    const inventory=bag(),slots=$('.hotbar');slots.replaceChildren();
    for(let i=0;i<9;i++){
      const btn=document.createElement('button');btn.className='slot'+(selected===i?' active':'');btn.dataset.slot=i;btn.setAttribute('aria-pressed',String(selected===i));
      const item=inventory[i-3];btn.title=`${i+1} · `+(i<3?toolNames[i]:item?.title||'空手');btn.setAttribute('aria-label',btn.title);
      if(i<3||item){const img=document.createElement('img');img.alt='';if(i<3){img.className='tool-icon';img.src=asset(toolImages[i]);}else setImage(img,item.cover);btn.append(img);}
      const num=document.createElement('span');num.className='num';num.textContent=i+1;btn.append(num);btn.onclick=()=>select(i);slots.append(btn);
    }
    $('.level').textContent=state.items.length;$('.experience i').style.width=inventory.length/6*100+'%';
    $('.itemname').textContent=chosen()?.title||(selected<3?toolNames[selected]:'空手');
    $('.hint').textContent=chosen()?'左键放置 · 1 镐子 · Esc 浏览':toolMode()==='tnt'?'左键或右键放置 TNT · 3 打火石点燃':toolMode()==='flint'?'左键或右键点击 TNT 点燃 · Esc 取消引信':'长按左键挖掘 · 1 镐子 · 2 TNT · 3 打火石 · 4—9 物品';
    updateHand(!!mining);renderWorld();moveGhost();
  }
  function select(index){selected=index;stopMining();target=null;$('.outline').hidden=true;render();}
  function visualSize(item){return {w:Math.min(item?.width||256,Math.max(32,innerWidth-12)),h:item?.height||180};}
  function renderWorld(){
    const wanted=new Set();
    for(const item of state.items){
      const p=item.drop||item.placement;if(p?.page!==currentPage)continue;
      const type=item.drop?'drop':'placed';wanted.add(item.id);
      let entry=worldNodes.get(item.id);
      if(entry&&entry.type!==type){entry.node.remove();worldNodes.delete(item.id);entry=null;}
      if(!entry){
        const node=document.createElement(type==='drop'?'button':'article');node.dataset.id=item.id;node.dataset.kind=item.kind;
        node.className=type==='drop'?'floating-drop':'world-card';
        const img=document.createElement('img');img.alt=item.title;setImage(img,item.cover);
        if(type==='drop'){
          node.setAttribute('aria-label','拾取 '+item.title);node.append(img);
          node.onclick=async e=>{e.preventDefault();e.stopPropagation();if(await send('pickup',{id:item.id}))sound('collect');};
        }else{
          const link=document.createElement(item.url?'a':'div');link.className='visual';if(item.url){link.href=item.url;link.target='_blank';link.rel='noopener noreferrer';}
          link.append(img);
          if(['video','live','ad'].includes(item.kind)){const caption=document.createElement('div');caption.className='caption';caption.textContent=item.title;link.append(caption);}
          node.append(link);
        }
        $('.world').append(node);entry={node,type};worldNodes.set(item.id,entry);
      }
      if(type==='placed')entry.node.style.width=visualSize(item).w+'px';
    }
    for(const [id,entry] of worldNodes)if(!wanted.has(id)){entry.node.remove();worldNodes.delete(id);}
    positionWorld();
  }
  function positionWorld(){
    for(const [node,b] of bombs){node.style.left=b.x-scrollX+'px';node.style.top=b.y-scrollY+'px';}
    for(const item of state.items){const entry=worldNodes.get(item.id);if(!entry)continue;const p=item.drop||item.placement;if(!p)continue;const w=item.drop?68:visualSize(item).w;
      entry.node.style.left=Math.max(0,Math.min(p.x-(item.drop?34:0),document.documentElement.clientWidth-w))-scrollX+'px';entry.node.style.top=p.y-scrollY-(item.drop?34:0)+'px';}
  }
  function placementPoint(){const size=visualSize(chosen());return {x:Math.max(0,Math.min(innerWidth-size.w,mouse.x-size.w/2)),y:Math.max(0,Math.min(innerHeight-Math.min(size.h,innerHeight),mouse.y-Math.min(75,size.h/2)))};}
  function moveGhost(){const item=chosen(),ghost=$('.ghost');ghost.hidden=!enabled||!item;if(item){setImage(ghost.querySelector('img'),item.cover);const p=placementPoint();ghost.style.left=p.x+'px';ghost.style.top=p.y+'px';ghost.style.width=visualSize(item).w+'px';ghost.style.height=Math.min(item.height||180,innerHeight)+'px';ghost.querySelector('img').style.height='calc(100% - 28px)';}$('.reticle').style.left=mouse.x+'px';$('.reticle').style.top=mouse.y+'px';}

  const cardSelectors='.bili-video-card,.video-page-card-small,.video-card,.video-card-reco,.recommend-video-card,.video-item,.small-item,.bili-live-card,.live-card,.live-room-card,.bili-ad-card,.ad-card';
  const bannerSelectors='.recommended-swipe,.recommended-swipe-core,.bili-banner,.bili-header__banner,.banner-card,.carousel,.swiper-container';
  const avatarSelectors='.header-avatar-wrap,.header-avatar,.bili-avatar,.avatar,.avatar-container,[class*="avatar"]';
  const scanSelectors=cardSelectors+','+bannerSelectors+','+avatarSelectors+',a,button,[role="button"],img,svg,[class*="icon"]';
  function hash(text){let h=2166136261;for(const c of text){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return (h>>>0).toString(36);}
  function insideVisible(node,r,checkVisibility=true){const b=node.getBoundingClientRect(),cs=getComputedStyle(node);return b.width>0&&b.height>0&&b.right>r.left&&b.left<r.right&&b.bottom>r.top&&b.top<r.bottom&&cs.display!=='none'&&(!checkVisibility||cs.visibility!=='hidden');}
  function locator(node){const parts=[];for(let e=node;e&&e!==document.body&&parts.length<8;e=e.parentElement){if(e.id){parts.unshift('#'+CSS.escape(e.id));break;}let n=1;for(let s=e.previousElementSibling;s;s=s.previousElementSibling)if(s.tagName===e.tagName)n++;parts.unshift(e.tagName.toLowerCase()+`:nth-of-type(${n})`);}return parts.join(' > ');}
  function describe(element){
    if(!(element instanceof Element)||element.closest('#bilicraft-root')||element.closest('input,textarea,[contenteditable="true"],video'))return null;
    let node=element.closest(cardSelectors),kind='video';
    if(!node){node=element.closest(bannerSelectors);kind='banner';}
    if(!node){node=element.closest(avatarSelectors);kind='avatar';if(node&&node.getBoundingClientRect().width>180)node=null;}
    if(!node){node=element.closest('a,button,[role="button"]');kind='icon';if(node&&node.getBoundingClientRect().height>160&&node.querySelector('img'))kind='image';}
    if(!node){node=element.closest('img,svg,[class*="icon"]');kind=node?.matches('img')?'image':'icon';}
    if(!node||node===document.body||node===document.documentElement)return null;
    const r=node.getBoundingClientRect();if(r.width<8||r.height<8||r.width>Math.max(2000,innerWidth+5)||r.height>800)return null;
    const anchors=node.matches('a')?[node]:[...node.querySelectorAll('a[href]')];
    const a=anchors.find(a=>canonical(a.href))||anchors.find(a=>a.href)||node.closest('a[href]');
    const url=canonical(a?.href)||safeURL(a?.getAttribute('href')||'');
    if(kind==='video'&&!canonical(url))kind=url.includes('live.bilibili.com')?'live':'ad';
    const titleNode=node.querySelector('h3')||node.querySelector('.bili-video-card__info--tit,.video-name,.title,a[title]');
    const title=(titleNode?.getAttribute('title')||titleNode?.textContent||node.getAttribute('aria-label')||node.getAttribute('title')||a?.title||node.querySelector('img')?.alt||(kind==='avatar'?'用户头像':node.textContent)||({banner:'轮播横幅',icon:'页面图标'}[kind])||'网页物品').trim().slice(0,180);
    let img=node.matches('img')?node:[...node.querySelectorAll('img')].find(i=>insideVisible(i,r,false));
    if(kind==='banner'){const imgs=[...node.querySelectorAll('img')];img=imgs.find(i=>{const b=i.getBoundingClientRect();return b.width>80&&b.right>r.left&&b.left<r.right;})||img;}
    let cover=img?.currentSrc||img?.src||img?.dataset.src||'';
    if(!cover){const bg=getComputedStyle(node).backgroundImage,match=bg.match(/url\(["']?(.*?)["']?\)/);if(match)cover=safeURL(match[1]);}
    const loc=locator(node);
    const key=kind==='video'?'video:'+url:`${kind}:${currentPage}:${loc}:${kind==='banner'?'frame':hash(url+'|'+(kind==='icon'?title:cover))}`;
    return {node,key,kind,url:url===location.href&&!a?'':url,title:title||'网页物品',cover,originPage:currentPage,locator:loc,width:Math.round(r.width),height:Math.round(r.height)};
  }
  async function snapshot(d){
    if(d.cover)return d.cover;
    const bounds=d.node.getBoundingClientRect();
    const svg=d.node.matches('svg')?d.node:[...d.node.querySelectorAll('svg')].find(i=>insideVisible(i,bounds));
    const canvas=document.createElement('canvas');canvas.width=Math.max(32,Math.min(384,d.width));canvas.height=Math.max(32,Math.min(256,d.height));const ctx=canvas.getContext('2d');
    if(svg){
      try{
        const clone=svg.cloneNode(true);clone.setAttribute('xmlns','http://www.w3.org/2000/svg');clone.setAttribute('width',canvas.width);clone.setAttribute('height',canvas.height);
        const originals=[svg,...svg.querySelectorAll('*')],copies=[clone,...clone.querySelectorAll('*')];
        for(let i=0;i<copies.length;i++){for(const a of [...copies[i].attributes])if(/^on/i.test(a.name))copies[i].removeAttribute(a.name);const cs=getComputedStyle(originals[i]);for(const prop of ['fill','stroke','color','stroke-width','opacity'])copies[i].style.setProperty(prop,cs.getPropertyValue(prop));}
        for(const use of clone.querySelectorAll('use')){const ref=use.getAttribute('href')||use.getAttribute('xlink:href');const id=ref?.split('#')[1],source=id&&document.getElementById(id);if(source){const g=document.createElementNS('http://www.w3.org/2000/svg','g');g.innerHTML=source.innerHTML;if(source.getAttribute('viewBox'))clone.setAttribute('viewBox',source.getAttribute('viewBox'));use.replaceWith(g);}else use.remove();}
        clone.querySelectorAll('script,foreignObject,image,animate,set').forEach(n=>n.remove());
        for(const e of clone.querySelectorAll('*'))for(const a of [...e.attributes])if(/^on/i.test(a.name)||['href','xlink:href'].includes(a.name))e.removeAttribute(a.name);
        const blob=new Blob([new XMLSerializer().serializeToString(clone)],{type:'image/svg+xml'}),uri=URL.createObjectURL(blob),image=new Image();
        try{await new Promise((resolve,reject)=>{image.onload=resolve;image.onerror=reject;image.src=uri;});ctx.drawImage(image,0,0,canvas.width,canvas.height);return canvas.toDataURL('image/png');}finally{URL.revokeObjectURL(uri);}
      }catch{/* Text/icon-font fallback. */}
    }
    const icon=[...d.node.querySelectorAll('[class*="icon"]')].find(i=>insideVisible(i,bounds))||d.node,cs=getComputedStyle(icon),before=getComputedStyle(icon,'::before');
    let text=before.content;if(!text||['none','normal','""'].includes(text))text=icon.textContent.trim()||d.title;
    text=text.replace(/^["']|["']$/g,'');ctx.fillStyle=cs.color;ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=`${Math.min(36,canvas.height*.7)}px ${before.fontFamily||cs.fontFamily}`;ctx.fillText(text.slice(0,8),canvas.width/2,canvas.height/2,canvas.width);return canvas.toDataURL('image/png');
  }
  function reconcile(){
    const items=state.items.filter(x=>x.originPage===currentPage),keys=new Set(items.map(x=>x.key));
    for(const [node,saved] of hidden){const d=describe(node);if(!node.isConnected||!d||!keys.has(d.key)){if(saved.value)node.style.setProperty('visibility',saved.value,saved.priority);else node.style.removeProperty('visibility');hidden.delete(node);}}
    for(const item of items){if(item.locator){try{const node=document.querySelector(item.locator),d=node&&describe(node);if(d?.key===item.key)hideOriginal(d);}catch{}}}
    if(!items.length)return;
    for(const node of document.querySelectorAll('a[href*="/video/"]')){const d=describe(node);if(d&&keys.has(d.key))hideOriginal(d);}
  }
  function hideOriginal(d){if(!hidden.has(d.node)){hidden.set(d.node,{value:d.node.style.getPropertyValue('visibility'),priority:d.node.style.getPropertyPriority('visibility')});d.node.style.setProperty('visibility','hidden','important');}liveOriginals.set(d.key,d.node);}
  function eventTarget(e){
    const path=e.composedPath(),bomb=path.find(n=>n instanceof Element&&n.classList.contains('bomb'));
    if(bomb)return {node:bomb,bomb:true};
    const card=path.find(n=>n instanceof Element&&n.classList.contains('world-card'));
    if(card){const item=state.items.find(x=>x.id===card.dataset.id);return item?{...item,node:card,placed:true}:null;}
    if(path.includes(host))return null;
    return describe(e.target);
  }
  function drawTarget(){const out=$('.outline');if(!enabled||!['pickaxe','hand'].includes(toolMode())||!target?.node?.isConnected){out.hidden=true;return;}const r=target.node.getBoundingClientRect();out.hidden=false;out.style.left=r.left+'px';out.style.top=r.top+'px';out.style.width=r.width+'px';out.style.height=r.height+'px';}
  function stopMining(){if(mining)cancelAnimationFrame(mining.frame);mining=null;$('.hand').classList.remove('swing');$('.progress').style.width='0';crackTexture.style.backgroundImage='none';updateHand(false);}
  function beginMining(d){
    stopMining();if(pending)return;if(d.bomb&&bombs.get(d.node)?.primed)return;
    target=d;mining={start:performance.now(),frame:0,lastSound:0,node:d.node};updateHand(true);sound('hit');drawTarget();
    const tick=now=>{if(!mining||!enabled||!d.node.isConnected){stopMining();return;}const ratio=Math.min(1,(now-mining.start)/(toolMode()==='hand'?1400:950));crackTexture.style.backgroundImage=`url('${asset('destroy_stage_'+Math.min(9,Math.floor(ratio*10))+'.png')}')`;$('.progress').style.width=ratio*100+'%';if(now-mining.lastSound>240){sound('hit');mining.lastSound=now;}if(ratio>=1){void finishMining(d);return;}mining.frame=requestAnimationFrame(tick);};mining.frame=requestAnimationFrame(tick);
  }
  function dropPoint(r){return {page:currentPage,x:r.left+r.width/2+scrollX,y:r.top+r.height/2+scrollY};}
  async function collectObject(d,r){
    if(d.bomb){const b=bombs.get(d.node);if(b?.primed)return null;bombs.delete(d.node);d.node.remove();sound('collect');return state;}
    if(!d.placed)d.cover=await snapshot(d);
    if(!enabled||d.originPage&&d.originPage!==currentPage&&!d.placed)return null;
    const item={};for(const k of ['key','kind','url','title','cover','originPage','locator','width','height'])item[k]=d[k];
    const result=await send(d.placed?'mine':'collect',d.placed?{id:d.id,drop:dropPoint(r)}:{item,drop:dropPoint(r)});
    if(result){if(!d.placed)hideOriginal(d);particles(r);const saved=result.items.find(i=>i.key===d.key);if(saved&&!saved.drop){flyItem(saved,r);sound('collect');}return result;}return null;
  }
  async function finishMining(d){const r=d.node.getBoundingClientRect();stopMining();pending=true;suppressClickUntil=performance.now()+600;await collectObject(d,r);pending=false;target=null;$('.outline').hidden=true;}
  function particles(r){for(let i=0;i<16;i++){const p=document.createElement('i');p.className='particle';p.style.left=r.left+Math.random()*r.width+'px';p.style.top=r.top+Math.random()*r.height+'px';p.style.background=['#d3d9b8','#77a55f','#6e7460','#c2a77e'][i%4];shadow.append(p);p.animate([{transform:'translate(0,0)',opacity:1},{transform:`translate(${(Math.random()-.5)*180}px,${40+Math.random()*100}px) rotate(150deg)`,opacity:0}],{duration:650,easing:'ease-out'}).onfinish=()=>p.remove();}}
  function flyItem(item,r){const i=bag().findIndex(x=>x.id===item.id);if(i<0)return;const slot=shadow.querySelector(`[data-slot="${i+3}"]`),s=slot.getBoundingClientRect(),img=document.createElement('img');img.className='drop';setImage(img,item.cover);img.alt='';img.style.left=r.left+r.width/2-37+'px';img.style.top=r.top+r.height/2-23+'px';shadow.append(img);img.animate([{transform:'translate(0,0) scale(1.2)',opacity:1},{transform:`translate(${s.left+s.width/2-r.left-r.width/2}px,${s.top+s.height/2-r.top-r.height/2}px) scale(.35)`,opacity:.5}],{duration:600,easing:'ease-in'}).onfinish=()=>img.remove();}

  function cancelBombs(remove){for(const [node,b] of bombs){clearTimeout(b.timer);b.audio?.pause();b.primed=false;node.classList.remove('primed');if(remove){node.remove();bombs.delete(node);}}}
  function plantTNT(){if(bombs.size>=24){toast('页面上最多放置 24 个 TNT');return;}const node=document.createElement('div');node.className='bomb';node.innerHTML='<div class="bomb-motion"><div class="bomb-cube"><div class="bomb-face bomb-front"></div><div class="bomb-face bomb-right"></div><div class="bomb-face bomb-left"></div><div class="bomb-face bomb-back"></div><div class="bomb-face bomb-top"></div><div class="bomb-face bomb-bottom"></div></div><i class="smoke"></i></div>';const b={x:mouse.x+scrollX,y:mouse.y+scrollY,page:currentPage,primed:false,timer:0};effectsWorld.append(node);bombs.set(node,b);positionWorld();sound('place');}
  function ignite(node){const b=bombs.get(node);if(!b||b.primed)return;b.primed=true;node.classList.add('primed');b.audio=sound('fuse');hand3d?.swingOnce?.();b.timer=setTimeout(()=>{bombs.delete(node);node.remove();b.audio?.pause();if(enabled&&b.page===currentPage)void explode(b);},4000);}
  function explosionSprites(x,y){for(let i=0;i<7;i++){const sprite=document.createElement('img');sprite.className='blast';sprite.alt='';sprite.style.left=x+(Math.random()-.5)*180-90+'px';sprite.style.top=y+(Math.random()-.5)*140-90+'px';sprite.src=asset('explosion_0.png');shadow.append(sprite);let f=0;const t=setInterval(()=>{if(++f>15){clearInterval(t);sprite.remove();}else sprite.src=asset('explosion_'+f+'.png');},50);}}
  async function explode(b){
    const x=b.x-scrollX,y=b.y-scrollY;sound('explosion');explosionSprites(x,y);
    const candidates=[],seen=new Set();
    for(const node of [...document.querySelectorAll(scanSelectors),...shadow.querySelectorAll('.world-card')]){
      let d;if(node.classList.contains('world-card')){const item=state.items.find(i=>i.id===node.dataset.id);if(item)d={...item,node,placed:true};}else d=describe(node);
      if(!d||seen.has(d.key)||hidden.has(d.node)||getComputedStyle(d.node).visibility==='hidden'||getComputedStyle(d.node).display==='none')continue;
      const r=d.node.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight||r.right<0||r.left>innerWidth)continue;
      if(Math.hypot(x-Math.max(r.left,Math.min(x,r.right)),y-Math.max(r.top,Math.min(y,r.bottom)))>165)continue;
      if(!d.placed&&state.items.some(i=>i.key===d.key))continue;seen.add(d.key);candidates.push({d,r});
    }
    // Prefer a card/banner over its nested icons: each DOM object is removed once.
    const roots=candidates.filter(c=>!candidates.some(p=>p!==c&&p.d.node.contains(c.d.node)));
    for(const {d,r} of roots){if(!enabled||currentPage!==b.page)break;await collectObject(d,r);}
  }
  function editable(e){return e.composedPath().some(n=>n instanceof Element&&(n.matches('input,textarea,select')||n.isContentEditable));}
  function cancelEvent(e){e.preventDefault();e.stopImmediatePropagation();}
  function ownedUI(e){return e.composedPath().includes(host)&&!e.composedPath().some(n=>n instanceof Element&&(n.classList.contains('world-card')||n.classList.contains('bomb')));}
  document.addEventListener('pointermove',e=>{mouse={x:e.clientX,y:e.clientY};if(!enabled)return;moveGhost();const next=['pickaxe','hand'].includes(toolMode())?eventTarget(e):null;if(mining&&next?.node!==mining.node)stopMining();target=next;drawTarget();},true);
  document.addEventListener('pointerdown',e=>{
    if(!enabled||![0,2].includes(e.button)||editable(e)||ownedUI(e))return;mouse={x:e.clientX,y:e.clientY};const d=eventTarget(e);
    if(toolMode()==='flint'){if(d?.bomb){cancelEvent(e);suppressClickUntil=performance.now()+500;ignite(d.node);}return;}
    if(toolMode()==='tnt'){cancelEvent(e);suppressClickUntil=performance.now()+500;plantTNT();return;}
    if(e.button!==0)return;
    if(chosen()){
      cancelEvent(e);suppressClickUntil=performance.now()+600;if(pending)return;const item=chosen(),p=placementPoint();pending=true;
      void send('place',{id:item.id,placement:{page:currentPage,x:p.x+scrollX,y:p.y+scrollY}}).then(result=>{pending=false;if(result){select(0);sound('place');}});return;
    }
    if(d){cancelEvent(e);suppressClickUntil=performance.now()+1500;beginMining(d);}
  },true);
  document.addEventListener('contextmenu',e=>{if(enabled&&['tnt','flint'].includes(toolMode())&&!editable(e)&&!ownedUI(e))cancelEvent(e);},true);
  document.addEventListener('pointerup',stopMining,true);document.addEventListener('pointercancel',stopMining,true);
  document.addEventListener('click',e=>{if(ownedUI(e))return;if((enabled&&(chosen()||toolMode()==='tnt'||eventTarget(e)))||performance.now()<suppressClickUntil)cancelEvent(e);},true);
  document.addEventListener('keydown',e=>{if(editable(e)||e.isComposing)return;if(e.altKey&&e.code==='KeyM'){cancelEvent(e);setMode(!enabled);return;}if(!enabled)return;if(e.code==='Escape'){cancelEvent(e);setMode(false);return;}if(e.ctrlKey||e.altKey||e.metaKey)return;if(/^Digit[1-9]$/.test(e.code)){cancelEvent(e);select(Number(e.code.slice(-1))-1);}if(e.code==='KeyT'){cancelEvent(e);select(1);}if(e.code==='KeyF'){cancelEvent(e);select(2);}},true);
  window.addEventListener('blur',stopMining);document.addEventListener('visibilitychange',()=>{if(document.hidden)stopMining();});
  window.addEventListener('scroll',()=>{stopMining();positionWorld();drawTarget();moveGhost();},{passive:true});window.addEventListener('resize',()=>{positionWorld();drawTarget();moveGhost();});
  document.addEventListener('fullscreenchange',()=>{host.style.setProperty('display',document.fullscreenElement?'none':'block','important');stopMining();});
  $('.toggle').onclick=()=>setMode(!enabled);
  chrome.runtime.onMessage.addListener((m,sender,respond)=>{if(m?.scope!=='bilicraft-ui')return;if(m.action==='toggle')setMode(!enabled);respond({enabled});});
  chrome.storage.onChanged.addListener((changes,area)=>{if(area==='local'&&changes['bilicraft.v1']?.newValue)applyState(changes['bilicraft.v1'].newValue);});
  let scheduled;const observer=new MutationObserver(()=>{clearTimeout(scheduled);scheduled=setTimeout(reconcile,180);});observer.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['href','src']});
  setInterval(()=>{if(currentPage===pageKey())return;currentPage=pageKey();cancelBombs(true);stopMining();target=null;$('.outline').hidden=true;reconcile();renderWorld();},750);
  render();void send('get');
})();
