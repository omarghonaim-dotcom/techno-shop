// scripts/fix-imports.mjs
import { readFileSync, writeFileSync } from "fs"
import { glob } from "glob"
import path from "path"

// ✅ Find all TS/TSX files
const files = glob.sync("src/**/*.{ts,tsx}")

// ✅ All patterns to fix
const patterns = [
  // Fixes: import x from "src/..."
  {
    regex: /from ["']src\/(.*?)["']/g,
    replace: 'from "@/$1"',
  },
  // Fixes: import x from "../..."
  {
    regex: /from ["']\.\.?\/(.*?)["']/g,
    replace: 'from "@/$1"',
  },
  // Fixes: require("src/...")
  {
    regex: /require\(["']src\/(.*?)["']\)/g,
    replace: 'require("@/$1")',
  },
]

files.forEach((file) => {
  let content = readFileSync(file, "utf8")
  let changed = false

  patterns.forEach(({ regex, replace }) => {
    const newContent = content.replace(regex, replace)
    if (newContent !== content) {
      content = newContent
      changed = true
    }
  })

  if (changed) {
    writeFileSync(file, content)
    console.log(`✅ Fixed: ${file}`)
  }
})

console.log("🎉 All imports fixed!")