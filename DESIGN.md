---
name: Techno Shop
description: Bold, fast electronics retail with electric-violet energy and tactile deal-driven UI.
colors:
  primary: "#6A0DAD"
  primary-deep: "#4c1d95"
  primary-hover: "#3b1677"
  primary-ink: "#7e22ce"
  accent-lavender: "#A66BCF"
  accent-lavender-hover: "#8e4ec0"
  footer-ink: "#24002F"
  surface: "#ffffff"
  surface-muted: "#ECECEC"
  surface-subtle: "#f9fafb"
  ink: "#171717"
  ink-secondary: "#374151"
  ink-muted: "#6b7280"
  ink-faint: "#9ca3af"
  border: "#e5e7eb"
  border-strong: "#d1d5db"
  success: "#22c55e"
  danger: "#ef4444"
  warning: "#facc15"
typography:
  display:
    fontFamily: "var(--font-geist-sans), Arial, Helvetica, sans-serif"
    fontSize: "clamp(1.5rem, 4vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "normal"
  headline:
    fontFamily: "var(--font-geist-sans), Arial, Helvetica, sans-serif"
    fontSize: "clamp(1.25rem, 2.5vw, 2rem)"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "normal"
  title:
    fontFamily: "var(--font-geist-sans), Arial, Helvetica, sans-serif"
    fontSize: "1rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "normal"
  body:
    fontFamily: "var(--font-geist-sans), Arial, Helvetica, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "var(--font-geist-sans), Arial, Helvetica, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.02em"
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "12px 24px"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary-deep}"
    rounded: "{rounded.lg}"
    padding: "12px 24px"
  input-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-secondary}"
    rounded: "{rounded.lg}"
    padding: "12px 16px"
  card-product:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-secondary}"
    rounded: "{rounded.xl}"
    padding: "12px 16px"
---

# Design System: Techno Shop

## 1. Overview

**Creative North Star: "The Voltage Counter"**

Techno Shop reads like a fast, high-energy electronics counter: bold purple blocks, white product tiles, and deal cues that push momentum. The interface is built for scanning, comparing, and acting quickly — not for slow editorial browsing. Surfaces stay clean and retail-practical; color carries urgency and brand recognition.

Density is comfortable but efficient. Navigation, search, and product grids prioritize legibility at speed. Motion and elevation reinforce affordance (hover lift, button feedback) without decorative excess. The system explicitly rejects generic SaaS template look and safe, interchangeable landing-page scaffolds that feel AI-generated.

**Key Characteristics:**
- Electric violet as the dominant brand signal across heroes, CTAs, and promo bands
- White product surfaces with soft lifted shadows on interaction
- Tactile retail confidence: rounded buttons, bold price badges, clear hierarchy
- Deal-forward accents (red discount chips, countdown panels) without visual chaos
- RTL-aware layout patterns mixed with LTR utility zones (search, icons)

## 2. Colors

The palette is anchored in electric violet with high-contrast retail neutrals and functional status hues.

