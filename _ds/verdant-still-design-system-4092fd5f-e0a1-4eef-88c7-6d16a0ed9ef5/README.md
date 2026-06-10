# Verdant & Still — Design System

## Overview

**Verdant & Still** is a nature-inspired banking application at the early exploration stage. The product aims to fuse the calm, organic language of the natural world with trustworthy financial tooling — a bank that feels like a walk through a forest rather than a visit to a branch office.

The brand name "Verdant & Still" signals two qualities: **lushness** (verdant — green, growing, alive) and **calm** (still — unhurried, grounded, quiet). This duality runs through every design decision.

**Product:** Mobile-first banking app (initial explorations)
**Stage:** Design system foundations — initial explorations

### Source Material
- `uploads/moss_emerald_design_system_v2.html` — full design system reference HTML (the primary source used to build this design system)
- `uploads/Logo.png` — official My Bank logo: heraldic lion rampant + "My Bank" serif wordmark, black on transparent PNG (1536×1024). Copied to `assets/logo.png`.

---

## CONTENT FUNDAMENTALS

### Voice & Tone
Verdant & Still writes like a thoughtful friend who happens to know a lot about money. Never corporate, never clinical. The tone is:

- **Calm and unhurried** — no urgency, no alarm. Even error states are gentle.
- **Nature-grounded** — metaphors drawn from growth, seasons, roots, light. "Growing with intention," "Rooted," "Breathes."
- **First-person plural → second person** — "Your" is preferred over "our." Speaks directly to the user.
- **Minimal punctuation drama** — no exclamation marks, no ALL CAPS shouting. A single em-dash for emphasis.

### Casing
- UI labels: ALL CAPS, widely spaced (letter-spacing ~0.08–0.1em) — used for section headings, category tags, metadata
- Headlines: Sentence case only (never Title Case for prose)
- CTAs / buttons: Sentence case — "Explore", "Learn more", "Continue" — never "SIGN UP NOW"

### Copy Examples
- "Into the forest" (display headline)
- "Natural by design" (H1)
- "Fresh perspectives" (H2, italic)
- "Growing with intention" (dashboard heading)
- "A calm, natural interface built on restraint. Every element breathes."
- "Quiet, textured, and deeply rooted — the way a good design system should feel underfoot."
- "Clean, unhurried reading." (body copy describing itself)

### Emoji & Special Characters
- **No emoji** — the brand is too considered and calm for emoji
- Interpunct (·) used as a separator in metadata/taglines: "Moss · Emerald · White"
- Em dash (—) used for pauses and asides in body copy
- Ampersand (&) used in the brand name itself; italic in the logotype

---

## VISUAL FOUNDATIONS

### Colors
Two complementary greens — Moss (yellowish, warm green) and Emerald (cool, teal-leaning green) — anchored on a near-white cream background.

| Role | Token | Hex |
|------|-------|-----|
| Page background | `--cream` | `#fafcf9` |
| Pure white (cards) | `--white` | `#ffffff` |
| Primary text | `--text-primary` | `#1a2e1a` |
| Secondary text | `--text-secondary` | `#4a6347` |
| Muted/meta text | `--text-muted` | `#7a9a78` |
| Primary action | `--moss-600` | `#4a7a38` |
| Deep heading | `--moss-800` | `#2d5422` |
| Accent / success | `--emerald-600` | `#1a8a5a` |
| Subtle bg | `--moss-50` | `#f2f7f0` |

Full scales defined in `colors_and_type.css`.

### Typography
Two fonts only:
- **Serif (Georgia / Times)** — display, H1, H2 (italic), H3. Used for warmth, gravitas, organic texture.
- **DM Sans** (Google Fonts) — body, labels, UI text. Light (300) and Medium (500) weights. Clean, modern.

Display text can be large and airy; body text is kept light (weight 300–400) for a sense of space.

Font files are not bundled — served via Google Fonts CDN. See `colors_and_type.css` for the import.

### Spacing & Layout
- Base unit: approximately 4–8px rhythm
- Padding within cards: 14–20px
- Section gaps: 2–2.5rem
- No rigid grid system defined — layouts breathe with content

### Corner Radii
- **6px** — universal base radius for cards, buttons, inputs, badges
- **0** — alerts only (left-border accent, no rounding; signals status without softness)
- **50% (full circle)** — avatars only

### Cards
White background (`#ffffff`), `0.5px solid rgba(74,122,56,0.12)` border, 6px radius. Subtle — the border is barely visible, blending into cream. No drop shadows on standard cards. Dashboard / "full-card" variant has extra padding (1.75rem).

