# Ayman Al Hussam — Luxury Career Showroom

A bilingual (AR/EN) luxury editorial career website built with Next.js App Router,
TypeScript, Tailwind CSS, and Framer Motion.

## Run locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. Go to https://vercel.com → "Add New Project" → import the repository.
3. Vercel auto-detects Next.js — no extra settings needed.
4. Deploy. Your site is live.

## Structure

- `app/` — layout, page, global styles (SEO metadata included)
- `components/` — Navbar, Hero, Collection, Experience, Impact, Skills, Education, Portfolio, About, Contact
- `lib/data.ts` — ALL bilingual content, extracted from the CV. Edit this file to update text.
- `lib/i18n.tsx` — AR/EN language provider with full RTL switching
- `public/assets/` — original photos, the 19 AYWISE design slides, and the downloadable CV

## Notes

- The AYWISE gallery (19 slides) is the owner's original design portfolio work.
- All career information is taken from the uploaded CV without invention.
- No LinkedIn link is included because none was provided in the CV.
- Respects `prefers-reduced-motion`.
