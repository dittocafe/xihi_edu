---
title: "Xihi留学伴读手记"
---


一位美本家长的**长期主义留学笔记**。

## 最新文章

{{ $pages := .Site.RegularPages.ByDate.Reverse }}
{{ range first 5 $pages }}
### {{ .Title }}
[{{ .Title }}]({{ .Permalink }})  
*{{ .Date.Format "2006年1月2日" }}*

{{ .Summary | plainify | truncate 100 }}...

---
{{ end }}

## 栏目导航

- [📖 伴读手记](/posts/journal/)
- [🏫 高中择校](/posts/schools/)
- [📋 规划指南](/posts/planning/)
- [🧰 资源工具箱](/toolkit/)