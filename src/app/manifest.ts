import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Monefi. | The smart choice for your finances.",
    short_name: "Monefi.",
    description:
      "Empower your financial journey with expert advice and tailored financial services. From life insurance and mortgage solutions to business insurance and personal loans, we provide the support you need to make informed decisions and achieve lasting financial security.",
    start_url: "/",
    display: "standalone",
    background_color: "#ECEDDA",
    theme_color: "#232323",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
