# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static marketing/information website for the Dystonia Coalition (research consortium). Plain HTML + one CSS file + one vanilla JS file. There is no build step, package manager, framework, linter, or test suite.

## Running locally

Open `index.html` directly in a browser, or serve the folder so relative links behave like production:

```
python -m http.server 8000
```

## Architecture

- **Ten standalone pages** at the repo root (`index.html`, `about.html`, `contact.html`, etc.). Each page contains its own full copy of the site header (notice banner, logo, primary nav) and footer. There are no includes or templating.
- **Shared header/footer must be edited in every page.** `assets/partials.txt` is only a reference note and is not loaded at runtime. When you add, rename, or remove a page, update the `<nav class="primary-nav">` list and the footer link columns in all ten HTML files. Set `aria-current="page"` on the nav link for the current page.
- **`assets/style.css`** holds all styling. Design tokens (colors, fonts, `--max` width) are CSS custom properties on `:root`, and Google Fonts (Fraunces, Inter, IBM Plex Mono) are pulled in with `@import`. Reuse the existing tokens and classes (`.wrap`, `.page-head`, `.eyebrow`, `.dek`, `.prose`, `.btn btn-primary`, `.stack`) instead of adding new colors or one-off styles.
- **`assets/script.js`** is loaded on every page and does two things:
  - Toggles the mobile nav (`.nav-toggle` → `.primary-nav.open`).
  - On the publications page only, filters and sorts the list client-side. It runs only when `#pub-list` exists. Each publication is a `.pub` element and needs `data-year` (an integer) and `data-author` attributes for sorting to work. `#pub-search` and `#pub-sort` are the controls.
- **Forms** (the contact form on `contact.html` and the collaborate form on `researchers.html`) post to a FormSubmit endpoint (`https://formsubmit.co/el/...`), which delivers to the coalition's email. Hidden `_subject` and `_template` inputs set the email format. There is no server-side code.

## Deployment / repo

GitHub remote: `DystoniaCoalition/dystonia-coalition-site`. Changes go through PRs to `main`. The site is planned to move to the DystoniaCoalition.org domain (see the `.notice` banner on each page).
