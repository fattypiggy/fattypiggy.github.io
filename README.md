# William Jing 的学术主页

采用 Jon Barron 风格：简介和头像在上方，论文列表在下方。支持手机布局、作者加粗、可选论文缩略图、BibTeX 展开及 News。没有 Ruby、Jekyll 或 npm 依赖。

旧博客、文章、标签、归档、旧资源及旧域名 CNAME 已从当前版本移除。头像使用你提供的 IMG_6961.jpeg，保存为 assets/images/profile.jpg，原图内容未改变，网页用 CSS 显示成圆形。

## 你要填写哪里

**只修改 `site.json`。** `site.example.json` 是完整格式示例，不参与网页生成。

| 字段 | 填写内容 |
| --- | --- |
| `name` | 英文姓名；与论文作者名一致时自动加粗 |
| `affiliation` | 当前职位和学校/机构 |
| `bio` | 简介段落；数组里的每个字符串是一段 |
| `research` | 论文列表上方的研究方向简介 |
| `links` | Email、Google Scholar、CV、OpenReview 等链接 |
| `news` | 可选动态；没有内容时用 `[]`，整个栏目隐藏 |
| `publications` | 论文列表；一篇论文对应一个对象 |
| `visitorMap` | 页脚的 MapMyVisitors 访客地图；`enabled: false` 可关闭，`widgetKey` 是嵌入代码中 `d` 的值，`siteId` 是统计页网址末尾的编号 |

访客地图使用你注册账号后提供的 MapMyVisitors 嵌入代码，放在页面最下方的 `<body>` 内。点击 Visitor statistics 可打开此站的[统计页](https://mapmyvisitors.com/web/1c8pt)。地图自动适配容器宽度，桌面最大 320px。请保持 `widgetKey` 与 `siteId` 对应同一个账号下的同一个地图。

统计从接入此服务后开始，自己的访问与测试访问也可能计入。加载时第三方服务会收到访客 IP、浏览器信息和网站来源；IP 地域并非精确位置，VPN、缓存和内容拦截等也会影响计数，不能把次数等同于独立人数。数据保存在 MapMyVisitors 的服务器，不在此 Git 仓库中；官方[保留政策](https://mapmyvisitors.com/b/policy)说明访客数据保留于账号有效期间，并非永久存档保证。未来更换域名时，请先在服务后台核对网站设置，保留原地图，避免重新生成地图而丢失统计连续性。

原 SmallCounter 已停止在网页中加载；之前的统计仍可通过[旧统计页](https://smallcounter.com/vmap/1791331579/)查看，不会自动合并到新服务。

`url` 和 `photo` 已设置好。联系方式的 `url` 目前为空，填上后链接才显示。Email 使用 `mailto:你的邮箱`。CV 可以放到 `assets/pdf/cv.pdf`，再填写这个路径；文件夹可自行创建。

### 填写简介

把 `bio` 改成类似下面的数组，填写你的真实信息：

```json
"bio": [
  "这里填写第一段英文简介。",
  "这里填写第二段英文简介。"
]
```

### 添加论文

把下面的对象复制到 `publications` 的数组中，替换成真实内容。多篇论文之间用逗号分隔，最后一篇后面不要加逗号。

```json
{
  "title": "Your paper title",
  "authors": [
    { "name": "William Jing" },
    { "name": "Your coauthor" }
  ],
  "venue": "Conference or journal",
  "year": 2026,
  "url": "https://example.com/paper",
  "summary": "One sentence explaining the result.",
  "links": [
    { "label": "Paper", "url": "https://example.com/paper.pdf" },
    { "label": "Code", "url": "https://github.com/your-account/your-project" }
  ]
}
```

必填字段是 `title`、`authors`、`year`。论文按年份从新到旧排列，同一年保持你填写的顺序。`venue`、`url`、`summary`、`links` 都可以省略。

可选字段：

- `image`：论文缩略图路径，例如 `assets/images/my-paper.jpg`；图片需放进仓库。
- `imageAlt`：缩略图的文字说明。
- `selected: true`：给代表作加浅色背景。
- `award`：已确认的 Oral、Highlight 等信息。
- `bibtex`：BibTeX 字符串，多行用 `\n` 表示；页面会出现可展开的 BibTeX 按钮。

JSON 不支持注释和末尾多余逗号。建议从 `site.example.json` 复制需要的字段，示例不包含真实论文。

## 修改后如何看到结果

在仓库目录运行：

```powershell
node scripts/build.mjs
```

这会更新 `index.html`、`robots.txt` 和 `sitemap.xml`。刷新浏览器即可看到变化。**不要直接修改 `index.html`，下一次生成会覆盖它。**

预览地址为 `http://127.0.0.1:8000/`。以后需要重新启动服务器时运行：

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

## 头像固定地址

本地文件：`assets/images/profile.jpg`。

发布后计划使用：

```text
https://fattypiggy.github.io/assets/images/profile.jpg
```

这是直接图片链接，适合填写会议的头像 URL 字段。发布后需验证 HTTP 200、Content-Type 为 image/jpeg，且不跳转到旧域名。以后更新照片时保持文件路径不变；链接的长期可用依赖 GitHub 账号、仓库及 Pages 持续保留。

## GitHub Pages 发布

GitHub Pages 使用 `master` 分支的根目录作为发布来源。以后修改 `site.json` 后，运行生成命令，把源码及生成的 `index.html` 一起提交并推送到 `master`。Git 历史保留；旧版本备份位于仓库外的 `../homepage-backups/fattypiggy.github.io-before-academic-rebuild-2026-10-05.bundle`。

首次发布时，在 GitHub Settings → Pages 移除旧 Custom domain，确认从分支根目录发布，并把仓库 About 的网站地址改为 https://fattypiggy.github.io/。等待部署完成后检查主页和头像链接。

模板为独立编写的 HTML/CSS，保留了对 [Jon Barron](https://jonbarron.info/) 布局的署名。
