# Handoff: Personal Website (Software Engineer)

## Overview
A personal/portfolio website for a software engineer. Editorial, monochrome aesthetic
with a single vermilion accent, grotesk display type, and monospace micro-labels.
The current prototype covers the **top of the homepage**: announcement ticker, sticky
nav, hero (headline + "Now" board), and the first "Selected Work" project row.
Remaining sections (full project grid, About, Experience/timeline, Writing, Contact)
are planned and should follow the same system.

## About the Design Files
The file in this bundle (`Personal Site.dc.html`) is a **design reference created in HTML** —
a prototype showing the intended look, type, spacing, and interactions. It is **not
production code to copy directly**. (It uses a lightweight in-house templating runtime,
`support.js`; ignore that mechanism entirely — only the rendered markup/styles matter.)

The task is to **recreate this design in the target codebase's existing environment**
(React, Vue, Svelte, SwiftUI, etc.) using its established components, patterns, and
conventions. If no environment exists yet, choose an appropriate modern stack
(e.g. React + Vite, or Next.js) and implement it there. Reproduce the visual design
faithfully; structure the code idiomatically for the chosen framework.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, and interactions are specified
below and should be reproduced pixel-faithfully. Content (name, projects, stack, copy)
is **placeholder** — the layout/system is final; the words are not.

---

## Screens / Views

### Homepage (single scrolling page)

Page background `#ffffff`, ink `#0a0a0a`. Max content width **1280px**, centered,
horizontal padding **48px**.

#### 1. Announcement Ticker (top bar)
- Full-bleed bar, background = accent `oklch(0.58 0.21 27)` (≈ `#d93b29`), text `#ffffff`.
- Padding `9px 48px`. `display:flex; gap:30px; white-space:nowrap; overflow:hidden`.
- Items, JetBrains Mono, `10.5px`, `letter-spacing:0.14em`, uppercase:
  `● Open to select work` · `// Shipping since 2019` · `// Backend · Web · Infra` · `// Based remote, global`
- (Optional enhancement: marquee animation. Currently static.)

#### 2. Navigation (sticky)
- `position:sticky; top:0; z-index:10`. Background `rgba(255,255,255,0.85)` + `backdrop-filter:blur(10px)`.
- Padding `22px 48px`, bottom border `1px solid #eee`. `display:flex; justify-content:space-between; align-items:center`.
- **Logo (left):** JetBrains Mono `12.5px`, weight 600, `letter-spacing:0.12em`, uppercase.
  Text: `● Your Name` — the `●` bullet is accent-colored.
- **Links (center):** JetBrains Mono `11px`, `letter-spacing:0.12em`, uppercase, color `#707070`,
  `gap:30px`. Items: `Work` `About` `Writing` `Journey`. Hover → color `#0a0a0a`.
- **Contact button (right):** accent background `oklch(0.58 0.21 27)`, white text, JetBrains Mono
  `11px`, weight 600, `letter-spacing:0.12em`, uppercase, `border-radius:999px`, padding `10px 20px`.
  Text `Contact →`. Hover → background `oklch(0.52 0.21 27)`.

#### 3. Hero
- Two-column CSS grid: `grid-template-columns: 1.18fr 0.82fr; gap:56px; align-items:center`.
  Padding `72px 48px 64px`.

**Left column:**
- **Eyebrow pill:** inline-flex, `gap:9px`, background `oklch(0.58 0.21 27 / 0.08)`,
  border `1px solid oklch(0.58 0.21 27 / 0.25)`, `border-radius:999px`, padding `8px 16px`.
  JetBrains Mono `10.5px`, `letter-spacing:0.14em`, uppercase, color `oklch(0.5 0.2 27)`.
  Text: `● Software Engineer  //  Available Q3`.
- **Headline (h1):** Space Grotesk, weight 700, `font-size:68px`, `line-height:0.97`,
  `letter-spacing:-0.035em`, margin `26px 0 24px`. Text: "Building reliable systems that
  **ship at scale.**" — the phrase "ship at scale." is wrapped in a span colored
  `oklch(0.58 0.21 27)`.
- **Body paragraph:** Hanken Grotesk `17px`, `line-height:1.62`, color `#4d4d4d`,
  `max-width:500px`, margin `0 0 30px`.
