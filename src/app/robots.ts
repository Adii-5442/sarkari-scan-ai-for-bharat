import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "Googlebot", allow: "/", disallow: ["/api/", "/_next/", "/private/"] },
      { userAgent: "Bingbot", allow: "/", disallow: ["/api/", "/_next/", "/private/"] },
      { userAgent: "GPTBot", allow: "/", disallow: ["/api/", "/_next/", "/private/"] },
      { userAgent: "ChatGPT-User", allow: "/", disallow: ["/api/", "/_next/", "/private/"] },
      { userAgent: "ClaudeBot", allow: "/", disallow: ["/api/", "/_next/", "/private/"] },
      { userAgent: "PerplexityBot", allow: "/", disallow: ["/api/", "/_next/", "/private/"] },
      { userAgent: "Google-Extended", allow: "/", disallow: ["/api/", "/_next/", "/private/"] },
      { userAgent: "*", allow: "/", disallow: ["/api/", "/_next/", "/private/"] },
    ],
    sitemap: "https://sarkariscan.com/sitemap.xml",
    host: "https://sarkariscan.com",
  };
}
