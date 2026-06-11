# Skill: Frontend Design

Create distinctive, production-grade page templates with high design quality. Generates creative, polished HTML styled with Tailwind CSS utility classes that avoids generic AI aesthetics.

## Design Thinking

Before generating HTML, commit to a BOLD aesthetic direction:
- **Purpose**: What is this page for? Who is the audience?
- **Tone**: Pick a clear direction: brutally minimal, maximalist, retro-futuristic, organic/natural, luxury/refined, playful, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian
- **Differentiation**: What makes this design MEMORABLE? What will someone remember about it?

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work — the key is intentionality, not intensity.

## Aesthetics Guidelines

### Typography
- Choose fonts from Google Fonts that are distinctive and characterful
- Import via: `<link href="https://fonts.googleapis.com/css2?family=FontName:wght@400;600;700&display=swap" rel="stylesheet">`, then apply with Tailwind arbitrary font utilities: `font-[FontName,sans-serif]` or `font-["Playfair_Display",serif]`
- Pair a distinctive display font with a refined body font
- AVOID generic fonts: Inter, Roboto, Arial, system fonts are BANNED as primary fonts
- Vary your choices — never converge on the same font across different generations

### Color & Theme
- Commit to a cohesive palette. Use 2-3 dominant colors with sharp accents
- Use Tailwind arbitrary values for exact hexes: `bg-[#1c1917]`, `text-[#e7e5e4]`, `border-[#a8a29e]` — do not approximate brand colors with the default palette
- Dominant colors with sharp accents outperform timid, evenly-distributed palettes
- AVOID cliched schemes: especially purple gradients on white, or blue-and-white SaaS templates
- Dark themes, warm tones, earthy palettes, monochromatic schemes are all valid — vary your choices
- If brand colors are provided, use them as the foundation and build a harmonious palette around them

### Spatial Composition
- Use unexpected layouts when appropriate: asymmetry, overlap, grid-breaking elements
- Generous negative space creates sophistication
- Cards and grids should feel intentional, not like a Bootstrap template
- Use CSS Grid utilities for compositions that break the grid: `grid grid-cols-2 md:grid-cols-12` with `col-span-*` / `row-span-*` children, negative margins (`-mt-16`, `-ml-8`) and z-index layering for overlap
- Make layouts responsive with `md:` / `lg:` variants — asymmetry on desktop can stack gracefully on mobile

### Visual Details & Atmosphere
- Create depth with layered shadows (`shadow-xl`, arbitrary `shadow-[0_20px_60px_rgba(0,0,0,0.3)]`), subtle gradients, or background textures
- Use decorative elements: geometric shapes (`absolute` positioned divs with `rounded-full`, `rotate-*`), gradient overlays, subtle patterns
- Borders and dividers should be intentional design elements, not afterthoughts: `border-t-4`, `border-x`, two-tone borders with arbitrary colors
- Glass-morphism where appropriate: `backdrop-blur-md bg-white/10 border border-white/20`
- Simple gradients via utilities: `bg-gradient-to-br from-[#0f172a] to-[#4c1d95]`. For organic multi-stop gradients, an inline `style="background:linear-gradient(...)"` is the accepted fallback

### Content Quality
- Write compelling, realistic copy — NEVER use "Lorem ipsum"
- Headlines should be punchy and specific to the context
- Body text should be meaningful 2-3 sentence paragraphs
- Button text must be action-oriented and specific

## Anti-Patterns (NEVER do these)
- Cookie-cutter layouts that look like every other AI-generated page
- Generic hero + 3 cards + CTA footer without personality
- Monochromatic gray-on-white with a single accent color
- Perfectly symmetrical layouts with no visual hierarchy
- Using the same fonts, colors, and layout patterns across different requests
- Styling with inline `style="..."` for things Tailwind utilities express (layout, spacing, color, type, shadows)
- Placeholder text like "Your description here" or "Feature 1"

## Remember
Each design should feel like it was crafted by a different designer with a unique point of view. Commit fully to the aesthetic direction — half-measures produce forgettable results.
