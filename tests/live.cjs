// Run from the extension directory with npm test / npm run test:live.
const { chromium } = require('playwright');
const path = require('node:path');
const assert = require('node:assert/strict');
require('node:fs').mkdirSync('test-results',{recursive:true});
(async () => {
 const ext = path.resolve(__dirname,'..');
 const context = await chromium.launchPersistentContext(path.resolve('test-results/edge-live-profile-'+Date.now()), {
  channel:'msedge',headless:true,
  args:[`--disable-extensions-except=${ext}`,`--load-extension=${ext}`],viewport:{width:1440,height:1000}
 });
 const checks = [];
 try {
  const page = await context.newPage();
  await page.goto('https://www.bilibili.com/', {waitUntil:'domcontentloaded',timeout:30000});
  const worker = context.serviceWorkers()[0] || await context.waitForEvent('serviceworker');
  await worker.evaluate(()=>chrome.storage.local.clear());
  await page.reload({waitUntil:'domcontentloaded'});
  await page.locator('.bili-video-card a[href*="/video/"]').first().waitFor({timeout:25000});
  await page.locator('#bilicraft-root .toggle').click();
  await page.mouse.move(400,200);
  const card = page.locator('.bili-video-card').filter({has:page.locator('a[href*="/video/"]')}).first();
  const box = await card.boundingBox();
  const get = () => worker.evaluate(async()=> (await chrome.storage.local.get('bilicraft.v1'))['bilicraft.v1']);
  await page.mouse.move(box.x+box.width/2,box.y+box.height/2);
  await page.mouse.down(); await page.waitForTimeout(500);
  await page.screenshot({path:'test-results/mining.png'});
  await page.waitForTimeout(600); await page.mouse.up();
  await page.waitForTimeout(700);
  assert.equal((await get()).items.length,1); checks.push('Live homepage card mined into persistent inventory');
  assert.equal(await card.evaluate(n=>getComputedStyle(n).visibility),'hidden'); checks.push('Original live card hidden without navigating');
  await page.keyboard.press('4');
  await page.waitForTimeout(500);
  await page.screenshot({path:'test-results/live-held.png'});
  await page.mouse.click(325,400);
  await page.waitForTimeout(800);
  assert.equal((await get()).items.filter(x=>x.placement).length,1);
  await page.locator('#bilicraft-root .world-card').waitFor(); checks.push('Video placed at selected page coordinates');
  await page.screenshot({path:'test-results/preview.png'});
  await page.keyboard.press('Escape');
  const expected = (await get()).items[0].url;
  const opened = context.waitForEvent('page');
  await page.locator('#bilicraft-root .world-card a').click();
  const video = await opened; await video.waitForLoadState('domcontentloaded').catch(()=>{});
  assert.ok(video.url().includes(expected.replace('https://www.bilibili.com','').replace(/\/$/,''))); checks.push('Placed card opens actual Bilibili video in a new tab');
  await video.close();
  await page.reload({waitUntil:'domcontentloaded'});
  await page.locator('#bilicraft-root .world-card').waitFor(); checks.push('Placed video survives page refresh');
  await page.locator('#bilicraft-root .toggle').click();
  const placedBox=await page.locator('#bilicraft-root .world-card').boundingBox();
  await page.mouse.move(placedBox.x+placedBox.width/2,placedBox.y+60);await page.mouse.down();await page.waitForTimeout(1100);await page.mouse.up();await page.waitForTimeout(350);
  assert.equal((await get()).items[0].placement,null); checks.push('Placed card can be returned to inventory');
  const popup = await context.newPage(); await popup.goto(worker.url().replace('background.js','popup.html'));
  await popup.locator('#reset').click(); await page.waitForTimeout(500);
  assert.equal((await get()).items.length,0); checks.push('Reset clears inventory and restores original cards');
  console.log('PASS', JSON.stringify(checks,null,2));
  require('node:fs').writeFileSync('test-results/live-results.json',JSON.stringify({checks,date:new Date().toISOString()},null,2));
 } finally {await context.close();}
})().catch(e=>{console.error(e);process.exit(1)});
