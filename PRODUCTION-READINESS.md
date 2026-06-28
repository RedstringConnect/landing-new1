# Production Readiness Checklist

> Redstring Landing Page — Audit generated 2026-06-26
>
> **Framework:** Next.js 16.1.6 (App Router) · **Deploy target:** Vercel (SSG)
> **Total issues found: 115**

---

## 🔴 TIER 1 — SECURITY & INFRASTRUCTURE

- [ ] **1.** Proxy `NEXT_PUBLIC_OLA_MAPS_API_KEY` server-side via a Route Handler instead of exposing in client bundle
- [x] **2.** Add `headers()` to `next.config.ts` — CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- [ ] **3.** Enable Vercel WAF with custom rules, IP blocking, and managed rulesets
- [ ] **4.** Enable Deployment Protection (password-protect preview deploys)
- [ ] **5.** Set up SSL cert monitoring for custom domain (if not using Vercel DNS)
- [ ] **6.** Remove unused `pnpm-workspace.yaml` or add workspace packages

---

## 🔴 TIER 2 — PERFORMANCE & BUILD

- [ ] **7.** Configure `output: 'export'` for full SSG, or verify build output shows `○` (static) for all landing pages
- [ ] **8.** Add `revalidate` export to static pages / `Cache-Control` headers to route handlers
- [x] **9.** Add `/public/Denton.otf` font file OR remove the `@font-face` declaration from `globals.css`
- [x] **10.** Configure `next/font/local` with `preload: true`, `display: 'swap'`, and `fallback` fonts
- [x] **11.** Add `loading.tsx` at root (`app/loading.tsx`) and key route segments (blog, tools, about)
- [x] **12.** Add `formats: ['image/avif', 'image/webp']` to `next.config.ts` image config
- [ ] **13.** Add `sizes` attribute to all `<Image fill>` components (blog list, blog hero, team)
- [ ] **14.** Code-split heavy dependencies per route: `mermaid`, `katex`, `@paper-design/shaders-react`, `gsap`
- [x] **15.** Evaluated `React.lazy` vs `next/dynamic` — kept `React.lazy` as components are client-only and `ssr: false` not applicable
- [ ] **16.** Add `@next/bundle-analyzer` and review bundle composition
- [ ] **17.** Audit `<Link>` prefetch behavior — set `prefetch={false}` for out-of-viewport links
- [ ] **18.** Deduplicate CSS custom properties — remove overlap between `@theme` and raw `:root` vars
- [ ] **19.** Replace inline base64 SVG patterns in `not-found.tsx` and `error.tsx` with external files
- [ ] **20.** Subset `InterVariable.ttf` to Latin-only or use `next/font/google` with `subsets: ['latin']`

---

## 🔴 TIER 3 — SEO & DISCOVERABILITY

- [x] **21.** Add `generateMetadata` to `app/blog/[slug]/page.tsx` with dynamic title, description, OG, Twitter
- [x] **22.** Add `export const metadata` to `app/about/page.tsx`
- [x] **23.** Add `export const metadata` to `app/playbooks/page.tsx`
- [x] **24.** Add metadata exports to `app/playbook/[slug]`, `app/guide/[slug]`, `app/tools/[slug]`
- [x] **25.** Expand sitemap to include all dynamic routes: blog posts, playbooks, guides, tools, about
- [x] **26.** Fetch blog slugs in sitemap generation to include blog posts dynamically
- [ ] **27.** Set `alternates.canonical` on every subpage, not just root layout
- [ ] **28.** Add JSON-LD structured data: `Article` for blog posts, `SoftwareApplication` for tools, `BreadcrumbList` everywhere
- [ ] **29.** Add `BreadcrumbList` schema to all pages
- [ ] **30.** Add `hreflang` alternates on subpages, not just root
- [ ] **31.** Allow per-page `robots` metadata (index/noindex, follow/nofollow)
- [ ] **32.** Create a proper 1200×630px OG image with branding and page-specific text
- [ ] **33.** Generate per-page OG/Twitter card images dynamically
- [ ] **34.** Implement blog pagination as content grows (or set a limit + "view all")
- [ ] **35.** Add `redirects()` to `next.config.ts` for any planned URL changes
- [ ] **36.** Remove `/private/` from `robots.ts` or create the route