### Shadows & Elevation
No box-shadows on standard cards. The system relies on **hairline borders** (0.5px, green-tinted at low opacity) rather than drop shadows for depth. Focus states use a soft `box-shadow: 0 0 0 3px rgba(74,122,56,0.1)` ring.

### Backgrounds
- Page: `#fafcf9` cream — warm off-white, not pure white
- Cards: `#ffffff` pure white — the contrast between cream and white creates hierarchy without color
- Subtle sections: `--moss-50` (#f2f7f0) — the lightest green tint
- Card image zones: gradient using moss-200 → emerald-200 → moss-100

### Borders
- Light: `rgba(74,122,56,0.12)` — barely visible card borders
- Mid: `rgba(74,122,56,0.22)` — button outlines, input borders, more prominent dividers
- All borders are **0.5px** — hairline, never heavy

### Animations & Transitions
- Minimal: `transition: opacity 0.15s, transform 0.1s` on buttons
- Press state: `transform: scale(0.97)` — subtle physical push
- Hover states: slightly darker background color (not opacity fade), consistent with `--moss-800` on primary
- No entrance animations, no looping decorative motion — the brand is "still"

### Hover & Press States
- Primary button hover: bg darkens to `--moss-800`
- Secondary button hover: bg shifts to `--moss-100`
- Ghost button hover: bg fills with `--moss-50`
- All transitions are color-only (0.15s ease); no scaling except press (0.97)

### Imagery
- Card header imagery uses green gradients as placeholder (moss ↔ emerald)
- Implied photography style: warm, natural light, botanical/forest subjects, slightly desaturated
- No grain, no heavy vignettes — clean and fresh

### Iconography
No icon system is defined in the source file. The design is intentionally icon-light, relying on text labels and typographic hierarchy. Where icons would appear, the system defaults to typography (UPPERCASE labels, interpuncts) over glyphs.

---

## ICONOGRAPHY & LOGO

### Primary Logo
`assets/logo.png` — The My Bank logo is a **heraldic lion rampant** (traditional standing/rearing pose) paired with the **"My Bank" wordmark** in a classic serif typeface. The mark is black on transparent PNG.

**Usage rules:**
- On light backgrounds (cream `#fafcf9`, white `#ffffff`): use as-is — black mark reads cleanly
- On dark backgrounds (moss-800 `#2d5422`, moss-600 `#4a7a38`): apply `filter: brightness(0) invert(1)` to render white
- On moss-tinted surfaces: CSS filter `brightness(0) invert(1)` works universally
- Minimum display height: ~20px (app headers); ~40px (splash/onboarding); ~52px (brand cards)
- Never recolor with CSS hue-rotate — the mark should be black or white only

**Visual character:** The heraldic lion brings heritage, authority, and strength — a deliberately traditional mark that creates productive tension with the fresh, organic moss/emerald palette. The serif wordmark echoes the brand's serif display type (Georgia).

### Icon System
The source design system does not define an icon set. The UI is icon-sparse by design — typography, color, and whitespace carry hierarchy.

**Recommendation:** Lucide Icons (stroke-based, clean, 1–1.5px stroke weight) best match the brand's restraint. Color `--text-muted` or `--moss-600`.

No SVG sprite was provided; `assets/` contains the logo only.

---

## FILE INDEX

```
README.md                          — This file; design system manifest
SKILL.md                           — Agent skill definition
colors_and_type.css                — CSS custom properties for all design tokens

assets/
  (no visual assets in source — see ICONOGRAPHY above)

preview/
  colors-moss.html                 — Moss color scale swatches
  colors-emerald.html              — Emerald color scale swatches
  colors-semantic.html             — Text + UI semantic colors
  type-scale.html                  — Typography scale specimen
  type-weights.html                — DM Sans weight + label styles
  spacing-radius.html              — Border radius tokens
  spacing-shadows.html             — Border + shadow / focus system
  components-buttons.html          — Button variants + states
  components-badges.html           — Badge variants
  components-inputs.html           — Form input + focus state
  components-alerts.html           — Alert / feedback components
  components-cards.html            — Card component variants
  components-dashboard.html        — Dashboard stat card sample

ui_kits/
  banking_app/
    README.md                      — Banking app UI kit guide
    index.html                     — Interactive banking app prototype
    Components.jsx                 — Shared primitive components
    Navigation.jsx                 — Bottom nav + header
    DashboardScreen.jsx            — Home / account overview
    TransactionsScreen.jsx         — Transaction list
    TransferScreen.jsx             — Send / transfer flow
    SavingsScreen.jsx              — Savings goals
```
