import type { MetadataRoute } from "next";
import { BRAND_NAME } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BRAND_NAME} — Omonbek Khojamurodov`,
    short_name: BRAND_NAME,
    description:
      "Official site and engineering blog of Omonbek Khojamurodov (omon.dev) — Frontend & Full-Stack Software Engineer.",
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
