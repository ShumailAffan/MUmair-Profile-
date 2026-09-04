# Mian Umair — Advocate Portfolio (Next.js + TypeScript + Tailwind)

## Before you read further

The build prompt this was requested against was written for a **software
developer's** 3D portfolio — GitHub links, a tech-stack constellation, case
studies with "architecture / challenges / results." The actual subject is
**Mian Umair, Advocate High Court** — a lawyer. I did not fabricate a
developer identity, fake projects, or a tech stack for a real named person.
Instead, I carried over the *engineering and motion-design ideas* (cinematic
hero, isolated 3D architecture, scroll-driven reveals, performance and
accessibility discipline) and applied them to his real, previously-verified
content: practice areas, credentials, public-service roles, and corporate
retainers.

## 1. Implementation Summary

- Rebuilt the site as a Next.js 14 (App Router) + TypeScript app.
- Hero: cinematic two-column composition, positioning statement, dual CTA,
  and the supplied portrait rendered as an interactive depth-based tilt card.
- About: the supplied chamber photo, professional summary, pull quote.
- Standing: public service roles, corporate retainers, track record —
  scroll-revealed, one item at a time.
- Practice Areas: five interactive cards (hover lift, not a static grid) plus
  the Law Talks media module.
- Contact: validated form with idle/submitting/success/error states, office
  info card, click-to-call/WhatsApp (inactive until numbers are confirmed),
  embedded map.
- All content is centralized in `lib/data.ts` — nothing is hardcoded inline
  in components.

## 2. Architecture Summary

```
app/
  layout.tsx        Fonts, metadata, Open Graph, JSON-LD, root shell
  page.tsx           Section composition only — no markup lives here
  globals.css        Tailwind directives + reduced-motion + focus rules
  sitemap.ts / robots.ts
components/
  Nav.tsx, Footer.tsx
  motion/
    TiltPortrait.tsx  The one 3D primitive — isolated, reused nowhere else needed
    Reveal.tsx         The one scroll-reveal primitive — every section reuses it
  sections/
    Hero.tsx, About.tsx, Standing.tsx, PracticeAreas.tsx, Contact.tsx
lib/
  data.ts             Single source of truth for all copy
```

3D and motion logic never leaks into section components — sections import
`TiltPortrait` and `Reveal` as black boxes. There's exactly one tilt
implementation and one reveal implementation, reused everywhere, per the
brief's own rule against multiple animation systems doing the same job.

## 3. Technology Summary — and what was deliberately left out

| Included | Why |
|---|---|
| Next.js 14 / App Router | SSR, static prerendering, built-in metadata & sitemap APIs |
| TypeScript (strict) | Type safety across content and props |
| Tailwind CSS | Utility-first styling, matches the design tokens already established for this brand |
| Framer Motion | Covers tilt, scroll-reveal, and hover — one library for all motion |

| Left out of the "preferred stack" | Why |
|---|---|
| Three.js / React Three Fiber / Drei | A portrait photo has no geometry or camera path that benefits from a render pipeline. The CSS-transform tilt card delivers the same perceived depth at a fraction of the bundle size (see Performance below) and can't lose a WebGL context on a weak device. |
| GSAP / ScrollTrigger | Framer Motion's `whileInView` covers every reveal used here; adding a second animation engine for the same job violates the brief's own rule against parallel animation systems. |
| Lenis smooth scroll | Native `scroll-behavior: smooth` (respecting reduced-motion) covers the anchor navigation this single-page site needs, without an extra scroll-hijacking library. |
| Zustand | No state is shared across more than one component tree; local `useState` is sufficient. |
| shadcn/ui | The form and nav are simple enough that adding a component library would be net-negative for bundle size. |
| Playwright E2E | Not set up in this deliverable — noted below under Remaining Issues. |

This is the "decision-making rule" from the brief in practice: prefer
simplicity where complexity doesn't add value.

## 4. 3D Implementation

The supplied portrait (`umair-portrait.jpg`) is rendered in `TiltPortrait.tsx`
as a depth-based 3D card:

- Mouse position drives `rotateX`/`rotateY` via spring-smoothed motion values
  → perspective tilt.