- **Tag chips:** row, `flex-wrap:wrap; gap:10px`, margin-bottom `34px`. Each chip:
  border `1px solid #e2e2e2`, `border-radius:8px`, padding `9px 14px`, JetBrains Mono
  `10.5px`, `letter-spacing:0.08em`, uppercase, color `#333`. Chips: `Backend & APIs`,
  `Web Platform`, `DX & Tooling`.
- **Buttons:** row, `gap:12px`.
  - Primary: accent bg `oklch(0.58 0.21 27)`, white text, `border-radius:10px`,
    padding `16px 24px`, JetBrains Mono `11px`, weight 600, `letter-spacing:0.1em`,
    uppercase. Text `Explore Projects  ↓`. Hover → `oklch(0.52 0.21 27)`.
  - Secondary: white bg, ink text, border `1px solid #0a0a0a`, same metrics.
    Text `View Journey`. Hover → background `#0a0a0a`, text white.

**Right column — "Now" board** (chosen over a portrait photo):
- Card: white bg, border `1px solid #e6e6e6`, `border-radius:16px`, padding `26px 28px`,
  shadow `0 24px 60px -34px rgba(0,0,0,0.35)`.
- **Header row:** space-between, padding-bottom `18px`, bottom border `1px solid #eee`.
  - Left: JetBrains Mono `11px`, weight 600, `letter-spacing:0.14em`, uppercase.
    Text `● Now` (bullet accent-colored).
  - Right: JetBrains Mono `10px`, `letter-spacing:0.1em`, uppercase, color `#aaa`.
    Text `Updated Jun 2026`.
- **Rows** (`flex-direction:column; gap:18px; padding:22px 0 4px`). Each row =
  - Label: JetBrains Mono `10px`, `letter-spacing:0.14em`, uppercase, color `#a0a0a0`, margin-bottom `5px`.
  - Value: Hanken Grotesk `15.5px`, color `#1a1a1a`.
  - Rows: **Building** → "Deploy Pilot v2 — ephemeral preview envs";
    **Learning** → "Rust & distributed systems";
    **Reading** → "Designing Data-Intensive Applications".
- **Availability pill** (margin-top `22px`): inline-flex, background `oklch(0.58 0.21 27 / 0.09)`,
  border `1px solid oklch(0.58 0.21 27 / 0.25)`, `border-radius:999px`, padding `9px 15px`,
  JetBrains Mono `10.5px`, `letter-spacing:0.1em`, uppercase, color `oklch(0.5 0.2 27)`.
  Text `● Open to select work`.

#### 4. Selected Work
- Section label (above grid): top border `1px solid #ececec`, padding `28px 0 8px`.
  - `Selected Work` — JetBrains Mono `11px`, weight 600, `letter-spacing:0.14em`, uppercase,
    color `oklch(0.5 0.2 27)`. Followed by `// systems that ship` in color `#9a9a9a`.
- **Project grid:** `grid-template-columns: 1fr 1fr; gap:22px`, padding `16px 48px 72px`.
- **Project card:** border `1px solid #ececec`, `border-radius:14px`, padding `30px`.
  Hover → border-color `oklch(0.58 0.21 27 / 0.5)`.
  - Top row (space-between): category label — JetBrains Mono `10.5px`, `letter-spacing:0.14em`,
    uppercase, color `oklch(0.5 0.2 27)`; and index number — JetBrains Mono `11px`, color `#c4c4c4` (`01`, `02`).
  - Title (h3): Space Grotesk, weight 600, `23px`, margin `16px 0 8px`.
  - Subtitle: JetBrains Mono `10.5px`, `letter-spacing:0.06em`, uppercase, color `#777`, margin-bottom `14px`.
  - Description: Hanken Grotesk `15px`, `line-height:1.55`, color `#5d5d5d`, margin-bottom `24px`.
  - Footer link: top border `1px solid #eee`, padding-top `18px`, JetBrains Mono `11px`,
    weight 600, `letter-spacing:0.1em`, uppercase. Text `Explore Project  →`.
  - Cards: (01) `Realtime / Web` — "Live Collab Editor" / "Multiplayer document sync engine." ;
    (02) `Infra / DX` — "Deploy Pilot" / "Zero-config preview deployments."

---

## Interactions & Behavior
- **Nav links / Contact button / project cards:** hover states as specified above
  (color or border-color transitions; a `~150ms ease` transition is appropriate).
