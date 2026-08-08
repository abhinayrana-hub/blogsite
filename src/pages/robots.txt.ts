export const GET = () => {
  return new Response(
    `User-agent: *\nAllow: /\nSitemap: https://blog.example.com/sitemap-index.xml\n`,
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    },
  );
};
