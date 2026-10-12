// Run from the extension directory with npm test / npm run test:live.
const {chromium}=require('playwright');
const fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
require('node:fs').mkdirSync('test-results',{recursive:true});
(async()=>{
const source=fs.readFileSync('src/visual.js','utf8').replace('renderer.render(scene,camera);','globalThis.samples?.push({time,mode,equip,currentKey,arm:arm.matrix.toArray(),held:held.matrix.toArray(),card:card.style.transform});renderer.render(scene,camera);');
const bundle=require('esbuild').buildSync({stdin:{contents:source,resolveDir:path.resolve(__dirname,'..'),loader:'js'},bundle:true,format:'iife',write:false}).outputFiles[0].text;
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[],checks=[];page.on('pageerror',e=>errors.push(e.message));
try{
await page.route('https://hand.test/**',r=>{const name=new URL(r.request().url()).pathname.slice(1);return name?r.fulfill({contentType:'image/png',body:fs.readFileSync(path.join('assets',name))}):r.fulfill({contentType:'text/html',body:'<meta charset="utf-8"><style>body{margin:0;background:#fafafa;font:20px sans-serif}[hidden]{display:none!important}</style>手持物品定位检查'});});
await page.goto('https://hand.test/');await page.evaluate(()=>{window.chrome={runtime:{getURL:x=>'https://hand.test/'+x.replace('assets/','')}};window.samples=[];});await page.addScriptTag({content:bundle});
await page.evaluate(()=>{window.hand=BiliCraftVisual.createHand(document.body);hand.set('pickaxe',true);});await page.waitForTimeout(400);
await page.evaluate(()=>{samples.length=0;hand.set('flint',true);});await page.waitForTimeout(500);
let frames=await page.evaluate(()=>samples);assert.equal(frames[0].mode,'pickaxe');const swap=frames.findIndex(x=>x.mode==='flint');assert.ok(swap>1);assert.equal(frames[swap].equip,1);assert.equal(frames.at(-1).equip,0);assert.ok(frames.slice(0,swap).every(x=>x.mode==='pickaxe'));checks.push('Old tool lowers before the new tool appears; new tool rises from the lowest point');
await page.evaluate(()=>{samples.length=0;hand.set('pickaxe',true);});await page.waitForTimeout(50);await page.evaluate(()=>hand.set('tnt',true));await page.waitForTimeout(35);await page.evaluate(()=>hand.set('flint',true));await page.waitForTimeout(500);frames=await page.evaluate(()=>samples);assert.equal(frames.at(-1).mode,'flint');assert.equal(frames.at(-1).equip,0);checks.push('Rapid switching settles on the latest selection without a stale tool');
const cover='data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="280" height="158"><rect width="280" height="158" fill="#589353"/><path d="M0 158L80 30 140 110 230 40 280 100V158" fill="#9fd67c"/></svg>');
await page.evaluate(cover=>{samples.length=0;hand.set('item',true,false,{id:'a',cover});},cover);await page.waitForTimeout(500);await page.screenshot({path:'test-results/held.png'});const first=await page.locator('.held-card').boundingBox();assert.ok(first.width>100&&first.x>700&&first.y<900);checks.push('Held cover is visible at the hand grip');
await page.evaluate(cover=>{samples.length=0;hand.set('item',true,false,{id:'b',cover});},cover);await page.waitForTimeout(500);frames=await page.evaluate(()=>samples);assert.equal(frames[0].currentKey,'item:a');assert.equal(frames.at(-1).currentKey,'item:b');assert.ok(frames.some(x=>x.equip===1));checks.push('Different inventory items also use the equip transition');
const restingCard=await page.locator('.held-card').evaluate(n=>n.style.transform);
await page.evaluate(()=>{samples.length=0;hand.swingOnce();});await page.waitForTimeout(400);frames=await page.evaluate(()=>samples);assert.ok(new Set(frames.map(x=>x.card)).size>5);assert.equal(frames.at(-1).card,restingCard);checks.push('Cover projection follows the arm throughout the swing');
await page.setViewportSize({width:600,height:800});await page.waitForTimeout(100);await page.screenshot({path:'test-results/held-narrow.png'});const narrow=await page.locator('.held-card').boundingBox();assert.ok(narrow.x>=0&&narrow.x+narrow.width<600);checks.push('Hand and cover remain aligned after viewport resize');
await page.evaluate(()=>{samples.length=0;hand.set('flint',true);hand.swingOnce();});await page.waitForTimeout(800);frames=await page.evaluate(()=>samples);assert.ok(new Set(frames.filter(x=>x.mode==='flint'&&x.equip===0).map(x=>x.held.join(','))).size>5);checks.push('Igniting immediately after selecting flint preserves its use swing after equipping');
await page.evaluate(()=>{hand.set('pickaxe',true);hand.set('pickaxe',false);});assert.equal(await page.locator('.held-card').isVisible(),false);assert.equal(await page.locator('canvas').isVisible(),false);await page.evaluate(()=>hand.set('flint',true));await page.waitForTimeout(100);assert.equal(await page.locator('.held-card').isVisible(),false);checks.push('Exiting during an equip transition hides both hand and cover');
assert.deepEqual(errors,[]);checks.push('No renderer JavaScript errors');fs.writeFileSync('test-results/hand-results.json',JSON.stringify(checks,null,2));console.log('PASS',checks);
}finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
