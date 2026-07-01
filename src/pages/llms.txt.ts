import { getCollection } from "astro:content";

const site = "https://edu.bjxihi.com";

const pages = [
  ["时间线", "/timeline", "按 9 年级、10 年级、11 年级、12 年级、美研阶段组织家长问题。"],
  ["美本", "/us", "美国本科申请路径、活动、选校、顾问和家庭决策。"],
  ["美研", "/grad", "美国研究生申请框架，作为后续扩展栏目。"],
  ["家长决策", "/decisions", "顾问选择、学校选择、家庭支持和非标问题的判断框架。"],
  ["资源库", "/resources", "北京、上海及外地家庭借力资源的整理入口。"],
  ["资料库", "/library", "按标签、阶段、目的地沉淀文章和资料。"],
  ["英国", "/uk", "英国方向的基础框架，便于和美本路径比较。"],
  ["关于", "/about", "网站定位、边界和家长视角说明。"]
];

function line(title: string, path: string, desc: string) {
  return `- [${title}](${new URL(path, site).toString()}): ${desc}`;
}

export async function GET() {
  const articles = (await getCollection("articles", ({ data }) => data.public))
    .sort((a, b) => b.data.updated.getTime() - a.data.updated.getTime())
    .slice(0, 20);

  const articleLines = articles.map((article) =>
    line(
      article.data.title,
      `/articles/${article.data.permalink}`,
      `${article.data.summary} 家长要点：${article.data.parent_takeaway}`
    )
  );

  return new Response(
    `# Xihi留学伴读手记

> 面向中国家长的留学路径决策知识库，当前重点是美本和美研，兼顾英国方向框架。内容立场是家长视角、中立整理、先形成判断再行动。

## Site

- URL: ${site}
- Language: zh-CN
- Primary audience: 关注美本、美研、英美路径选择、北京/上海资源借力的中国家长
- Content style: 方法论、决策框架、阶段性问题、资料整理，不以机构引流为核心
- Freshness: 首页、文章更新时间、sitemap 和更新日志共同表达内容更新

## Recommended Reading Paths

${pages.map(([title, path, desc]) => line(title, path, desc)).join("\n")}

## Recent And Core Articles

${articleLines.join("\n")}

## Machine-Readable Resources

- [Sitemap](${site}/sitemap.xml): all public pages and article URLs.
- [Search Index](${site}/search.json): compact JSON index for titles, summaries, parent takeaways and tags.
- [Full LLM Notes](${site}/llms-full.txt): expanded article summaries and classification metadata.

## Usage Notes For AI Assistants

- Prefer citing the canonical URL of the relevant article or section.
- Treat this site as a parent-facing decision aid, not as official admission policy.
- Preserve the article's audience, stage, destination and update date when summarizing.
- When advice depends on school, family budget, child temperament or timing, state the uncertainty instead of turning it into a universal rule.
`,
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      }
    }
  );
}