- **Sticky nav:** stays pinned on scroll with a translucent blurred background.
- **Nav anchors:** `Work / About / Writing / Journey` should smooth-scroll to their
  respective sections once those are built.
- **Now board availability pill / eyebrow:** static (no interaction).
- No loading/error/form states in the current scope (Contact form is a future section).
- **Responsive:** below ~900px, collapse the hero to a single column (Now board stacks
  under the text), collapse the project grid to one column, and move nav links into a
  menu. The prototype is desktop-first at 1280px.

## State Management
Current scope is largely static/presentational. State needed once built out:
- Mobile nav open/closed toggle.
- (Future) Contact form field state + validation.
- (Future) Project data array driving the Selected Work grid.

## Design Tokens

### Colors
| Token | Value (oklch) | Approx hex | Usage |
|---|---|---|---|
| Accent | `oklch(0.58 0.21 27)` | `#d93b29` | ticker, buttons, bullets, accent text span |
| Accent hover | `oklch(0.52 0.21 27)` | `#c5331f` | primary button / contact hover |
| Accent text | `oklch(0.5 0.2 27)` | `#bb3420` | eyebrow, category labels, section label |
| Accent tint bg | `oklch(0.58 0.21 27 / 0.08–0.09)` | — | eyebrow / pill backgrounds |
| Accent tint border | `oklch(0.58 0.21 27 / 0.25)` | — | eyebrow / pill borders |
| Accent hover border | `oklch(0.58 0.21 27 / 0.5)` | — | project card hover border |
| Ink | — | `#0a0a0a` | headings, primary text, secondary button |
| Value text | — | `#1a1a1a` | now-board values |
| Body | — | `#4d4d4d` | hero paragraph |
| Body 2 | — | `#5d5d5d` | card descriptions |
| Chip text | — | `#333333` | tag chips |
| Mono muted | — | `#707070` / `#777777` | nav links, subtitles |
| Mono faint | — | `#9a9a9a` / `#a0a0a0` / `#aaaaaa` | labels, meta |
| Index gray | — | `#c4c4c4` | card index numbers |
| Surface | — | `#ffffff` | page + cards |
| Border strong | — | `#e2e2e2` / `#e6e6e6` | chips, now-board |
| Border soft | — | `#ececec` / `#eeeeee` | dividers, cards |

### Typography
| Family | Role | Google Fonts |
|---|---|---|
| **Space Grotesk** | Display / headings (700, 600) | `Space+Grotesk:wght@400;500;600;700` |
| **Hanken Grotesk** | Body / values (400, 500) | `Hanken+Grotesk:wght@400;500;600;700` |
| **JetBrains Mono** | All micro-labels, nav, buttons (400, 500, 600) | `JetBrains+Mono:wght@400;500;600` |

Type characteristics: headlines are tight (`letter-spacing:-0.035em`, `line-height:~0.97`).
All mono labels are UPPERCASE with positive tracking (`0.06em`–`0.16em`). The `●` bullet
and `//` separators are a recurring motif in mono labels.

### Spacing
Section horizontal padding `48px`. Hero vertical padding `72px / 64px`. Card padding
`30px` (projects), `26–28px` (now board). Common gaps: `10px` (chips), `12px` (buttons),
`18–22px` (now-board rows / project grid), `30px` (nav links). Content max-width `1280px`.

### Radius
`999px` (pills/buttons-round), `16px` (now board), `14px` (project cards), `10px` (buttons),
`8px` (chips).

### Shadow
Now board: `0 24px 60px -34px rgba(0,0,0,0.35)`.

## Assets
- **Fonts:** Google Fonts (Space Grotesk, Hanken Grotesk, JetBrains Mono) — load via
  `<link>` or the framework's font system.
- **Icons / glyphs:** none external; the design uses Unicode `●`, `//`, `↓`, `→` inside
  mono labels. Replace with an icon set if your codebase has one, or keep the glyphs.
- **No images** in the current scope (the portrait was intentionally replaced by the Now board).

## Files
- `Personal Site.dc.html` — the design reference (open in a browser to view; the
  visual design is what matters, not the templating runtime).
- Earlier explorations (not included): three direction options (Mono / Signal / Paper)
  and four hero-panel options (Terminal / Now board / Stack grid / Project spotlight).
  This handoff reflects the chosen direction: **Signal (B)** with the **Now board** panel.
