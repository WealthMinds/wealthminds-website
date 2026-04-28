# WealthMinds — Official Website

Website for **WealthMinds**, a SEBI-registered Research Analyst firm founded by Srishti Mendiratta.

**Live site:** [wealthminds.co.in](https://wealthminds.co.in)

---

## About

WealthMinds provides disciplined equity research to help investors build long-term wealth. The firm is registered with SEBI as a Research Analyst (INH000024295) and enlisted with BSE (No. 6885).

**Founder:** Srishti Mendiratta — Founder & Principal Analyst, SEBI Registered Research Analyst & Certified Financial Planner®  
**Contact:** investor@wealthminds.co.in | +91 97266 29121  
**Office:** 96, New Cloth Market, Sarangpur, Sherkotda, Ahmedabad, Gujarat 380002

---

## Tech Stack

Pure static site — no build tools, no frameworks, no dependencies.

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 |
| Styles | CSS3 (custom properties, flexbox, grid) |
| Scripts | Vanilla JS (single IIFE in `js/main.js`) |
| Fonts | Roboto via Google Fonts |
| Images | Unsplash CDN |
| Forms | Formspree (AJAX) |
| Hosting | GitHub Pages |

---

## Pages

| Page | URL |
|------|-----|
| Home | `/` |
| About | `/about.html` |
| Services | `/services.html` |
| Swing Trading Research | `/services/swing-trading-research.html` |
| Long-Term Investment Research | `/services/long-term-investment-research.html` |
| Policies | `/policies.html` |
| Investor Charter | `/investor-charter.html` |
| Complaint Data | `/complaint-data.html` |
| Contact | `/contact.html` |

---

## Features

- Fully responsive — mobile, tablet, desktop
- Accessibility controls in the header: high-contrast mode and font size adjustment (persisted via `localStorage`)
- Client-side contact form validation
- Interactive Google Maps embed with office location
- Floating WhatsApp CTA and back-to-top button
- SEBI risk disclaimer banners on service pages
- Spam protection via Formspree honeypot field
- SEO: Open Graph tags, Twitter Cards, canonical URLs, JSON-LD structured data, `sitemap.xml`, `robots.txt`
- Custom 404 page (auto-served by GitHub Pages)
- `prefers-reduced-motion` support

---

## Running Locally

No build step required. Open any HTML file directly in a browser:

```
open index.html
```

Or serve with any static server, e.g.:

```bash
npx serve .
# or
python -m http.server 8000
```

---

## Maintenance

**Monthly:** Update the complaint data table in `complaint-data.html` with figures for the new month.

**As needed:** Update `sitemap.xml` `<lastmod>` dates when pages change significantly.

---

## SEBI Compliance

This site is a regulatory requirement. Do not remove:
- SEBI registration number (INH000024295) displayed in the footer
- Disclaimer text on all pages and service pages
- Investor Charter page (`investor-charter.html`)
- Complaint Data page (`complaint-data.html`)
- Policy document links (`policies.html`)

---

*Investments in securities are subject to market risks. Please read all related documents carefully before investing. Past performance is not indicative of future results.*
