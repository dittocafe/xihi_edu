const site = "https://edu.bjxihi.com";

export function GET() {
  return new Response(
    `User-agent: *
Allow: /

Sitemap: ${site}/sitemap.xml
LLMs: ${site}/llms.txt
Citation-Policy: ${site}/citation-policy.txt
`,
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      }
    }
  );
}
