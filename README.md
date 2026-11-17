# 张修瑞 · 个人网站

纯静态站点：HTML + CSS + 原生 JS，依赖 GSAP / ScrollTrigger / Lenis（CDN 引入），Hero 背景是手写的 WebGL 着色器。

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
