import { getCollection } from "astro:content";

const site = "https://edu.bjxihi.com";

function formatList(values: string[]) {
  return values.length ? values.join("、") : "未标注";
}

export async function GET() {
  const articles = (await getCollection("articles", ({ data }) => data.public)).sort(
    (a, b) => b.data.updated.getTime() - a.data.updated.getTime()
  );

  const articleBlocks = articles.map((article) => {
    const data = article.data;

    return `## ${data.title}

- URL: ${new URL(`/articles/${data.permalink}`, site).toString()}
- Updated: ${data.updated.toISOString().slice(0, 10)}
- Audience: ${formatList(data.primary_audience)}
- Student stage: ${formatList(data.student_stage)}
- Destination: ${formatList(data.destination)}
- Family location: ${formatList(data.family_location)}
- Topics: ${formatList(data.topics)}
- Decision type: ${formatList(data.decision_type)}
- Season: ${formatList(data.season)}
- Summary: ${data.summary}
- Parent takeaway: ${data.parent_takeaway}
`;
  });

  return new Response(
    `# Xihi留学伴读手记 - Expanded LLM Context

This file gives AI assistants a compact, source-oriented overview of the public knowledge base. The site is written for Chinese parents making study-abroad decisions, especially around US undergraduate applications, US graduate applications, UK comparison, and Beijing/Shanghai resource access.

${articleBlocks.join("\n")}
`,
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      }
    }
  );
}
