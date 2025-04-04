import { type Metadata } from "next";

import { siteConfig } from "~/site-config";

export function constructMetadata({
  video,
  canonicalUrl,
  image = "/assets/thumbnail.jpg",
  title = siteConfig.name,
  description = "A simple next.js starter template",
  ...rest
}: { image?: string; video?: string; canonicalUrl?: string } & Metadata) {
  return {
    title,
    description,
    icons: {
      icon: { url: "/favicon.ico", sizes: "any" },
      //shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      title: title ?? undefined,
      description: description ?? undefined,
      ...(image && { images: image }),
      ...(video && { videos: video }),
      ...rest.openGraph,
    },
    twitter: {
      title: title ?? undefined,
      description: description ?? undefined,
      creator: siteConfig.author.twitter,
      ...(image && { card: "summary_large_image", images: [image] }),
      ...(video && { player: video }),
      ...rest.twitter,
    },
    ...(canonicalUrl && { alternates: { canonical: canonicalUrl } }),
    ...rest,
  } as Metadata;
}
