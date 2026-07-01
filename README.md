# Xihi留学伴读手记 Astro 小样站

这是第一版内容驱动网站原型，用来验证：

- 美本、英国方向、时间线、家长决策、北上资源之间的关系。
- 同一篇 Markdown 文章能否通过字段出现在多个入口。
- Obsidian 内容能否迁移到 Astro Content Collections。

## 目录

```text
src/content/articles/  # 网站文章 Markdown
src/content/config.ts  # 文章字段模型
src/pages/             # 首页、频道页、文章页
src/styles/global.css  # 全站样式
dist/                  # 已构建出的静态网站
```

## 本地运行

```bash
npm install
npm run dev
```

构建静态网站：

```bash
npm run build
```

预览构建结果：

```bash
npm run preview
```

## 当前样例文章

- 顾问机构怎么选：先问清楚家庭真正需要什么
- 外地家庭要不要找北京/上海的美本顾问
- 英国本科申请和美国本科申请有什么不同
- 10年级家长，夏校到底怎么判断
- 美本申请里，家长应该管什么、不该管什么

## 下一步

1. 用真实文章替换样例文章。
2. 增加搜索。
3. 增加月份/季节入口。
4. 增加公众号改写脚本或模板。
5. 准备 GitHub Pages 或 Cloudflare Pages 部署。

## GitHub Pages

仓库推到 GitHub 后，在仓库设置里打开 Pages：

```text
Settings -> Pages -> Build and deployment -> Source: GitHub Actions
```

之后推送到 `main` 分支会自动构建并发布。
