import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://REPLACE-WITH-DOMAIN";
  return [
    {
      url: base,
      lastModified: new Date(),
      priority: 1,
    },
  ];
}
