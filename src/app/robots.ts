import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const disallowInNonProd = process.env.NODE_ENV !== "production";

  return {
    rules: {
      userAgent: "*",
      allow: disallowInNonProd ? [] : ["/"],
      disallow: disallowInNonProd ? ["/"] : ["/admin", "/dashboard"],
    },
    sitemap: "/sitemap.xml",
  };
}

