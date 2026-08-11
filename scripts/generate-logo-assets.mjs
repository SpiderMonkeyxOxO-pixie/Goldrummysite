// Regenerates favicon/app-icon PNGs from the supplied logo artwork
// (src/assets/images/logo.png, 190x190 source). Also wraps it in an SVG
// shell for the two spots that need a literal .svg file — favicons and
// manifest icons support arbitrary raster inside <image>, so this stays a
// valid SVG without us hand-vectorizing a multi-colour logo.
// Run with: node scripts/generate-logo-assets.mjs
import sharp from 'sharp';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const source = path.join(root, 'src', 'assets', 'images', 'logo.png');
const publicDir = path.join(root, 'public');

const pngJobs = [
  { out: path.join(publicDir, 'icons', 'icon-512.png'), size: 512 },
  { out: path.join(publicDir, 'icons', 'icon-192.png'), size: 192 },
  { out: path.join(publicDir, 'apple-touch-icon.png'), size: 180 },
  { out: path.join(publicDir, 'favicon-32x32.png'), size: 32 },
  { out: path.join(publicDir, 'favicon-16x16.png'), size: 16 },
];

for (const job of pngJobs) {
  await sharp(source).resize(job.size, job.size).png({ compressionLevel: 9 }).toFile(job.out);
  console.log(`✓ ${path.relative(root, job.out)}`);
}

// Maskable icon: pad so the logo sits inside the ~80% safe zone OS masks
// won't crop, on a background colour matched to the logo's own card-table
// green so the padding is invisible.
await sharp(source)
  .resize(410, 410)
  .extend({ top: 51, bottom: 51, left: 51, right: 51, background: '#0c3d24' })
  .png({ compressionLevel: 9 })
  .toFile(path.join(publicDir, 'icons', 'icon-maskable-512.png'));
console.log('✓ public/icons/icon-maskable-512.png');

// SVG wrappers — a valid .svg document embedding the real PNG, used where
// a literal SVG file is expected (favicon <link>, manifest "any" fallback).
function svgWrapper(size, base64) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><image width="${size}" height="${size}" href="data:image/png;base64,${base64}" /></svg>\n`;
}

const base64Source = readFileSync(source).toString('base64');
const fs = await import('node:fs/promises');
await fs.writeFile(path.join(publicDir, 'favicon.svg'), svgWrapper(190, base64Source));
console.log('✓ public/favicon.svg');
await fs.writeFile(path.join(publicDir, 'icons', 'icon-192.svg'), svgWrapper(190, base64Source));
console.log('✓ public/icons/icon-192.svg');

console.log('\nDone.');
