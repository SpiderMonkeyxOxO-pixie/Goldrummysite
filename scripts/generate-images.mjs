// Builds the social-share (OG) image from scripts/og-source.svg, injecting
// the real logo (src/assets/images/logo.png) as a base64 data URI in place
// of the {{LOGO_BASE64}} token. Favicons/app icons live in
// generate-logo-assets.mjs instead — this script is OG-image only.
// Run with: node scripts/generate-images.mjs
import sharp from 'sharp';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const publicDir = path.join(root, 'public');
const logoPath = path.join(root, 'src', 'assets', 'images', 'logo.png');

const logoBase64 = `data:image/png;base64,${readFileSync(logoPath).toString('base64')}`;
const template = readFileSync(path.join(__dirname, 'og-source.svg'), 'utf-8');
const svg = template.replace('{{LOGO_BASE64}}', logoBase64);

await sharp(Buffer.from(svg), { density: 384 })
  .resize(1200, 630)
  .png({ compressionLevel: 9 })
  .toFile(path.join(publicDir, 'og', 'default.png'));

console.log('✓ public/og/default.png');
console.log('\nDone.');
