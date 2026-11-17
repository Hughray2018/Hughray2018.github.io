# Personal Portfolio

> 本网站由 Claude Opus 5.5 生成。

纯静态站点：HTML + CSS + 原生 JS，Hero 背景是手写的 WebGL 着色器。

所有依赖都放在 `vendor/` 里本地托管（不请求任何境外 CDN，方便国内访问）：

- `vendor/js/`：GSAP 3.12.5、ScrollTrigger 3.12.5、Lenis 1.1.13
- `vendor/fonts/`：Anton、Instrument Serif、Inter、JetBrains Mono（拉丁子集，OFL 许可），由 `css/fonts.css` 引入
- 中文使用系统字体（苹方 / 微软雅黑 / 思源黑体），不额外下载

## 本地预览

```bash
py -3 -m http.server 5173
```

然后打开 http://localhost:5173

## 改内容

所有文字内容都在 `js/data.js`：

- `manifesto`：宣言大字，`*星号*` 包裹的词会变成橙色衬线斜体
- `pillars[]`：四个核心能力（层叠卡片），`proofs` 里纯数字会自动滚动计数
- `journey[]`：经历时间线，每段一句话成就
- `cases[]`：案例（挑战 / 行动 / 结果），`cover` 填封面图路径（留空显示渐变色）
- `works[]`：作品集卡片，`media` 填图片或 `.mp4/.webm` 视频路径（留空显示生成式占位图）
- 章节转场的标题在 `index.html` 的 `.chapter` 标签属性里改

素材建议放在 `assets/` 目录下，例如 `assets/works/poster-01.jpg`。

## 文件结构

- `index.html`：页面结构
- `css/style.css`：样式（颜色变量在 `:root`）
- `js/data.js`：内容数据
- `js/gl.js`：Hero 流体着色器
- `js/main.js`：渲染与所有动效
