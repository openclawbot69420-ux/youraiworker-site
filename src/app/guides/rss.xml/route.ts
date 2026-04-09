import { GUIDES } from "../../../lib/catalog"

const SITE_URL = "https://youraiworker.nl"
const SITE_NAME = "Your AI Worker"

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

export async function GET(): Promise<Response> {
  const buildDate = process.env.NEXT_PUBLIC_BUILD_DATE
    ? new Date(process.env.NEXT_PUBLIC_BUILD_DATE)
    : new Date()

  const items = GUIDES.map((guide) => {
    const pubDate = new Date(guide.publishedAt)
    const updatedDate = guide.updatedAt ? new Date(guide.updatedAt) : pubDate
    const url = `${SITE_URL}/guides/${guide.slug}`

    const content = [
      `<p>${escapeXml(guide.overview)}</p>`,
      "<h2>Stappen</h2>",
      "<ol>",
      ...guide.steps.map((step) => `<li>${escapeXml(step)}</li>`),
      "</ol>",
      "<h2>Checklist</h2>",
      "<ul>",
      ...guide.checklist.map((item) => `<li>${escapeXml(item)}</li>`),
      "</ul>",
    ].join("")

    return `
    <item>
      <title>${escapeXml(guide.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate.toUTCString()}</pubDate>
      <lastBuildDate>${updatedDate.toUTCString()}</lastBuildDate>
      <description>${escapeXml(guide.shortDescription)}</description>
      <content:encoded><![CDATA[${content}]]></content:encoded>
    </item>`
  }).join("")

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME} - Handleidingen</title>
    <link>${SITE_URL}/guides</link>
    <description>Praktische handleidingen voor AI-agents: van scope en approvals tot testen, security en go-live. Geen hype, wel concrete stappen voor veilige implementatie.</description>
    <language>nl-NL</language>
    <lastBuildDate>${buildDate.toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/guides/rss.xml" rel="self" type="application/rss+xml" />
    <copyright>© ${buildDate.getFullYear()} ${SITE_NAME}</copyright>
    <managingEditor>info@youraiworker.nl</managingEditor>
    <webMaster>info@youraiworker.nl</webMaster>
    <category>Technology</category>
    <category>AI</category>
    <category>Automation</category>
    <generator>Next.js</generator>
    <docs>https://www.rssboard.org/rss-specification</docs>
    <image>
      <url>${SITE_URL}/icon-512.png</url>
      <title>${SITE_NAME} - Handleidingen</title>
      <link>${SITE_URL}/guides</link>
    </image>
    ${items}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  })
}