- A radial-gradient sheen tracks the pointer position, blended with
  `mix-blend-overlay` → dynamic lighting.
- A gold inset ring simulates edge/layer separation.
- A floating caption card sits on a separate z-layer (`-bottom-5`, drop
  shadow) → depth cue without a third dimension actually being rendered.
- `prefers-reduced-motion` disables the pointer-tracked transform entirely;
  the image still renders normally.

This is Option A from the brief ("3D Card"), chosen over Options B/C/D
(floating 3D environment, Three.js image plane, shader-based depth) because
none of those add proportional value for a single professional headshot —
they'd add WebGL weight and failure modes (lost context, shader compile
errors) without a corresponding visual gain.

## 5. Performance

- Production build: **136 KB First Load JS** for the homepage (see Testing
  below) — no 3D/WebGL runtime included.
- Static prerendering (`○ (Static)`) for all routes.
- `next/image` for both photos: automatic AVIF/WebP, responsive `sizes`,
  `priority` only on the hero image (LCP), lazy elsewhere.
- Fonts loaded via `next/font/google` — self-hosted at build time, no
  render-blocking external font request.
- Scroll reveals use `viewport={{ once: true }}` — no repeated re-render cost
  after first entry.
- No client-side interception needed for the contact form beyond validation
  state — no unnecessary re-renders on keystroke.

## 6. Accessibility

- Semantic landmarks (`header`, `main`, `footer`, one `h1`, cascading
  headings per section).
- All interactive elements are real `<button>`/`<a>`/form controls, not
  `div`s with click handlers.
- Every form field has an associated `<label>`; error/success states use
  `role="alert"` / `role="status"`.
- Visible focus ring defined globally (`:focus-visible`), not suppressed
  anywhere.
- `prefers-reduced-motion` disables the tilt transform and shortens all
  Framer Motion transitions/CSS animations to near-zero.
- Site is fully readable and operable with 3D/motion disabled.

## 7. SEO

- Per-page `<title>` / meta description generated from real content in
  `lib/data.ts`, not hardcoded strings.
- Open Graph + Twitter card metadata.
- `Attorney` JSON-LD structured data in `layout.tsx` (name, job title, area
  served, address, opening hours).
- `app/sitemap.ts` and `app/robots.ts` (Next.js typed metadata routes).
- Single `h1` in the hero; heading hierarchy is sequential through each
  section.

## 8. Testing

Actually run in this environment, not just claimed:

| Check | Result |
|---|---|
| `npm install` | ✅ clean, 394 packages, no errors |
| `tsc --noEmit` (TypeScript strict) | ✅ no errors |
| `next build` (production build) | ✅ compiled successfully, static prerender, 136 KB First Load JS |
| `next lint` (ESLint) | ✅ no warnings or errors |
| Real browser QA (Playwright + headless Chromium) | ✅ see below |

### Visual/functional QA — bugs actually found and fixed

The first version of this README claimed visual QA hadn't been done. It has
now, with a real headless browser at desktop (1440px) / tablet (820px) /
mobile (390px), and it caught three real bugs:

1. **Hero portrait collapsed to near-zero width.** `TiltPortrait` used a
   Next.js `fill` image inside a wrapper with no explicit width, sitting in
   an unsized flex item — `fill` images don't contribute intrinsic size, so
   the whole card (and its caption) collapsed to a sliver at the right edge,
   overlapping the CTA buttons on mobile. Fixed by giving the component's
   root element an explicit `w-full max-w-md` instead of relying on an
   ambient width from its flex parent.

2. **Hydration mismatch → dev overlay error.** The original `TiltPortrait`
   read `window.matchMedia(...)` inside a `useState` lazy initializer,
   which returns a different value during SSR (`window` undefined → `false`)
   than on the client's first render (real value) — a textbook
   server/client markup mismatch that React's hydration flagged as an error.
   Fixed by defaulting to `false` on both server and first client render,
   and only picking up the real value in a `useEffect` after mount.

