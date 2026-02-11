# CryptoVest — GitHub Pages publishing and admin

This repository contains the CryptoVest static site. The following additions were made to enable easy publishing and a simple client-side admin UI:

- **GitHub Pages deploy workflow:** .github/workflows/gh-pages.yml — runs on push to `main` and publishes the repository root to GitHub Pages.
- **Admin page:** `pages/admin.html` — client-side admin dashboard (password-protected in JS).
- **Admin logic:** `assets/js/admin.js` — login handling and data loading/export.
- **Sample data:** `data/users.json`, `data/complaints.json` — sample files the admin can view/download.

Quick steps to publish and secure the admin page:

1. Open `assets/js/admin.js` and change the `ADMIN_PASS` constant to a strong password you will use to sign in to the admin page.
2. Commit and push to the `main` branch:

```bash
git add .
git commit -m "Add GitHub Pages workflow and admin dashboard"
git push origin main
```

3. After the push, GitHub Actions will run and deploy the repository to GitHub Pages. Enable Pages from repository settings if needed (deployments via `actions/deploy-pages` create a Pages deployment).

Limitations and next steps:

- This admin protection is client-side only and is not a secure server-side authentication mechanism. For a production admin panel (secure access, real user management, editing data), add a backend (e.g., Node/Express, or serverless functions) with proper authentication.
- If you want the admin to modify data and persist changes, implement an API and secure it with token-based auth, or use GitHub authenticated commits via a GitHub App or Actions workflow.

If you want, I can:
- Replace the simple client-side protection with a more secure flow (e.g., GitHub OAuth or serverless auth).
- Add edit/create/delete UI and wire it to a serverless API.
