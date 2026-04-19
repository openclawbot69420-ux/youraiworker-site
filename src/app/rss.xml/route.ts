import { NextResponse } from "next/server";
import { GUIDES } from "../../lib/catalog";

const SITE_URL = "https://youraiworker.nl";
const SITE_NAME = "Your AI Worker";
const SITE_TAGLINE = "Productierijpe AI-agents voor Nederlandse bedrijven";

/**
 * Generate RSS feed for the entire site
 * Includes guides, updates, and key pages
 * Complements the guides-specific feed at /guides/rss.xml
 */
export async function GET(): Promise<NextResponse> {
  const now = new Date();
  const pubDate = now.toUTCString();
  const buildDate = now.toLocaleDateString("nl-NL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Generate items from guides
  const guideItems = GUIDES.map((guide) => {
    const pubDate = new Date(guide.publishedAt);
    const updatedDate = guide.updatedAt ? new Date(guide.updatedAt) : pubDate;

    return {
      title: guide.title,
      link: `${SITE_URL}/guides/${guide.slug}`,
      guid: `${SITE_URL}/guides/${guide.slug}`,
      pubDate: pubDate.toUTCString(),
      description: guide.shortDescription,
      category: "Handleiding",
      updated: updatedDate.toUTCString(),
    };
  }).sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

  // Static content updates
  const staticItems = [
    {
      title: "Productierijpe AI-agents - Start vandaag",
      link: `${SITE_URL}/`,
      guid: `${SITE_URL}/#homepage-${now.getFullYear()}-${now.getMonth()}`,
      pubDate: now.toUTCString(),
      updated: now.toUTCString(),
      description: `${SITE_TAGLINE}. Live in 3-10 werkdagen, eenmalig vanaf €1.000, geen maandelijkse kosten.`,
      category: "Product",
    },
    {
      title: "Prijzen en pakketten - Transparante tarieven",
      link: `${SITE_URL}/pricing`,
      guid: `${SITE_URL}/pricing#${now.getFullYear()}-${now.getMonth()}`,
      pubDate: now.toUTCString(),
      updated: now.toUTCString(),
      description:
        "Heldere pakketten voor AI-agent implementatie. Vanaf €1.000, geen maandelijkse kosten.",
      category: "Pricing",
    },
  ];

  const allItems = [...staticItems, ...guideItems];

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_TAGLINE}. Praktische updates over AI-automatisering, implementaties en best practices.</description>
    <language>nl-NL</language>
    <lastBuildDate>${pubDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE_URL}/icon-512.png</url>
      <title>${SITE_NAME}</title>
      <link>${SITE_URL}</link>
    </image>
    <category>AI Automation</category>
    <category>Business Technology</category>
    <category>Productivity</category>
    <copyright>© ${now.getFullYear()} ${SITE_NAME}</copyright>
    <ttl>60</ttl>
    <skipHours>
      <hour>0</hour>
      <hour>1</hour>
      <hour>2</hour>
      <hour>3</hour>
      <hour>4</hour>
      <hour>5</hour>
      <hour>6</hour>
    </skipHours>
    <skipDays>
      <day>Zaterdag</day>
      <day>Zondag</day>
    </skipDays>
${allItems
  .map(
    (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.link}</link>
      <guid isPermaLink="true">${item.guid}</guid>
      <pubDate>${item.pubDate}</pubDate>
      ${item.updated ? `<atom:updated>${item.updated}</atom:updated>` : ""}
      <description>${escapeXml(item.description)}</description>
      <category>${item.category}</category>
    </item>`
  )
  .join("\n")}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=7200",
      "X-Robots-Tag": "noindex",
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
