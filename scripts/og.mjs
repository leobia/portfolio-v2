// Generates public/og.png (1200x630) for link previews, on-brand with the site.
// Run: node scripts/og.mjs
import { chromium } from 'playwright'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const out = resolve(__dirname, '../public/og.png')

const html = `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=JetBrains+Mono:wght@400;600&family=Hanken+Grotesk:wght@400&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; }
  html, body { width: 1200px; height: 630px; }
  body {
    background: #ffffff; color: #0a0a0a;
    padding: 72px 80px; display: flex; flex-direction: column; justify-content: space-between;
    border-top: 10px solid #d93b29;
  }
  .logo { font-family: 'JetBrains Mono', monospace; font-size: 22px; font-weight: 600;
    letter-spacing: 0.12em; text-transform: uppercase; }
  .bullet { color: #d93b29; }
  h1 { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 92px;
    line-height: 0.97; letter-spacing: -0.035em; max-width: 980px; }
  .accent { color: #d93b29; }
  p { font-family: 'Hanken Grotesk', sans-serif; font-size: 26px; color: #4d4d4d; max-width: 760px; }
  .foot { font-family: 'JetBrains Mono', monospace; font-size: 16px; letter-spacing: 0.14em;
    text-transform: uppercase; color: #707070; }
</style></head>
<body>
  <div class="logo"><span class="bullet">●</span> Leonardo Bianco</div>
  <div>
    <h1>Crafting fast, accessible web that <span class="accent">ships clean.</span></h1>
  </div>
  <div>
    <p>Web developer based in Firenze — backend services to the last pixel.</p>
    <div class="foot" style="margin-top:18px;">// Backend · Web · Infra &nbsp;&nbsp; leonardobianco.dev</div>
  </div>
</body></html>`

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
await page.setContent(html, { waitUntil: 'networkidle' })
await page.waitForTimeout(400)
await page.screenshot({ path: out, type: 'png' })
await browser.close()
console.log('wrote', out)
