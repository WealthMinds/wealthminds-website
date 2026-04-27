# Assets Needed — WealthMinds Website

This file lists everything you need to provide before the website is fully complete.

---

## 1. Personal Images

Place these files in the `assets/images/` folder.

| File | Description | Used on |
|------|-------------|---------|
| `assets/images/srishti.jpg` | Portrait photo of Srishti Mendiratta (professional headshot recommended) | About page, Home page "WealthMinds Difference" section |
| `assets/images/favicon.png` | Square icon image (recommended: 32×32 or 64×64 px PNG) | Browser tab icon on all pages |

> The site already handles a missing photo gracefully — a styled placeholder is shown until the image is added.
> The favicon link tag is already in every page's `<head>`. Just drop the file into `assets/images/` and name it `favicon.png`.

---

## 2. Policy Documents (PDFs)

Place these PDF files inside the `policies/documents/` folder. The filenames must match exactly (case-sensitive).

| File | Policy Name |
|------|-------------|
| `policies/documents/research-analyst-policy.pdf` | Research Analyst Policy |
| `policies/documents/conflict-of-interest-policy.pdf` | Conflict of Interest Policy |
| `policies/documents/employee-trading-policy.pdf` | Employees' Trading Policy |
| `policies/documents/insider-trading-policy.pdf` | Insider Trading Policy |
| `policies/documents/pmla-policy.pdf` | Anti Money Laundering (PMLA) Policy |
| `policies/documents/policy-on-circulation-of-unauthenticated-news.pdf` | Policy on Circulation of Unauthenticated News |
| `policies/documents/disclaimer-research-analyst.pdf` | Research Analyst Disclaimer |

> Once PDFs are in place, the "Read Full Document" buttons on the Policies page will open them directly.

---

## 3. Formspree Setup (Contact Form)

The contact form uses Formspree to receive messages at `investor@wealthminds.co.in`.

**Steps to activate:**

1. Go to [https://formspree.io](https://formspree.io) and create a free account using `investor@wealthminds.co.in`
2. Create a new form — set the destination email to `investor@wealthminds.co.in`
3. Copy your unique form ID (looks like: `xpzgwkrq`)
4. Open `contact.html` and find this line:
   ```html
   action="https://formspree.io/f/REPLACE_WITH_YOUR_ID"
   ```
5. Replace `REPLACE_WITH_YOUR_ID` with your actual form ID, e.g.:
   ```html
   action="https://formspree.io/f/xpzgwkrq"
   ```
6. Save the file and test the form — you should receive an email confirmation

---

## 4. Social Media Links (Optional — Add Later)

The following social icons are already on every page. To add links, open any HTML file and search for the `data-social` attribute:

| Platform | Search for | Replace `href="#"` with |
|----------|-----------|------------------------|
| LinkedIn | `data-social="linkedin"` | Your LinkedIn profile URL |
| Twitter/X | `data-social="twitter"` | Your Twitter/X profile URL |
| YouTube | `data-social="youtube"` | Your YouTube channel URL |

Instagram is already linked to `https://www.instagram.com/wealthminds.research`.

---

## 5. Complaint Data (Monthly Updates)

The `complaint-data.html` page has a table currently showing February 2026 data.

**To update monthly:**
1. Open `complaint-data.html`
2. Find the heading: `Data for the month ending – February 2026`
3. Update the month/year and edit the table cells with the actual numbers

---

## Summary Checklist

- [-] Add `assets/images/srishti.jpg`
- [-] Add `assets/images/favicon.png` (square PNG, 32×32 or 64×64 px)
- [-] Add all 7 PDF files to `policies/documents/`
- [-] Set up Formspree and replace `REPLACE_WITH_YOUR_ID` in `contact.html`
- [ ] (Optional) Add LinkedIn, Twitter, YouTube links
- [ ] (Ongoing) Update complaint data table each month
