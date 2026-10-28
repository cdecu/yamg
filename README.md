# Yamg

Yet Another Memory Game, built with Angular and Nx and powered by [Vite+](https://viteplus.dev).

## Requirements

- Node.js 22.18+, 24.11+, or 26+
- Vite+ CLI (`vp`), installed globally:

```sh
npm install -g vite-plus
```

Without a global install, prefix the commands below with `npx` (for example `npx vp dev`): `vite-plus` is a dev dependency of the workspace.

## Install

```sh
vp install
```

## Development

```sh
vp dev
```

The Vite development server is available at <http://localhost:5173>.

## Build

```sh
vp build
```

The static SPA is written to `dist/apps/yamg/browser`. To serve the production build locally (<http://localhost:4173>):

```sh
vp preview
```

## Checks

```sh
vp check
vp lint
vp fmt
vp run typecheck
```

- `vp check` runs format and lint checks (Oxfmt + Oxlint).
- `vp lint` / `vp fmt` run the linter and the formatter on their own (`vp fmt` rewrites files).
- `vp run typecheck` runs the Angular application TypeScript project without emitting files.

## Nx

The Nx targets of the `yamg` project delegate to Vite+ (`vp build`, `vp dev`, `vp preview`):

```sh
vp exec nx build yamg
vp exec nx serve yamg
vp exec nx preview yamg
vp exec nx typecheck yamg
vp exec nx tauri-dev yamg
vp exec nx tauri-build yamg
```

## Desktop app

The Tauri configuration uses the same Vite+ scripts for development (`npm run dev` → `vp dev`, on port 5173) and production builds (`npm run build` → `vp build`). Its frontend output is `dist/apps/yamg/browser`.

The Tauri CLI (`@tauri-apps/cli` 2.x) is a dev dependency of the workspace, installed by `vp install`. From `apps/yamg`:

```sh
cd apps/yamg
vp exec tauri dev
vp exec tauri build
vp exec tauri android dev --open
```

## GitHub Pages

The site is published to <https://cdecu.github.io/yamg/> by the GitHub Actions workflow in `.github/workflows/pages.yml` when changes are pushed to `main`. You can also start a deployment manually from the Actions tab. The workflow builds the SPA with the `/yamg/` base path and copies `index.html` to `404.html` so Angular can handle direct links and page refreshes.

To enable publishing, set **Settings → Pages → Build and deployment → Source** to **GitHub Actions** in the repository settings. To build the Pages version locally:

```sh
YAMG_BASE=/yamg/ vp run build:pages
YAMG_BASE=/yamg/ vp preview --port 4175 --outDir dist/apps/yamg/browser --base /yamg/
```

The normal `vp build` keeps the `/` base path used for local development and Tauri.