---

## 🔴 TIER 4 — ACCESSIBILITY (a11y)

- [ ] **37.** Add a "Skip to content" link as the first focusable element
- [ ] **38.** Replace `px` font sizes with `rem`/`em` throughout (`text-[15px]` → `text-sm`, etc.)
- [ ] **39.** Add focus trapping to mobile navigation menu when open
- [ ] **40.** Add descriptive `aria-label` to hamburger menu button (e.g., "Open navigation menu")
- [ ] **41.** Add `aria-expanded` to mobile menu toggle button
- [ ] **42.** Add `aria-controls` to FAQ items and expandable navigation elements
- [ ] **43.** Audit color contrast against WCAG 2.2 AA (4.5:1 normal text, 3:1 large text)
- [ ] **44.** Add a readable fallback/alternative for `LineShadowText` canvas rendering
- [ ] **45.** Respect `prefers-reduced-motion` — disable or slow down GSAP/motion animations
- [ ] **46.** Add visible `:focus-visible` outlines to all interactive elements
- [ ] **47.** Add ARIA landmark roles: `<nav aria-label="Main">`, `<main>`, `<aside>`, `<footer>`
- [ ] **48.** Audit heading hierarchy (h1 → h2 → h3) across all pages
- [ ] **49.** Set `lang` attribute on dynamically rendered blog content
- [ ] **50.** Ensure all touch targets are minimum 44×44px on mobile

---

## 🔴 TIER 5 — CONTENT & UX

- [x] **51.** Replace `"Some picture/animation"` placeholder in `FinalCTA.tsx` with real content
- [x] **52.** Wire up Login/Signup buttons — replaced with Book a Demo (Cal.com)
- [x] **53.** Wire up Book a Demo buttons to Cal.com via `@calcom/embed-react` BookDemoButton component
- [x] **54.** Replace all `href="#"` in Footer with real URLs
- [x] **55.** Fix typo: "thier" → "their" in `Navbar.tsx`
- [ ] **56.** Verify `/blog/founding-co` blog post exists or fix the banner announcement link
- [ ] **57.** Add 301 redirects for any removed/moved content
- [ ] **58.** Replace `console.error` in `error.tsx` with real error reporting
- [ ] **59.** Consolidate footer link groups — remove unused section or merge with visible links
- [ ] **60.** Make "For free" / "No credit card" badges dynamic or remove hardcoded copy
- [ ] **61.** Add error/loading/empty states to blog list, playbooks, and data-driven components
- [ ] **62.** Add a contact form or mailto link somewhere accessible
- [ ] **63.** Add email newsletter signup (leads capture)
- [ ] **64.** Add a pricing page or at least pricing section
- [ ] **65.** Build demo booking flow or link to Calendly/meeting tool
- [ ] **66.** Consider adding live chat or a support contact widget
- [ ] **67.** Make banner dismissible or remove after first visit (use localStorage)
- [ ] **68.** Add "Last updated" date to blog posts

---

## 🔴 TIER 6 — LEGAL & COMPLIANCE

- [ ] **69.** Create `/privacy-policy` page
- [ ] **70.** Create `/terms-of-service` page
- [ ] **71.** Create `/cookie-policy` page
- [ ] **72.** Add GDPR cookie consent banner (block scripts until consent)
- [ ] **73.** Add CCPA compliance (opt-out option for California users)
- [ ] **74.** Implement cookie consent management platform (e.g., CookieYes, Termly, or custom)
- [ ] **75.** Publish Data Processing Agreement (DPA) if processing EU user data
- [ ] **76.** Add Impressum (required for serving German/Austrian users)
- [ ] **77.** Add accessibility statement page

---

