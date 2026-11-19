# Earth Odometer website

Public marketing site and interactive concept demo for Earth Odometer.

**Official domain (after DNS setup):** https://earthodometer.com

## What is included

- Responsive marketing homepage, features, and planned pricing
- Interactive dashboard with simulated lifetime, today, and year mileage
- Earth laps, Moon progress, and mileage breakdown across seven transport categories
- Three free and twelve Plus preview journeys, with a single active virtual journey
- Earnable stamps and medals
- Browser-local demo state, reset and sample controls

This website does **not** track actual location, connect to the native iPhone app, create accounts, or collect payments. Route lengths and sample mileage are illustrative.

## Publish on GitHub Pages

Go to **Settings → Pages → Build and deployment**, choose **GitHub Actions**. The workflow in `.github/workflows/pages.yml` deploys the site automatically. You can also run it manually from the **Actions** tab.

## Connect earthodometer.com

At the DNS provider for the domain:

| Type | Name | Value |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | mattterry00.github.io |

The `CNAME` file in the repository specifies the apex domain. In GitHub Pages settings, verify `earthodometer.com` and enable **Enforce HTTPS** when available. Avoid duplicate or conflicting A/AAAA/CNAME records and don't change unrelated MX/TXT records.

## Development

Open `index.html` in a browser; no build step. The source iPhone app remains in the separate private `earth-odometer` repository.