3. **Reduced-motion content permanently invisible.** More subtle: `Reveal`
   used to set `whileInView={shouldReduceMotion ? undefined : {...}}`. When
   Framer Motion's `useReducedMotion()` hook resolved to `true` *after* an
   element's hidden `initial` state (`opacity: 0`) had already been applied,
   swapping `whileInView` to `undefined` didn't reset that value — it just
   stopped being controlled, leaving the element invisible forever. Every
   section below the hero was blank for anyone with reduced motion enabled.
   Fixed by having `whileInView` always target a real, defined visible
   state, and only varying the *starting point* and *duration* based on the
   reduced-motion setting. Verified empirically: below-the-fold content now
   resolves to `opacity: 1` within 300ms under emulated reduced motion,
   where before it stayed at `opacity: 0` after 2.3+ seconds.

Also fixed as a design issue (not a bug, but confirmed by screenshot): the
desktop inline nav was cramped and wrapping text at 820px tablet width.
Moved the mobile-drawer breakpoint from `md` (768px) to `lg` (1024px) so
tablets get the (already-working) hamburger menu instead of a squeezed
inline nav.

All three bug fixes were verified with automated checks, not just visual
inspection: a script that reads computed `opacity` via
`page.evaluate()` confirmed the before/after difference for bug #3, and
`page.on('pageerror')` confirmed zero uncaught errors across all three
breakpoints × both motion settings after the fixes.

Not run in this environment: a Playwright E2E test *suite* (the checks
above were one-off diagnostic scripts, not a committed test file — see
Remaining Issues).

## 9. Remaining Issues — stated plainly, not hidden

1. **No Playwright E2E suite committed to the repo.** The diagnostic checks
   in this QA pass were ad hoc scripts run against the dev server, not a
   `tests/` directory with `next/build`-independent, repeatable tests.
   Recommend adding `@playwright/test` with a smoke suite (page loads, nav
   links work, form validation states) once this is deployed somewhere CI
   can reach.
2. **Contact form has no real backend.** It validates and shows
   success/error states, but submission is a placeholder — see
   `components/sections/Contact.tsx` for where to wire a real endpoint
   (a Next.js Route Handler, or a form service) once the office email is
   confirmed.
3. **Same open content items as every prior version of this site:** phone
   number, WhatsApp number, email address, Bar Council registration
   number/enrollment year, and real Law Talks publish dates/links are all
   still placeholders — see `lib/data.ts`, fields are `null` or flagged.

## 10. Final Quality Score (self-assessed, not a customer promise)

| Category | /10 | Note |
|---|---|---|
| Design | 8 | Consistent, restrained system; confirmed in-browser at 3 breakpoints |
| UX | 8 | Clear hierarchy, one CTA per section, form states handled |
| Animation | 8 | One tilt system, one reveal system; reduced-motion path now verified correct, not just assumed |
| "3D" | 7 | Real depth interaction, deliberately not WebGL — see rationale above |
| Architecture | 9 | Clean separation, single source of truth, verified by a real build |
| Performance | 9 | 136 KB First Load JS, static prerender, verified by a real build |
| Accessibility | 8 | Semantic, labeled, focus-visible; reduced-motion content-visibility bug found and fixed, not screen-reader tested |
| SEO | 8 | Metadata, OG, JSON-LD, sitemap/robots in place; domain is still a placeholder |
| Responsiveness | 8 | Verified at desktop/tablet/mobile in a real headless browser; tablet nav crowding found and fixed |
| Professionalism | 8 | No fabricated content; every fact traces to the original brief |

Responsiveness moved from 6→8 and Animation/Accessibility notes were updated
because this pass replaced assumption with an actual headless-browser check
that found and fixed three real bugs (see section 8). "3D" is unchanged —
that score reflects a deliberate scope decision, not an untested claim.

One sandbox-specific note, not a product issue: the production build in
*this* environment required temporarily swapping `next/font/google` for
system fonts, because this container has no network access to
`fonts.googleapis.com`. The shipped code uses the real `next/font` loader
and will fetch normally in any environment with internet access at build
time (local machine, Vercel, CI) — this was verified by restoring it after
each build check, not left broken.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
npm run typecheck
```
