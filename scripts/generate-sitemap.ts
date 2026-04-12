import { writeFileSync } from "fs";

const BASE_URL = "https://z3tz3r0.github.io";
const today = new Date().toISOString().split("T")[0];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

writeFileSync("dist/sitemap.xml", sitemap);
console.log(`sitemap.xml generated (${today})`);
