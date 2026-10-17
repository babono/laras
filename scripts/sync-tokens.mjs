// Copies the color tokens out of the iOS app's asset catalog into
// src/tokens/catalog.json, so Laras documents the colors the app actually
// ships rather than a copy someone typed in and forgot to update.
//
//   GOMELAN=~/Dev/gomelan npm run sync-tokens
//
// The asset catalog is the source of truth (Theme.swift reads it by name), so
// this is one-way: change a color in Xcode, then sync here.
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const repo = (process.env.GOMELAN ?? join(homedir(), "Dev/gomelan")).replace(/^~/, homedir());
const catalog = join(repo, "Kotek/Resources/Assets.xcassets");

// Components are "0xNN" hex bytes or 0–1 floats, depending on how Xcode saved them.
const byte = (v) => (String(v).startsWith("0x") ? parseInt(v, 16) : Math.round(Number(v) * 255));
const hex = (n) => n.toString(16).padStart(2, "0").toUpperCase();

const colors = {};
for (const dir of readdirSync(catalog).filter((d) => d.endsWith(".colorset")).sort()) {
  const json = JSON.parse(readFileSync(join(catalog, dir, "Contents.json"), "utf8"));
  // The app is dark-only: the first universal entry is the color.
  const c = json.colors?.find((e) => e.color?.components)?.color.components;
  if (!c) continue;
  colors[dir.replace(".colorset", "")] = `#${hex(byte(c.red))}${hex(byte(c.green))}${hex(byte(c.blue))}`;
}

const out = new URL("../src/tokens/catalog.json", import.meta.url);
writeFileSync(out, JSON.stringify({ source: "Kotek/Resources/Assets.xcassets", colors }, null, 2) + "\n");
console.log(`synced ${Object.keys(colors).length} colors from ${catalog}`);
