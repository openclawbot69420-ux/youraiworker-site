import fs from "node:fs/promises";
import path from "node:path";
import * as icons from "simple-icons/icons";

const outDir = path.join(process.cwd(), "public", "brands");

// key -> simple-icons export name
const BRAND_MAP = {
  gmail: "siGmail",
  "google-calendar": "siGooglecalendar",
  whatsapp: "siWhatsapp",
  slack: "siSlack",
  hubspot: "siHubspot",
  salesforce: "siSalesforce",
  zapier: "siZapier",
  telegram: "siTelegram",
};

const wrapSvg = (svgPath, hex) => {
  // simple-icons provides a <path .../> string. Wrap into full SVG.
  return `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#${hex}">` +
    svgPath +
    `</svg>\n`;
};

await fs.mkdir(outDir, { recursive: true });

for (const [key, exportName] of Object.entries(BRAND_MAP)) {
  const icon = icons[exportName];
  if (!icon) {
    throw new Error(`Missing icon export: ${exportName}`);
  }

  const svg = wrapSvg(icon.path, icon.hex);
  const outPath = path.join(outDir, `${key}.svg`);
  await fs.writeFile(outPath, svg, "utf8");
  // eslint-disable-next-line no-console
  console.log(`wrote ${outPath}`);
}
