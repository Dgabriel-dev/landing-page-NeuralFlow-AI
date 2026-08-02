import { SITE_CONFIG } from "@/lib/constants";

export default function sitemap() {
  const routes = ["", "/about", "/features", "/pricing", "/contact"];

  return routes.map((route) => ({
    url: `${SITE_CONFIG.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));
}
