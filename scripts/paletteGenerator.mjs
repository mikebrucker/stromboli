import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = dirname(fileURLToPath(import.meta.url));
const cssPath = resolve(__dirname, "../global.css");
const outPath = resolve(__dirname, "../theme/palette.ts");
const themeDir = resolve(__dirname, "../theme");

if (!existsSync(themeDir)) mkdirSync(themeDir);
if (!existsSync(outPath)) writeFileSync(outPath, "", "utf8");

const css = readFileSync(cssPath, "utf8");

const flat = {};
const scaled = {};

for (const line of css.split("\n")) {
  const trimmed = line.trim();

  const flatMatch = /^--color-(black|white):\s*([^;]+);/.exec(trimmed);
  if (flatMatch) {
    const name = flatMatch[1];
    const raw = flatMatch[2].trim();
    flat[name] = raw === "#000" ? "oklch(0% 0 0)" : raw === "#fff" ? "oklch(100% 0 0)" : raw;
    continue;
  }

  const scaleMatch = /^--color-([a-z]+)-(\d+):\s*(oklch\([^)]+\));/.exec(trimmed);
  if (scaleMatch) {
    const [, name, shade, value] = scaleMatch;
    if (!scaled[name]) scaled[name] = {};
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    scaled[name][shade] = value;
  }
}

const lines = [];
lines.push("export const palette = {");

for (const [name, value] of Object.entries(flat)) {
  lines.push(`  ${name}: "${value}",`);
}

for (const [name, shades] of Object.entries(scaled)) {
  lines.push(`  ${name}: {`);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  for (const [shade, value] of Object.entries(shades)) {
    lines.push(`    ${shade}: "${value}",`);
  }
  lines.push("  },");
}

lines.push("} as const;");
lines.push("");

writeFileSync(outPath, lines.join("\n"), "utf8");
console.log(`wrote ${outPath}`);
