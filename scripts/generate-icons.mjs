// Generates app launcher icon, Android adaptive foreground, splash image, and
// web favicon from the brand mark (candle within a radiant halo).
//
//   node scripts/generate-icons.mjs
//
// Uses @resvg/resvg-js (pure Node) — no system rasterizer required.

import { Resvg } from '@resvg/resvg-js';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const assets = join(root, 'assets');

const C = {
  purple: '#5B3A8C',
  purpleDark: '#3E2766',
  ringFaint: '#7F77DD',
  ring: '#534AB7',
  ray: '#7F77DD',
  orb: '#EEEDFE',
  candle: '#D3D1C7',
  candleShade: '#B4B2A9',
  wick: '#444441',
  flameOuter: '#EF9F27',
  flameMid: '#FAC775',
  flameCore: '#FFF7ED',
  dot: '#AFA9EC',
};

const CX = 340;
const CY = 160;

// The candle-and-halo mark as raw SVG elements (same geometry as Logo.tsx).
function markElements() {
  let rays = '';
  for (let i = 0; i < 12; i++) {
    const a = ((i * 30 - 90) * Math.PI) / 180;
    const x1 = CX + 86 * Math.cos(a);
    const y1 = CY + 86 * Math.sin(a);
    const x2 = CX + 94 * Math.cos(a);
    const y2 = CY + 94 * Math.sin(a);
    rays += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C.ray}" stroke-width="1.5" stroke-linecap="round"/>`;
  }
  return `
    <circle cx="${CX}" cy="${CY}" r="96" fill="none" stroke="${C.ringFaint}" stroke-width="1" stroke-dasharray="4 6" opacity="0.2"/>
    <circle cx="${CX}" cy="${CY}" r="78" fill="none" stroke="${C.ring}" stroke-width="1.5"/>
    ${rays}
    <circle cx="${CX}" cy="${CY}" r="60" fill="${C.orb}"/>
    <rect x="328" y="168" width="24" height="36" rx="3" fill="${C.candle}"/>
    <rect x="344" y="168" width="8" height="36" rx="1" fill="${C.candleShade}" opacity="0.5"/>
    <ellipse cx="340" cy="168" rx="12" ry="3" fill="${C.candle}"/>
    <line x1="340" y1="168" x2="340" y2="157" stroke="${C.wick}" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M340 108 C328 120 320 135 325 148 C328 156 335 160 340 158 C345 160 352 156 355 148 C360 135 352 120 340 108 Z" fill="${C.flameOuter}"/>
    <path d="M340 116 C333 126 329 138 333 147 C335 153 338 156 340 155 C342 156 345 153 347 147 C351 138 347 126 340 116 Z" fill="${C.flameMid}"/>
    <path d="M340 128 C337 134 336 141 337 146 C338 149 339 151 340 151 C341 151 342 149 343 146 C344 141 343 134 340 128 Z" fill="${C.flameCore}"/>
    <circle cx="340" cy="82" r="3" fill="${C.dot}"/>
    <circle cx="418" cy="160" r="3" fill="${C.dot}"/>
    <circle cx="340" cy="238" r="3" fill="${C.dot}"/>
    <circle cx="262" cy="160" r="3" fill="${C.dot}"/>
  `;
}

// viewBox padding controls how large the mark sits in the canvas.
// half = half-size of the square viewBox centered on the mark.
function svg({ half, background }) {
  const x = CX - half;
  const y = CY - half;
  const size = half * 2;
  const bg = background
    ? `<rect x="${x}" y="${y}" width="${size}" height="${size}" fill="${background}"/>`
    : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x} ${y} ${size} ${size}">${bg}${markElements()}</svg>`;
}

function render(svgString, width, outFile, fontFiles) {
  const options = { fitTo: { mode: 'width', value: width } };
  if (fontFiles) {
    options.font = { fontFiles, loadSystemFonts: false, defaultFontFamily: 'EB Garamond' };
  }
  const resvg = new Resvg(svgString, options);
  const png = resvg.render().asPng();
  writeFileSync(join(assets, outFile), png);
  console.log('wrote', outFile, `(${width}px)`);
}

// EB Garamond (the app's serif) for baking the wordmark into the splash image.
const FONT_FILES = [
  join(root, 'node_modules/@expo-google-fonts/eb-garamond/700Bold/EBGaramond_700Bold.ttf'),
  join(root, 'node_modules/@expo-google-fonts/eb-garamond/400Regular/EBGaramond_400Regular.ttf'),
];

// Inner elements of the full brand lockup: mark + divider + wordmark + tagline.
function lockupContents() {
  return `
    ${markElements()}
    <line x1="180" y1="270" x2="500" y2="270" stroke="#AFA9EC" stroke-width="0.5"/>
    <text x="340" y="314" fill="#CECBF6" font-family="EB Garamond" font-weight="700" font-size="33" text-anchor="middle">Pray with Saints</text>
    <text x="340" y="344" fill="#B4B2A9" font-family="EB Garamond" font-weight="400" font-size="14" letter-spacing="1.5" text-anchor="middle">PRAYWITHSAINTS.COM</text>
  `;
}

// Wrap the lockup in a square viewBox (x,y,size) with an optional background.
function lockupSvg({ x, y, size, background }) {
  const bg = background ? `<rect x="${x}" y="${y}" width="${size}" height="${size}" fill="${background}"/>` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x} ${y} ${size} ${size}">${bg}${lockupContents()}</svg>`;
}

// The lockup content spans roughly x[180,500], y[64,350] (centre ≈ 340,207).

// 1) iOS / main launcher icon — candle mark only, opaque purple, ~24% padding.
render(svg({ half: 126, background: C.purple }), 1024, 'icon.png');

// 2) Android adaptive foreground — candle mark only, transparent, extra padding
//    for the mask safe zone. Background colour set in app.json.
render(svg({ half: 192, background: null }), 1024, 'android-icon-foreground.png');

// 3) Splash — full lockup (mark + wordmark + tagline), transparent background.
render(lockupSvg({ x: 160, y: 27, size: 360, background: null }), 1100, 'splash-icon.png', FONT_FILES);

// 4) Web favicon — candle mark only on purple.
render(svg({ half: 126, background: C.purple }), 196, 'favicon.png');

console.log('done');
