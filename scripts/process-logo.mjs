// Turns the black-background logo into a trimmed, transparent PNG.
// Black -> transparent (alpha derived from brightness), then trims padding.
import sharp from "sharp";

const SRC = "public/logo.png";
const OUT = "public/logo-mark.png";

const base = sharp(SRC).ensureAlpha();
const { data, info } = await base
  .raw()
  .toBuffer({ resolveWithObject: true });

const { channels } = info; // 4 (RGBA)

for (let i = 0; i < data.length; i += channels) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];

  // Brightest channel = how "white" the pixel is. Black bg -> 0 -> transparent.
  let alpha = Math.max(r, g, b);

  // Clean up faint compression noise near pure black.
  if (alpha < 16) alpha = 0;

  // Force the logo to pure white; brightness only drives transparency.
  data[i] = 255;
  data[i + 1] = 255;
  data[i + 2] = 255;
  data[i + 3] = alpha;
}

await sharp(data, { raw: { width: info.width, height: info.height, channels } })
  .trim({ threshold: 10 }) // crop away the now-transparent border
  .png()
  .toFile(OUT);

const meta = await sharp(OUT).metadata();
console.log(`Wrote ${OUT} (${meta.width}x${meta.height})`);
