# zacharyreece.dev

The source for [zacharyreece.dev](https://zacharyreece.dev) — a personal site
built as a designed artifact rather than a portfolio template.

## Design

The site uses the **Philosophical Systems Brutalism** design system —
warm ink and bone, editorial typography (Space Grotesk + IBM Plex Sans
+ IBM Plex Mono), thin construction lines, and tattoo-inspired SVG
motifs (honeycomb, topographic contours, sacred geometry, suminagashi).

Full design direction lives in
[`docs/personal_website_design_doc.md`](./docs/personal_website_design_doc.md);
the implementation roadmap lives in
[`docs/redesign_roadmap.md`](./docs/redesign_roadmap.md).

## Stack

- Next.js 15 (App Router) · React 19 · TypeScript
- MUI 6/7 with a custom theme (`src/theme/`)
- `next/font` for self-hosted Google Fonts
- MDX for blog posts (`src/content/blog/`)
- Firebase Admin for newsletter signups (`/api/subscribe` → Firestore)
- Vercel Analytics

## Project structure

```
src/
├── app/                      # App Router routes
│   ├── _components/home/     # Home decomposition (Hero, IndexSections)
│   ├── _data/                # Site nav taxonomy and other shared data
│   ├── about/                # Long-form narrative
│   ├── blog/, projects/, …   # Section routes (Education / Hobbies / Professional)
│   ├── preview/              # Dev-only primitive gallery (/preview)
│   ├── layout.tsx            # Root layout — fonts, OG, theme
│   └── page.tsx              # Canonical home (?hero=1..5)
├── components/
│   └── primitives/           # Redesign component layer (cards, chips, heroes, patterns)
├── content/blog/             # MDX posts
├── lib/blog.ts               # MDX loader
├── theme/                    # zacharyTheme — tokens, fonts, MUI theme
└── utils/firebase.ts         # Newsletter prompt local-state helpers
```

## Development

```bash
npm install
npm run dev      # → http://localhost:3000
npm run build    # production build
npm run lint     # eslint
npm run format   # prettier --write
```

Visit `/preview` for a single-scroll gallery of every redesign primitive
and all five hero diagram options.

The home hero accepts `?hero=1..5` to switch between hero diagram options
and `?heroNav=1` to surface the in-page variant switcher.

## Environment

`/api/subscribe` requires Firebase Admin credentials. Copy
`.env.local.example` to `.env.local` and fill in the values. The
production deployment uses Vercel environment variables.
