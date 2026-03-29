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

// Format date to RFC 822 format for RSS (e.g., "Mon, 15 Mar 2025 10:00:00 GMT")
const formatRssDate = (isoDate: string) => {
  const date = new Date(isoDate)
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const day = days[date.getUTCDay()]
  const month = months[date.getUTCMonth()]
  const dayNum = String(date.getUTCDate()).padStart(2, "0")
  const year = date.getUTCFullYear()
  const hours = String(date.getUTCHours()).padStart(2, "0")
  const minutes = String(date.getUTCMinutes()).padStart(2, "0")
  const seconds = String(date.getUTCSeconds()).padStart(2, "0")
  return `${day}, ${dayNum} ${month} ${year} ${hours}:${minutes}:${seconds} GMT`
}

const getLastBuildDate = (guides: typeof GUIDES) => {
  if (guides.length === 0) return formatRssDate(new Date().toISOString().split("T")[0])
  const latest = guides.reduce((prev, current) => {
    const prevDate = new Date(prev.updatedAt || prev.publishedAt)
    const currDate = new Date(current.updatedAt || current.publishedAt)
    return prevDate > currDate ? prev : current
  })
  return formatRssDate(latest.updatedAt || latest.publishedAt)
}

export const GET = async () => {
  const items = GUIDES
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .map((guide) => {
      const url = `${SITE_URL}/guides/${guide.slug}`
      const title = escapeXml(guide.title)
      const description = escapeXml(guide.shortDescription)
      const pubDate = formatRssDate(guide.publishedAt)

      return [
        "  <item>",
        `    <title>${title}</title>`,
        `    <link>${url}</link>`,
        `    <guid isPermaLink="true">${url}</guid>`,
        `    <description>${description}</description>`,
        pubDate ? `    <pubDate>${pubDate}</pubDate>` : "",
        "  </item>",
      ]
        .filter(Boolean)
        .join("\n")
    })
    .join("\n")

  const lastBuildDate = getLastBuildDate(GUIDES)

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "<channel>",
    `  <title>Your AI Worker - Guides</title>`,
    `  <link>${SITE_URL}/guides</link>`,
    `  <description>Praktische guides over AI-agents, security en implementatie.</description>`,
    `  <language>nl</language>`,
    `  <lastBuildDate>${lastBuildDate}</lastBuildDate>`,
    `  <atom:link href="${SITE_URL}/guides/rss.xml" rel="self" type="application/rss+xml" />`,
    "",
    items,
    "</channel>",
    "</rss>",
  ].join("\n")

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  })
}
