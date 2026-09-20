# Thangatamil A — portfolio

Personal site for a Software Development Engineer, styled after a dark editorial one-pager (sticky nav, impact timeline, filterable case studies).

## Run

```bash
npm install
npm run dev
```

Resume PDF is served from `public/thangatamil_cv.pdf`.

## Deploy for free with GitHub Pages

This repository is configured to deploy automatically to GitHub Pages whenever
changes are pushed to `main`.

1. Push the project to a GitHub repository. For this project, the repository is
   `Thanga-tamil/portfolio`.
2. Open the repository on GitHub and go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Push to `main` (or open **Actions → Deploy to GitHub Pages → Run workflow**).
5. Wait for the workflow to finish. The site will be available at:
   `https://thanga-tamil.github.io/portfolio/`

The `base` setting in `vite.config.js` accounts for the repository name, so
assets and client-side links work correctly on the project site.
