## Vite + React + Tailwind + GitHub Pages: Deployment Guide and Postmortem

This repository documents a working configuration to build and deploy a Vite + React + TypeScript + Tailwind app to GitHub Pages, plus a postmortem of issues we hit and how we fixed them so future projects can follow the same playbook.

Repo: [Ajaymanath6/shopos](https://github.com/Ajaymanath6/shopos)

### TL;DR

- Set Vite `base` to `/<repo>/` in production.
- Add SPA 404 fallback and redirect-decoder script.
- Use `BrowserRouter` with `basename` set to `/<repo>` in production.
- Import images from `src/assets` (don’t use absolute `/...` URLs).
- Use one GitHub Actions workflow to build and deploy Pages.

References: [rafgraph/spa-github-pages](https://github.com/rafgraph/spa-github-pages)

---

## What went wrong and how we fixed it

1) TypeScript build errors with verbatim module syntax
- Symptom: `TS1484: '<Type>' is a type and must be imported using a type-only import when 'verbatimModuleSyntax' is enabled.`
- Root cause: Type-only imports were not using `import type { ... }`.
- Fix: Change to `import type { PropsWithChildren } from 'react'` and `import type { ButtonHTMLAttributes } from 'react'` in components.

2) Assets and routes 404 on GitHub Pages
- Symptom: Built site loads locally, but on `https://<user>.github.io/<repo>/` assets and deep links 404.
- Root cause: Vite `base` not set for subpath deployment; router unaware of base path; no SPA fallback for deep links.
- Fixes:
  - `vite.config.ts`: conditional `base` set to `'/shopos/'` in production; also set `build.outDir` and `assetsDir`.
  - `src/main.tsx`: wrap app with `BrowserRouter` and `basename` set to `'/shopos'` in production.
  - `public/404.html`: add SPA redirect per rafgraph.
  - `index.html`: add redirect-decoder script in `<head>`.

3) Pages workflow failed to provision site
- Symptom: `Get Pages site failed. Please verify that the repository has Pages enabled ...`.
- Root cause: Pages not auto-enabled for the repo.
- Fix: Use `actions/configure-pages@v5` with `enablement: true` in the build job.

4) Workflow syntax/typo broke deploy action
- Symptom: `Unable to resolve action actions/deploy-pages@v4'` (note the trailing quote).
- Root cause: A stray `'` in the action ref.
- Fix: Correct to `uses: actions/deploy-pages@v4`.

5) Requested Tailwind 3.7 did not exist
- Symptom: Could not pin Tailwind `3.7.x` from npm.
- Root cause: There is no Tailwind `3.7`; latest `3.x` is `3.4.17` at the time of setup.
- Fix: Use `tailwindcss@^3.4.17`.

---

## Files and key configuration

### `vite.config.ts`
Sets conditional base for GitHub Pages and includes useful asset settings.

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production'
  const repoBase = '/shopos/' // change if your repo name changes
  return {
    plugins: [react()],
    base: isProd ? repoBase : '/',
    build: { outDir: 'dist', assetsDir: 'assets' },
    assetsInclude: ['**/*.svg', '**/*.woff2', '**/*.woff', '**/*.ttf'],
  }
})
```

### `src/main.tsx`
Adds `BrowserRouter` with `basename` in production.

```tsx
import { BrowserRouter } from 'react-router-dom'

const basename = import.meta.env.PROD ? '/shopos' : ''

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

### `public/404.html`
SPA redirect for deep links. Based on [rafgraph/spa-github-pages](https://github.com/rafgraph/spa-github-pages).

### `index.html` (head)
Redirect-decoder script to rewrite the redirected URL back to a SPA-friendly one.

```html
<script type="text/javascript">
  (function(l){
    if (l.search[1] === '/') {
      var decoded = l.search.slice(1).split('&').map(function(s) {
        return s.replace(/~and~/g, '&')
      }).join('?')
      window.history.replaceState(null, null, l.pathname.slice(0, -1) + decoded + l.hash)
    }
  }(window.location))
</script>
```

### `.github/workflows/deploy.yml`
Single source of truth to build and deploy Pages.

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: './package-lock.json'
      - name: Install
        run: npm ci
      - name: Build
        run: npm run build
      - uses: actions/configure-pages@v5
        with:
          enablement: true
      - uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## Step-by-step: New project checklist

1. Scaffold Vite + React (TS), install Tailwind 3.x, run `npx tailwindcss init -p`.
2. Configure Tailwind content and add `@tailwind` directives in `src/index.css`.
3. Use `src/assets/` for images and import them in components.
4. Add router with `BrowserRouter`; set `basename` to `/<repo>` in production.
5. Set Vite `base` to `/<repo>/` in production.
6. Add SPA fallback: `public/404.html` + decoder script in `index.html`.
7. Add the Pages workflow shown above.
8. Commit and push to `main`. In repo Settings → Pages, ensure Source is “GitHub Actions”.

---

## Local build and debug

```bash
npm run build
npm run preview
```

If Pages fails to provision or deploy:
- Confirm Settings → Pages → Source = GitHub Actions.
- Ensure Actions permissions allow “Read and write permissions” under Settings → Actions → General.
- Re-run the failed job in Actions.

Deep link 404s:
- Verify `public/404.html` exists in build output (`dist/404.html`).
- Confirm router `basename` and Vite `base` match `/<repo>`.

---

## Changing the repository name

If you rename the repository, update both of these:
- `vite.config.ts`: `const repoBase = '/<new-repo>/'`
- `src/main.tsx`: `const basename = import.meta.env.PROD ? '/<new-repo>' : ''`

Commit and push to redeploy.

