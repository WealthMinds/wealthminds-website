# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static HTML/CSS/JS website for **WealthMinds**, a SEBI-registered Research Analyst firm founded by Srishti Mendiratta. No build system, no dependencies — open any `.html` file directly in a browser. Hosted on GitHub Pages at `https://wealthminds.co.in`.

## Site Structure

| File | Purpose |
|------|---------|
| `index.html` | Home page |
| `about.html` | About Srishti / WealthMinds |
| `services.html` | Services overview |
| `services/swing-trading-research.html` | Swing trading detail page |
| `services/long-term-investment-research.html` | Long-term investment detail page |
| `policies.html` | Links to policy PDFs |
| `investor-charter.html` | SEBI investor charter |
| `complaint-data.html` | Monthly complaint data table (update each month) |
| `contact.html` | Contact form (Formspree) |
| `404.html` | Custom 404 page (auto-served by GitHub Pages) |
| `sitemap.xml` | XML sitemap for all 9 pages |
| `robots.txt` | Crawler rules pointing to sitemap |

All pages share the same `css/styles.css` and `js/main.js` via relative paths (subpages use `../css/styles.css` and `../js/main.js`).

## Design Tokens (CSS Custom Properties)

Defined in `:root` in `css/styles.css`:
- `--primary: #1A237E` (navy blue)
- `--gold: #BDB76B`
- Font: Roboto (Google Fonts), scaled via `--font-scale` CSS variable

High-contrast mode toggled via `data-contrast="high"` on `<html>`, persisted in `localStorage`.

## JS Architecture (`js/main.js`)

Single IIFE. Key responsibilities:
1. Restores accessibility settings (contrast, font scale) from `localStorage` before DOMContentLoaded
2. Wires up accessibility controls (`#contrast-toggle`, `#font-increase`, `#font-decrease`, `#font-reset`) — now embedded in the header on all pages
3. Active nav link highlighting via `data-page` attributes on `<a>` tags matched against `document.body.dataset.page`
4. Mobile nav hamburger toggle + Escape key to close
5. Contact form submission via Formspree (AJAX) with client-side validation
6. Back-to-top button (`#back-to-top`) — appears after 300px scroll
7. Disclaimer banner dismiss (`.disclaimer-banner` close button on service detail pages)
8. Scroll handler throttled via `requestAnimationFrame`

## Images

All hero banners and service card images use Unsplash CDN URLs (`https://images.unsplash.com/photo-[ID]?w=...&q=80`) so they load reliably on GitHub Pages without committing binary assets. Do not replace these with local image paths unless the files are committed to git.

Known working Unsplash photo IDs used on the site:
- `1486325212027-8081e485255e` — city skyline (home hero)
- `1611974789855-9c2a0a7236a3` — stock market chart (services hero + swing trading card)
- `1573496359142-b8d87734a5a2` — professional woman (about hero)
- `1450101499163-c8848c66ca85` — documents (policies hero)
- `1590283603385-17ffb3a7f29f` — investment chart (investor-charter hero)
- `1551288049-bebda4e38f71` — data analytics (complaint-data hero)
- `1497366216548-37526070297c` — office interior (contact hero)
- `1579532537598-459ecdaf39cc` — growth chart (long-term investment card)

## Accessibility Controls

The HC (high contrast) and A−/A/A+ (font size) buttons are embedded inside `.header-inner` as `.header-a11y` on every page — they are NOT a separate floating widget. They are hidden on mobile (≤768px) where the hamburger takes over. Do not add a separate floating `.a11y-widget` div.

## Pending Setup (see ASSETS_NEEDED.md)

- `assets/images/srishti.jpg` — portrait photo
- 7 PDFs in `policies/documents/` — exact filenames matter
- Formspree form ID in `contact.html` — replace `REPLACE_WITH_YOUR_ID`
- Social media `href="#"` placeholders for LinkedIn, Twitter, YouTube
- `complaint-data.html` — update the monthly complaint table each month

## SEBI Compliance Notes

- The site must always display SEBI registration number and disclaimer text
- Investor charter and complaint data pages are regulatory requirements — do not remove them
- Policy PDF filenames in `policies/documents/` must match exactly what `policies.html` links to
- Service detail pages must retain the SEBI risk disclaimer banner
