import { readFile } from "node:fs/promises"
import { join } from "node:path"

const PROJECT_ROOT = new URL("../", import.meta.url)

const checkNoEmDash = (text) => {
  // Includes both the common em dash and the horizontal bar.
  return !text.includes("—") && !text.includes("―")
}

const main = async () => {
  const candidates = [
    "src/app/page.tsx",
    "src/app/pricing/page.tsx",
    "src/app/contact/page.tsx",
    "src/app/faq/page.tsx",
    "src/app/layout.tsx",
    "public/llms.txt",
  ]

  const violations = []

  for (const relPath of candidates) {
    const absPath = join(PROJECT_ROOT.pathname, relPath)
    const content = await readFile(absPath, "utf8")

    if (!checkNoEmDash(content)) {
      violations.push(relPath)
    }
  }

  if (violations.length > 0) {
    console.error("Copy lint failed: found em dash characters in:")
    for (const path of violations) console.error(`- ${path}`)
    process.exit(1)
  }

  console.log("Copy lint ok")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
