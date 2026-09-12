# Zhou Xuyan — personal portfolio

A custom dark portfolio with cursor-following glow, scroll-activated card lighting, gentle section reveals, expandable experience entries, project detail dialogs, and a portrait placeholder. Content is based on the supplied résumé and the subsequent Singtel role and project notes.

The current full-time role is **Management Associate · Business Manager at Singtel, July 2026–present**, working at Group level and supporting the Group CIO/CDO and Group CTO. Singtel is the employer; Group level describes the role's remit. Earlier work roles are internships. Singtel AI Exchange and SRB / ARB Governance lead the selected work, describing strategic planning and enablement contributions without claiming unreported launches or adoption outcomes. The downloadable PDF is the original résumé and has not yet been updated to include the current full-time role.

The site is plain HTML, CSS, and JavaScript. There are **no package dependencies, build step, paid template, API keys, or backend**. Everything in `dist/` is the finished website.

## Preview locally

With Node.js installed, run `npm start` from this folder, then open **http://127.0.0.1:4173**. Stop the preview with Ctrl+C. You can also open `dist/index.html` directly, though clipboard access depends on the browser and works best through the local server or HTTPS.

## Add your photo

1. Save a portrait as `dist/assets/portrait.jpg` (a portrait-oriented image around 900 × 1100 px works well).
2. Open `dist/script.js` and change `const PHOTO_ENABLED = false;` to `const PHOTO_ENABLED = true;`.
3. Refresh the preview. The photo replaces the initials and “Your photo here” placeholder. If the photo cannot load, the placeholder stays visible.

To use a different file type, also change `PROFILE_PHOTO` at the top of `dist/script.js`. Adjust `.portrait-image` in `dist/styles.css` if you need to move the crop.

## Edit your content

- **Name, introduction, experience, skills, contact, and project cards:** `dist/index.html`.
- **Expanded project details and email-copy value:** `dist/script.js`.
- **Colours, glow, spacing, and layout:** `dist/styles.css`.
- **Downloadable résumé:** replace `dist/assets/Zhou_Xuyan.pdf` with the updated PDF under the same filename.

The email also appears in links in `index.html`; update both files if it changes. Project details distinguish the current full-time Singtel role from earlier internships. No unavailable project demos or repositories are fabricated. The supplied PDF is included as the downloadable résumé, with its original contact details.

## Publish free with GitHub Pages

This portfolio is configured for the public repository **[Xuyan0518/xuyan0518.github.io](https://github.com/Xuyan0518/xuyan0518.github.io)** and website **[xuyan0518.github.io](https://xuyan0518.github.io/)**. Free Pages hosting is available for a public repository on GitHub Free.

1. For a new setup, create a public repository named **`xuyan0518.github.io`**. A repository called `personal-website` also works, with a `/personal-website/` URL path.
2. Push this entire project to its `main` branch, including `.github/workflows/deploy.yml` and the `dist/` folder. GitHub Desktop is an option if you prefer a visual interface.
3. In the repository, open **Settings → Pages → Build and deployment → Source**, then choose **GitHub Actions**.
4. Open **Actions → Deploy portfolio to GitHub Pages → Run workflow**. Later pushes to `main` automatically deploy updates.
5. After the run succeeds, the published URL appears in **Settings → Pages** and the deployment summary. For the personal repository above, the expected address is `https://xuyan0518.github.io/`.

Use a different username in the repository name if you choose a different GitHub account. All asset links are relative, so the site works both at the root domain and beneath a repository path.

Only the `dist/` folder is deployed. Local preview tools and documentation are excluded from the hosted output. The workflow requires no secrets.

Official instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

## Checks and accessibility

Run `npm run check` to validate JavaScript syntax, section links, unique element IDs, local assets, and project buttons. Check the site in a browser before publishing.

The design includes keyboard focus styles, a skip link, native expandable details and modal dialogs, accessible mobile navigation, touch-compatible scroll glow, and a reduced-motion mode that respects your device settings. Content stays visible without JavaScript; the basic navigation and experience cards remain usable.
