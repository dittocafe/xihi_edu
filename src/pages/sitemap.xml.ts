import { getCollection } from "astro:content";

const site = "https://edu.bjxihi.com";

const staticPages = [
  "",
  "high-school-roadmap",
  "undergraduate-roadmap",
  "mainland-to-grad-roadmap",
  "timeline",
  "us",
  "grad",
  "decisions",
  "resources",
  "library",
  "uk",
  "about",
  "statement",
  "contact",
  "contact-thanks"
];

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function urlEntry(path: string, lastmod?: Date) {
  const loc = new URL(path, site).toString();
  const lastmodTag = lastmod ? `\n    <lastmod>${lastmod.toISOString().slice(0, 10)}</lastmod>` : "";

  return `  <url>
    <loc>${escapeXml(loc)}</loc>${lastmodTag}
  </url>`;
}

export async function GET() {
  const articles = await getCollection("articles", ({ data }) => data.public);
  const entries = [
    ...staticPages.map((path) => urlEntry(`/${path}`)),
    ...articles.map((article) => urlEntry(`/articles/${article.data.permalink}`, article.data.updated))
  ];

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>
`,
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8"
      }
    }
  );
}