## 🟡 TIER 7 — MONITORING & ANALYTICS

- [ ] **78.** Add analytics (Plausible, PostHog, Umami, or GA4)
- [ ] **79.** Add error monitoring (Sentry, Highlight, or LogRocket)
- [ ] **80.** Set up Vercel Speed Insights + Analytics (one-click in dashboard)
- [ ] **81.** Set uptime monitoring (BetterStack, Checkly, or UptimeRobot)
- [ ] **82.** Implement `reportWebVitals` in `app/layout.tsx`
- [ ] **83.** Set up server-side logging / Vercel Log Drains
- [ ] **84.** Create `/status` page or link to external status page

---

## 🟡 TIER 9 — CODE QUALITY & ARCHITECTURE

- [ ] **97.** Delete unused root files: `refactor-colors-2.js`, `refactor-colors.js`, `sample hero.html`
- [ ] **98.** Delete unused default SVGs from `/public/`: `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`
- [ ] **99.** Decouple `ctaItems` from `HeroSection.tsx` — move to a shared data file (used by `FinalCTA.tsx`)
- [ ] **100.** Fix `Navbar.tsx` `eslint-disable` comments — restructure to avoid disabling rules
- [ ] **101.** Add `env.d.ts` with typed environment variables (`NEXT_PUBLIC_OLA_MAPS_API_KEY`)
- [ ] **102.** Add component tests (at minimum: Navbar, Footer, HeroSection)
- [ ] **103.** Ensure `.DS_Store` files are not tracked in git
- [ ] **104.** Add Husky + lint-staged for pre-commit linting
- [ ] **105.** Add environment variable validation at build time (env validation module)
- [ ] **106.** Add `vercel.json` with explicit config (regions, rewrites, headers, caching)
- [ ] **107.** Remove `tsconfig.tsbuildinfo` from git tracking (already in gitignore but verify)
- [ ] **108.** Consider replacing static JSON content with a headless CMS (Sanity, Strapi, Contentful)

---

## 🟡 TIER 10 — PWA & OFFLINE

- [ ] **109.** Add proper PWA icons (192×192, 512×512 PNGs) to manifest
- [ ] **110.** Add service worker for offline support and asset caching
- [ ] **111.** Make app installable via beforeinstallprompt
- [ ] **112.** Add `<meta name="theme-color">` to root layout

---

## 📐 VERIFICATION CHECKLIST

Run these before any production deployment:

- [ ] `pnpm build` — succeeds with no errors
- [ ] `pnpm lint` — passes with zero warnings
- [ ] Build output shows `○` (static) for all marketing pages
- [ ] Lighthouse score: 90+ Performance, 90+ Accessibility, 90+ SEO, 100 Best Practices
- [ ] No console errors in production build
- [ ] All internal links verified (no `href="#"`)
- [ ] All images load correctly
- [ ] Dark mode works on every page
- [ ] Mobile responsive on all screen sizes
- [ ] 404 page renders correctly for unknown routes
- [ ] Error boundary catches and displays properly
- [ ] Sitemap submitted to Google Search Console
- [ ] Custom domain configured with HTTPS
- [ ] Environment variables set in Vercel dashboard (Production, Preview, Development)

---

## 📊 PRIORITY MATRIX

| Priority                        | Issues                                           | Effort           |
| ------------------------------- | ------------------------------------------------ | ---------------- |
| **P0 — Ship blocker**           | 1, 72-74                                         | ~1 day           |
| **P1 — Must fix before launch** | 7, 27-36, 69-71, 78-80                           | ~3-4 days        |
| **P2 — Should fix**             | 3-6, 8, 13-14, 16-20, 28-50, 56-68, 75-84, 85-96 | ~5-7 days        |
| **P3 — Nice to have**           | 97-112                                           | ~2-3 days        |
| **Total**                       | **99 issues remaining**                          | **~1.5-2 weeks** |

---

_Generated by opencode audit · Next.js 16 · Vercel SSG Landing Page_
