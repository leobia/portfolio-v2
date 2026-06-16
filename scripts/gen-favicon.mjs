// Generate the full favicon set from the LB monogram SVGs.
// Rasterizes with the real Bricolage Grotesque ExtraBold TTF (text is not
// outlined in the source SVGs, so the font must be supplied at render time).
//
//   node scripts/gen-favicon.mjs
//
// Sources (build inputs, NOT shipped in /public):
//   scripts/favicon-src/favicon-LB.svg        master monogram  -> sizes >= 48
//   scripts/favicon-src/favicon-LB-small.svg  fattened variant -> sizes <= 32
//
// The "LB" is auto-centered: we measure the real ink bounding box of the text
// (rendered font-free of the background) and translate it to the canvas center,
// so it does not depend on hand-tuned x/y in the source SVGs.

import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { Resvg } from '@resvg/resvg-js'
import pngToIco from 'png-to-ico'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const pub = join(root, 'public')
const fontFile = join(root, 'scripts/.fonts/bricolage-800.ttf')

const fontOpts = {
  fontFiles: [fontFile],
  loadSystemFonts: false,
  defaultFontFamily: 'Bricolage Grotesque',
}

const CANVAS = 512 // source viewBox is 0 0 512 512

// Build a centered variant of a source SVG by measuring the text bbox.
function centered(svg) {
  const textOnly = svg.replace(/<rect[^>]*>(<\/rect>)?/, '')
  const bbox = new Resvg(textOnly, { font: fontOpts, background: 'transparent' }).innerBBox()
  if (!bbox) return svg
  const dx = (CANVAS - bbox.width) / 2 - bbox.x
  const dy = (CANVAS - bbox.height) / 2 - bbox.y
  // Wrap the <text> in a translated group.
  return svg
    .replace(/(<text)/, `<g transform="translate(${dx.toFixed(2)} ${dy.toFixed(2)})"><text`)
    .replace(/(<\/text>)/, '$1</g>')
}

const master = centered(readFileSync(join(root, 'scripts/favicon-src/favicon-LB.svg'), 'utf8'))
const small = centered(readFileSync(join(root, 'scripts/favicon-src/favicon-LB-small.svg'), 'utf8'))

function render(size) {
  const svg = size <= 32 ? small : master
  return new Resvg(svg, {
    background: 'transparent',
    fitTo: { mode: 'width', value: size },
    font: fontOpts,
  }).render().asPng()
}

const pngs = {
  'favicon-16x16.png': 16,
  'favicon-32x32.png': 32,
  'apple-touch-icon.png': 180,
  'android-chrome-192x192.png': 192,
  'android-chrome-512x512.png': 512,
}

for (const [name, size] of Object.entries(pngs)) {
  writeFileSync(join(pub, name), render(size))
  console.log(`✓ ${name} (${size}px)`)
}

// favicon.ico: bundle 16 / 32 / 48
writeFileSync(join(pub, 'favicon.ico'), await pngToIco([render(16), render(32), render(48)]))
console.log('✓ favicon.ico (16/32/48)')
