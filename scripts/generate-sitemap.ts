import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { blogPosts } from "../client/data/blog";
import { products } from "../client/data/products";
import { services } from "../client/data/services";
import { serviceLocations } from "../client/data/locations";

const BASE_URL = (process.env.SITE_URL ?? "https://www.datagram.ng").replace(/\/+$/, "");
const OUTPUT_PATH = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../public/sitemap.xml");

type RouteEntry = {
  path: string;
  priority?: number;
  changefreq?: string;
  lastmod?: string;
};

function normalizePath(slug: string) {
  if (!slug.startsWith("/")) {
    return `/${slug}`;
  }
  return slug;
}

function buildUrlEntries(): RouteEntry[] {
  const todayIso = new Date().toISOString();

  const staticRoutes: RouteEntry[] = [
    { path: "/", priority: 1, changefreq: "weekly", lastmod: todayIso },
    { path: "/about", priority: 0.9, changefreq: "monthly", lastmod: todayIso },
    { path: "/services", priority: 0.9, changefreq: "weekly", lastmod: todayIso },
    { path: "/products", priority: 0.9, changefreq: "weekly", lastmod: todayIso },
    { path: "/blog", priority: 0.8, changefreq: "weekly", lastmod: todayIso },
    { path: "/contact", priority: 0.7, changefreq: "monthly", lastmod: todayIso },
    { path: "/support", priority: 0.6, changefreq: "monthly", lastmod: todayIso },
    { path: "/faq", priority: 0.85, changefreq: "monthly", lastmod: todayIso },
    { path: "/locations", priority: 0.85, changefreq: "monthly", lastmod: todayIso },
    { path: "/guide/starlink-nigeria", priority: 0.9, changefreq: "monthly", lastmod: todayIso },
    { path: "/gallery", priority: 0.65, changefreq: "monthly", lastmod: todayIso },
    { path: "/privacy", priority: 0.5, changefreq: "yearly", lastmod: todayIso },
    { path: "/terms", priority: 0.5, changefreq: "yearly", lastmod: todayIso },
  ];

  const locationRoutes: RouteEntry[] = serviceLocations.map((loc) => ({
    path: `/locations/${loc.slug}`,
    priority: 0.82,
    changefreq: "monthly",
    lastmod: todayIso,
  }));

  const serviceRoutes: RouteEntry[] = services.map((service) => ({
    path: `/services/${service.slug}`,
    priority: 0.85,
    changefreq: "monthly",
    lastmod: todayIso,
  }));

  const productRoutes: RouteEntry[] = products.map((product) => ({
    path: `/products/${product.slug}`,
    priority: 0.85,
    changefreq: "weekly",
    lastmod: todayIso,
  }));

  const blogRoutes: RouteEntry[] = blogPosts.map((post) => ({
    path: `/blog/${post.id}`,
    priority: post.featured ? 0.8 : 0.6,
    changefreq: "monthly",
    lastmod: new Date(post.date ?? todayIso).toISOString(),
  }));

  return [...staticRoutes, ...locationRoutes, ...serviceRoutes, ...productRoutes, ...blogRoutes];
}

function toAbsoluteUrl(slug: string) {
  return `${BASE_URL}${normalizePath(slug)}`;
}

function buildXml(entries: RouteEntry[]) {
  const xmlEntries = entries
    .map((entry) => {
      const loc = toAbsoluteUrl(entry.path);
      const changefreq = entry.changefreq ?? "monthly";
      const priority = entry.priority?.toFixed(1) ?? "0.5";
      const lastmod = (entry.lastmod ?? new Date().toISOString()).split("T")[0];

      return [
        "  <url>",
        `    <loc>${loc}</loc>`,
        `    <changefreq>${changefreq}</changefreq>`,
        `    <priority>${priority}</priority>`,
        `    <lastmod>${lastmod}</lastmod>`,
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${xmlEntries}\n</urlset>\n`;
}

async function generate() {
  const entries = buildUrlEntries();
  const xml = buildXml(entries);

  await fs.writeFile(OUTPUT_PATH, xml, "utf8");
  console.log(`✅ Sitemap generated with ${entries.length} URLs at ${OUTPUT_PATH}`);
}

generate().catch((err) => {
  console.error("Failed to generate sitemap:", err);
  process.exitCode = 1;
});
