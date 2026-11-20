import type { MetadataRoute } from "next";
import { BRAND_NAME } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BRAND_NAME} — Omonbek Xojamurodov`,
    short_name: BRAND_NAME,
    description:
      "Portfolio and engineering blog of Omonbek Xojamurodov (omon.dev) — Frontend Engineer | Next.js & React Specialist in Tashkent, Uzbekistan.",
    start_url: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#09090b",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
