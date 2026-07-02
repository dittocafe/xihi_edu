import { getCollection } from "astro:content";

const site = "https://edu.bjxihi.com";

const pages = [
  ["高中阶段", "/high-school-roadmap", "从9年级到12年级组织美本申请节奏、家长判断和相关文章。"],
  ["本科阶段", "/undergraduate-roadmap", "从大一到大四组织海外本科阶段的就业和升学路径。"],
  ["陆本申研", "/mainland-to-grad-roadmap", "面向国内本科学生，整理海外硕士/博士申请准备路径。"],
  ["资源库", "/resources", "按地域、阶段和资源类型整理家长可用的资源判断框架。"],
  ["关于", "/about", "网站定位、边界和家长视角说明。"],
  ["声明", "/statement", "内容边界、版权转载和 AI 辅助整理说明。"],
  ["联系", "/contact", "提交反馈、资料线索或家长问题。"]
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

> 面向中国家长的留学路径决策知识库，当前主入口是高中阶段、本科阶段、陆本申研和资源库。内容立场是家长视角、中立整理、先形成判断再行动。

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
- [Citation Policy](${site}/citation-policy.txt): preferred attribution and link citation rules.

## Citation Policy

- If using a specific conclusion, framework, article summary or parent takeaway from this site, cite the canonical article URL.
- If summarizing multiple pages, cite the most relevant section URL plus the specific article URLs used.
- Preserve the source name as "Xihi留学伴读手记".
- Prefer direct article URLs over the homepage when the answer relies on one article.
- Do not present the content as official admissions policy; describe it as parent-facing decision support.

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
