import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/bond-recommendation-summary"],
    },
    sitemap: "https://bakerjonesholdings.com/sitemap.xml",
  };
}
