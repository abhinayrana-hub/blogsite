import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { siteConfig } from "../config/site";

export async function GET(context) {
  const posts = (await getCollection("blog"))
    .filter((post) => !post.data.draft)
    .sort(
      (a, b) => b.data.publishedDate.valueOf() - a.data.publishedDate.valueOf(),
    );

  return rss({
    title: siteConfig.siteName,
    description: siteConfig.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishedDate,
      description: post.data.description,
      link: `/${post.data.category}/${
        post.id
          .split("/")
          .pop()
          ?.replace(/\.[^/.]+$/, "") ?? ""
      }/`,
    })),
  });
}
