/* Serialize all writes across tabs. Inventory, placed objects and drops are exclusive states. */
const KEY = 'bilicraft.v1', CAPACITY = 6;
const empty = () => ({version:2,items:[],sound:true,revision:0});
let queue=Promise.resolve();
function webURL(value){try{const u=new URL(value);return ['https:','http:'].includes(u.protocol)&&!u.username&&!u.password?u.href.slice(0,4096):'';}catch{return '';}}
function pageURL(value){try{const u=new URL(value);return u.protocol==='https:'&&/(^|\.)bilibili\.com$/.test(u.hostname)?value.slice(0,2048):null;}catch{return null;}}
function imageURL(value){return typeof value==='string'&&/^data:image\/png;base64,[a-zA-Z0-9+/=]+$/.test(value)&&value.length<500000?value:webURL(value);}
function point(p){if(!p||!pageURL(p.page)||!Number.isFinite(p.x)||!Number.isFinite(p.y))throw Error('无效的页面位置');return {page:p.page,x:Math.max(0,Math.min(100000,p.x)),y:Math.max(0,Math.min(1000000,p.y))};}
const inBag=item=>!item.placement&&!item.drop;
function migrate(state){
  if(state.version===2)return false;
  state.version=2;
  let n=0;
  for(const item of state.items){
    item.kind||='video';item.key||='video:'+item.url;item.width||=256;item.height||=180;
    if(inBag(item)&&n++>=CAPACITY)item.drop={page:item.originPage,x:160+(n-CAPACITY)*90,y:300};
  }
  return true;
}
chrome.runtime.onMessage.addListener((message,sender,respond)=>{
  if(message?.scope!=='bilicraft-store')return;
  const job=queue.then(async()=>{
    const saved=await chrome.storage.local.get(KEY),state=saved[KEY]||empty();
    let changed=migrate(state);
    const action=message.action,item=state.items.find(x=>x.id===message.id);
    const full=()=>state.items.filter(inBag).length>=CAPACITY;
    if(action==='collect'){
      const d=message.item||{},originPage=pageURL(d.originPage);
      if(!originPage||typeof d.key!=='string'||!d.key.length)throw Error('无法识别这个网页物品');
      if(state.items.some(x=>x.key===d.key))throw Error('这个物品已在背包或页面中了');
      if(state.items.length>=200)throw Error('已保存 200 件物品，请先还原');
      const kind=['video','live','ad','banner','avatar','icon','image','link'].includes(d.kind)?d.kind:'image';
      state.items.push({id:crypto.randomUUID(),key:d.key.slice(0,1800),kind,url:webURL(d.url),title:String(d.title||'网页物品').slice(0,180),cover:imageURL(d.cover),originPage,locator:String(d.locator||'').slice(0,1600),width:Math.max(16,Math.min(1200,Number(d.width)||256)),height:Math.max(16,Math.min(800,Number(d.height)||180)),placement:null,drop:full()?point(message.drop):null});
      changed=true;
    }else if(action==='place'){
      if(!item||!inBag(item))throw Error('物品不在背包里');
      item.placement=point(message.placement);item.drop=null;changed=true;
    }else if(action==='mine'){
      if(!item?.placement)throw Error('物品已被收回');
      item.drop=full()?point(message.drop):null;item.placement=null;changed=true;
    }else if(action==='pickup'){
      if(!item||inBag(item))throw Error('物品已被拾取');
      if(full())throw Error('快捷栏已满，先放下一个物品再拾取');
      item.placement=null;item.drop=null;changed=true;
    }else if(action==='reset'){
      state.items=[];changed=true;
    }else if(action==='sound'){
      state.sound=Boolean(message.value);changed=true;
    }else if(action!=='get')throw Error('未知操作');
    if(changed){state.lastAction=action;state.revision++;await chrome.storage.local.set({[KEY]:state});}
    return {ok:true,state};
  });
  queue=job.catch(()=>{});job.then(respond,e=>respond({ok:false,error:e.message}));return true;
});

