import { getCollection } from "astro:content";

export async function GET() {
  const articles = (await getCollection("articles"))
    .filter((article) => article.data.public)
    .map((article) => ({
      title: article.data.title,
      summary: article.data.summary,
      parent_takeaway: article.data.parent_takeaway,
      url: `/articles/${article.data.permalink}`,
      destination: article.data.destination,
      student_stage: article.data.student_stage,
      topics: article.data.topics
    }));

  return new Response(JSON.stringify(articles), {
    headers: {
      "content-type": "application/json; charset=utf-8"
    }
  });
}
