# BiliCraft

在 B 站网页上挖掘视频、广告、头像等元素，收进快捷栏，再放回页面。

## 安装

1. 从 [Releases](https://github.com/vinahirilya-hue/BiliCraft/releases/latest) 下载 ZIP 并解压。
2. 打开 `edge://extensions`，开启“开发人员模式”。
3. 点击“加载解压缩的扩展”，选择包含 `manifest.json` 的文件夹。
4. 刷新 B 站，点击扩展弹窗的“开始采集”或页面上的“进入采集”。

更新时覆盖原文件夹，在扩展管理页点击“重新加载”，再刷新 B 站。

## 操作

- 长按左键：挖掘；`1`：选择镐子。
- `4–9`：选择背包物品，左键放置。
- `2`：放置 TNT；`3`：选择打火石，点击 TNT 点燃。
- 背包满时物品悬浮，腾出空位后左键拾取。
- `Esc`：退出采集并取消引信，之后可点击放下的视频打开链接。
- `Alt + M`：切换采集模式。
- 扩展弹窗中可开关音效、还原页面并清空背包。

物品保存在本机。支持 Windows 上的 Edge 和 B 站网页版。

## 开发

直接加载即可使用；修改 `src/visual.js` 后运行 `npm install`、`npm run build`。

资源来源与第三方许可见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。
