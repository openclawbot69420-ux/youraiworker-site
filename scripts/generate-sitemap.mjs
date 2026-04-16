#!/usr/bin/env node
/**
 * Generates sitemap.xml with dynamic lastmod timestamps
 * Run before build to ensure accurate freshness signals for SEO
 */
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const today = new Date().toISOString().split('T')[0];
const siteUrl = 'https://youraiworker.nl';

const pages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/pricing', priority: '0.9', changefreq: 'monthly' },
  { path: '/use-cases', priority: '0.8', changefreq: 'monthly' },
  { path: '/use-cases/email-management', priority: '0.5', changefreq: 'monthly' },
  { path: '/use-cases/whatsapp-support', priority: '0.5', changefreq: 'monthly' },
  { path: '/use-cases/lead-qualification', priority: '0.5', changefreq: 'monthly' },
  { path: '/use-cases/meeting-scheduling', priority: '0.5', changefreq: 'monthly' },
  { path: '/use-cases/invoice-tracking', priority: '0.5', changefreq: 'monthly' },
  { path: '/use-cases/internal-helpdesk', priority: '0.5', changefreq: 'monthly' },
  { path: '/use-cases/customer-onboarding', priority: '0.5', changefreq: 'monthly' },
  { path: '/use-cases/knowledge-base-qa', priority: '0.5', changefreq: 'monthly' },
  { path: '/use-cases/report-generation', priority: '0.5', changefreq: 'monthly' },
  { path: '/use-cases/crm-data-sync', priority: '0.5', changefreq: 'monthly' },
  { path: '/use-cases/document-drafting', priority: '0.5', changefreq: 'monthly' },
  { path: '/use-cases/approval-workflows', priority: '0.5', changefreq: 'monthly' },
  { path: '/implementatie', priority: '0.8', changefreq: 'monthly' },
  { path: '/integrations', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
  { path: '/faq', priority: '0.6', changefreq: 'monthly' },
  { path: '/about', priority: '0.6', changefreq: 'monthly' },
  { path: '/garantie', priority: '0.5', changefreq: 'quarterly' },
  { path: '/guides', priority: '0.6', changefreq: 'weekly' },
  { path: '/guides/eerste-agent', priority: '0.5', changefreq: 'monthly' },
  { path: '/guides/security', priority: '0.5', changefreq: 'quarterly' },
  { path: '/guides/testen-en-go-live', priority: '0.5', changefreq: 'monthly' },
  { path: '/security', priority: '0.5', changefreq: 'quarterly' },
  { path: '/privacy', priority: '0.5', changefreq: 'quarterly' },
  { path: '/terms', priority: '0.5', changefreq: 'quarterly' },
];

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${siteUrl}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

const publicDir = join(__dirname, '..', 'public');
const outputPath = join(publicDir, 'sitemap.xml');

writeFileSync(outputPath, sitemapContent, 'utf-8');
console.log(`Generated sitemap.xml with ${pages.length} URLs, lastmod: ${today}`);
