# Assets Needed — WealthMinds Website

This file lists everything you need to provide before the website is fully complete.

---

## 1. Social Media Links (Optional — Add Later)

The following social icons are already on every page. To add links, open any HTML file and search for the `data-social` attribute:

| Platform | Search for | Replace `href="#"` with |
|----------|-----------|------------------------|
| LinkedIn | `data-social="linkedin"` | Your LinkedIn profile URL |
| Twitter/X | `data-social="twitter"` | Your Twitter/X profile URL |
| YouTube | `data-social="youtube"` | Your YouTube channel URL |

Instagram is already linked to `https://www.instagram.com/wealthminds.research`.

---

## 2. Complaint Data (Monthly Updates)

The Grievance Summary section near the bottom of `investor-charter.html` has a table driven by `data/complaints.json`.

**To update monthly:**
1. Open `data/complaints.json`
2. Update `month` and the `monthly`/`annual` figures with the actual numbers

---

## Summary Checklist

- [ ] (Optional) Add LinkedIn, Twitter, YouTube links
- [ ] (Ongoing) Update complaint data table each month
