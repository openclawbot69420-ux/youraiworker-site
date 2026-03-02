import { NextResponse } from "next/server"

import { GUIDES } from "../../../lib/catalog"

const SITE_URL = "https://youraiworker.nl"

export const runtime = "nodejs"

const escapeXml = (value: string) => {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;")
}

export const GET = async () => {
  const items = GUIDES
    .map((guide) => {
      const url = `${SITE_URL}/guides/${guide.slug}`
      const title = escapeXml(guide.title)
      const description = escapeXml(guide.shortDescription)
      const pubDate = undefined

      return [
        "<item>",
        `<title>${title}</title>`,
        `<link>${url}</link>`,
        `<guid>${url}</guid>`,
        `<description>${description}</description>`,
        pubDate ? `<pubDate>${pubDate}</pubDate>` : "",
        "</item>",
      ]
        .filter(Boolean)
        .join("")
    })
    .join("")

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    "<channel>",
    `<title>Your AI Worker - Guides</title>`,
    `<link>${SITE_URL}/guides</link>`,
    `<description>Praktische guides over AI-agents, security en implementatie.</description>`,
    `<language>nl</language>`,
    items,
    "</channel>",
    "</rss>",
  ].join("")

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  })
}
