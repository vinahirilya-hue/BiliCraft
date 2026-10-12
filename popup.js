const $ = id => document.getElementById(id);
let tab;
async function page(action) {
  if (!tab?.id) throw Error('请先打开 B 站网页');
  return chrome.tabs.sendMessage(tab.id, {scope: 'bilicraft-ui', action});
}
async function store(action, rest = {}) {
  const result = await chrome.runtime.sendMessage({scope: 'bilicraft-store', action, ...rest});
  if (!result.ok) throw Error(result.error);
  return result.state;
}
function status(text) { $('status').textContent = text; }
function mode(enabled) { $('toggle').textContent = enabled ? '退出采集 · 恢复浏览' : '开始采集'; }
(async () => {
  const state = await store('get');
  $('sound').checked = state.sound;
  [tab] = await chrome.tabs.query({active: true, currentWindow: true});
  try { const res = await page('status'); mode(res.enabled); status(`背包 ${state.items.filter(x => !x.placement&&!x.drop).length} / 6 · 悬浮掉落 ${state.items.filter(x=>x.drop).length} · 已放置 ${state.items.filter(x => x.placement).length}`); }
  catch { $('toggle').disabled = true; $('toggle').textContent = '请打开或刷新 B 站页面'; status('安装或更新后，刷新 B 站即可使用。'); }
})().catch(error => status(error.message));
$('toggle').onclick = async () => { try { const res = await page('toggle'); mode(res.enabled); window.close(); } catch { status('连接失败，请刷新 B 站页面。'); } };
$('reset').onclick = async () => { try { await store('reset'); status('所有视频已还原，背包已清空。'); } catch (e) { status(e.message); } };
$('sound').onchange = () => store('sound', {value: $('sound').checked}).catch(e => status(e.message));
