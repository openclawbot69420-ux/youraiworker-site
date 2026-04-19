#!/usr/bin/env node
/**
 * Generates humans.txt with dynamic build timestamp and git commit info
 * Run before build to ensure humans.txt reflects actual build time
 */
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const now = new Date();
const buildDate = now.toISOString();
const formattedDate = now.toLocaleDateString('nl-NL', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
const formattedTime = now.toLocaleTimeString('nl-NL', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Europe/Amsterdam',
});

// Get git commit info for transparency (fall back gracefully if not in git repo)
let gitCommit = 'unknown';
let gitBranch = 'unknown';
let gitDate = 'unknown';
try {
  gitCommit = execSync('git rev-parse --short HEAD', { encoding: 'utf-8', cwd: join(__dirname, '..') }).trim();
  gitBranch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8', cwd: join(__dirname, '..') }).trim();
  gitDate = execSync('git log -1 --format=%ci', { encoding: 'utf-8', cwd: join(__dirname, '..') }).trim();
} catch {
  // Git not available, keep defaults
}

const content = `/* TEAM */
Company: Your AI Worker
Founders: Mees, Tieko
Location: Amsterdam, Nederland
Email: info@youraiworker.nl
Website: https://youraiworker.nl
Founded: 2026
KvK: 95290475
BTW: NL8677.15.849.B01

/* SITE */
Last update: ${formattedDate} ${formattedTime} Europe/Amsterdam
Build timestamp: ${buildDate}
Git commit: ${gitCommit}
Git branch: ${gitBranch}
Git date: ${gitDate}
Language: Dutch (nl-NL)
Standards: HTML5, CSS3, TypeScript, React
Software: Next.js 16.2.0, Tailwind CSS, Node.js
Build: Next.js (App Router)

/* TECHNOLOGY */
Runtime: OpenClaw (https://openclaw.ai)
Framework: Next.js with App Router
Styling: Tailwind CSS
Icons: Lucide React, Simple Icons
Fonts: Inter (Google Fonts)

/* PRINCIPLES */
Security-first: TLS, least-privilege access, secrets management
Privacy-by-design: AVG-compliant, data minimalisation
No trackers: No third-party analytics or advertising scripts
Transparency: Build and version info publicly visible

/* CAREERS */
Status: Open to exceptional talent
Roles: Implementation engineers, AI infrastructure specialists, client success
Contact: info@youraiworker.nl
Note: We hire slowly and only when workload demands it. No recruiters please.

/* THANKS */
OpenClaw: https://github.com/openclaw/openclaw
Open source community: React, Next.js, Tailwind CSS contributors

/* SECURITY */
Responsible disclosure: security@youraiworker.nl
Policy: https://youraiworker.nl/.well-known/security.txt
`;

const publicDir = join(__dirname, '..', 'public');
const outputPath = join(publicDir, 'humans.txt');
writeFileSync(outputPath, content, 'utf-8');
console.log(`Generated humans.txt with build date: ${formattedDate} ${formattedTime}`);
console.log(`Git commit: ${gitCommit} (${gitBranch})`);