### Primary
- **Electric Violet** (#6A0DAD): Hero promo bands, primary CTAs, price badges, footer copyright bar. The signature brand voltage.
- **Deep Grape** (#4c1d95): Product card actions, focused interactive elements, stronger emphasis zones.
- **Pressed Plum** (#3b1677): Hover and active states on primary buttons and cart actions.

### Secondary
- **Lavender Pulse** (#A66BCF): Social and secondary icon tiles on dark footer surfaces.
- **Lavender Pressed** (#8e4ec0): Hover state for lavender secondary controls.

### Tertiary
- **Deal Red** (#ef4444): Discount percentages, promotional urgency, strikethrough-adjacent emphasis.
- **Success Green** (#22c55e): Positive states (added to cart, free delivery, savings labels).
- **Rating Gold** (#facc15): Star ratings and lightweight trust cues.

### Neutral
- **Counter White** (#ffffff): Cards, navbar, product tiles, input backgrounds.
- **Shelf Gray** (#ECECEC): Footer content band and low-emphasis page sections.
- **Ink** (#171717): Primary text on light surfaces.
- **Ink Secondary** (#374151): Body copy, nav links, product titles.
- **Ink Muted** (#6b7280): Supporting labels, metadata, helper text.
- **Border Soft** (#e5e7eb): Card outlines, dividers, input borders.
- **Footer Night** (#24002F): Newsletter and social header band for brand depth contrast.

### Named Rules
**The One Voltage Rule.** Electric violet (#6A0DAD / #4c1d95) carries brand identity. Use it on CTAs, promo surfaces, and price anchors — not as a wash over every neutral block.

**The Deal Signal Rule.** Red and green status colors are functional only: discounts, savings, success feedback. Never use them as decorative gradients or ambient page tinting.

## 3. Typography

**Display Font:** Geist Sans (with Arial, Helvetica fallback)
**Body Font:** Geist Sans (with Arial, Helvetica fallback)
**Label/Mono Font:** Geist Sans for UI labels; Geist Mono available for code-like accents if needed

**Character:** Bold, direct, and retail-forward. Headlines hit hard with extrabold weights; body copy stays compact and scannable for product metadata and pricing.

### Hierarchy
- **Display** (800, clamp(1.5rem, 4vw, 3rem), 1.2): Promo heroes ("Amazing Deals"), major section anchors.
- **Headline** (700, clamp(1.25rem, 2.5vw, 2rem), 1.25): Footer column titles, cart summary headers, page section titles.
- **Title** (700, 1rem / 16px, 1.4): Product names, navbar brand, card titles.
- **Body** (400–500, 0.875rem / 14px, 1.6): Descriptions, cart line items, support copy. Keep line length ≤ 65–75ch in prose blocks.
- **Label** (600, 0.75rem / 12px, 0.02em tracking): Discount chips, timer units, metadata, button microcopy.

### Named Rules
**The Scan-First Rule.** Price and product title outrank decorative copy. If hierarchy competes, pricing and CTA labels win.

**The Weight Contrast Rule.** Pair extrabold display with regular/medium body. Avoid stacking multiple bold lines without a clear primary line.

## 4. Elevation

Depth is conveyed through lifted white cards on light gray page fields, with soft purple-tinted shadows on primary actions. The system is not flat-by-default: product cards and cart panels gain shadow on hover to signal interactivity.

### Shadow Vocabulary
- **Card Rest** (`box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05)`): Default product tiles and summary panels at rest.
- **Card Lift** (`box-shadow: 0 10px 15px rgba(0, 0, 0, 0.08)`): Hover state on product cards and related-product tiles.
- **CTA Glow** (`box-shadow: 0 10px 15px rgba(168, 85, 247, 0.25)`): Primary checkout and cart buttons using purple-200 tint.

### Named Rules
**The Lift-on-Intent Rule.** Shadows intensify on hover/focus for clickable cards and buttons. Static informational blocks stay at rest elevation.

**The No-Glass Rule.** Backdrop blur and glassmorphism are prohibited. Depth comes from surface color, border, and shadow — not frosted overlays.

## 5. Components

Retail-tactile components with rounded geometry, bold labels, and immediate state feedback.

### Buttons
- **Shape:** Generously rounded corners (12px / rounded-xl)
- **Primary:** Electric violet fill (#6A0DAD or #4c1d95), white text, bold weight, 12–14px vertical padding
- **Hover / Focus:** Darken to #3b1677; add purple-tinted shadow; visible focus ring (2px, purple at 40–50% opacity)
- **Secondary:** White surface with purple text/border on gray fields; hover shifts text to primary-deep

### Chips
- **Style:** Pill-shaped discount badges (rounded-full), red fill (#ef4444), white bold label at 10–12px
- **State:** Static for discounts; no toggle chip pattern in current codebase

### Cards / Containers
- **Corner Style:** 12–16px (rounded-xl / rounded-2xl)
- **Background:** White (#ffffff) on light page fields
- **Shadow Strategy:** Rest shadow-sm; hover shadow-lg per Elevation section
- **Border:** 1px #f3f4f6 or #e5e7eb for product tiles
- **Internal Padding:** 12–16px mobile, 16–20px desktop

### Inputs / Fields
- **Style:** 48px height search fields, rounded-xl, 1px #d1d5db border, right-aligned text in RTL contexts
- **Focus:** Border shifts to purple-500 with 2px purple-100 ring
- **Error / Disabled:** Reduced opacity (60%) on pending buttons; error styling not yet standardized — use danger red border + label when implemented

### Navigation
- **Style:** White sticky header, bottom border #e5e7eb, logo in purple-700
- **Typography:** 16px nav links in gray-800, hover to purple-700
- **Mobile:** Stacked search + logo; bottom nav component exists but is currently commented out

### Flash Deals Carousel
- **Signature pattern:** Full-width purple promo shell (#6A0DAD) containing white product cards, countdown timer grid, and swiper navigation arrows. This is the canonical "Voltage Counter" expression.

## 6. Do's and Don'ts

### Do:
- **Do** use electric violet (#6A0DAD / #4c1d95) for primary CTAs, promo bands, and price anchors.
- **Do** keep product tiles white with clear borders and hover lift for scan-friendly browsing.
- **Do** use red discount chips and green success states only for functional retail meaning.
- **Do** maintain bold weight contrast between prices/headlines and supporting metadata.
- **Do** honor RTL layout for Persian product copy while keeping utility controls predictable.

### Don't:
- **Don't** fall into generic SaaS template look (predictable hero + card grid + muted palette patterns).
- **Don't** ship safe, overused landing-page scaffolds that feel interchangeable with AI-generated demos.
- **Don't** use border-left greater than 1px as a colored stripe on cards or list items.
- **Don't** apply gradient text, glassmorphism, or decorative blur cards as default styling.
- **Don't** scatter purple across every surface — preserve rarity and impact on action zones.
- **Don't** rely on gray-muted body text on tinted near-white backgrounds without verifying 4.5:1 contrast.
