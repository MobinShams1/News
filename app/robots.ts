import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin/", // مسدودسازی کامل مسیر ادمین برای گوگل و بقیه ربات‌ها
    },
  };
}