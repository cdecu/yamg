# AGENTS.md

Guidance for AI coding agents working on **Yamg** (Yet Another Memory Game).

## Stack

- Angular 22 (standalone components, zoneless change detection, signals, `OnPush`), Angular Material 22.
- State: `@ngrx/signals` (`signalStore`, `withEntities`) in `apps/yamg/src/app/store/game.store.ts`.
- `ngx-markdown` + `prismjs` for the help page (`public/help.md`).
- Nx 24 workspace (single project `yamg`), TypeScript 6.0.
- Build/dev with **Vite+** (`vp`, v1.4.0) and `@analogjs/vite-plugin-angular`. SPA only: no SSR, no Angular CLI builder.
- Lint/format with Oxlint/Oxfmt via Vite+. ESLint and Prettier are not used.
- Desktop/mobile shell with **Tauri 2** (`apps/yamg/src-tauri`, Rust).

## Layout

```
vite.config.ts                 # Vite+ root config: defaultPackage, fmt and lint settings
nx.json                        # Nx inputs, build cache defaults
apps/yamg/
  index.html                   # Vite entry (<script type="module" src="/src/main.ts">)
  vite.config.ts               # Angular plugin, dev server (port 5173), outDir dist/apps/yamg/browser
  project.json                 # Nx targets, all delegating to vp / tauri
  public/                      # Static assets (data/*.json games, fonts, help.md, yamg.svg)
  src/main.ts                  # Bootstrap + global styles (Material theme, Prism) imports
  src/app/                     # Root component, models, store, game utilities, config, routes, services
    models/                    # Game and user models
    store/                     # Signal store and game state transitions
    game/                      # Tile construction and shuffling
  src/pages/<page>/            # One folder per route: <page>.ts / .html / .scss
  src-tauri/                   # Tauri config (tauri.conf.json), Cargo.toml, Rust sources
```

## Commands

Run from the repository root unless stated otherwise. `vp` is installed globally; otherwise prefix with `npx`.

```sh
vp install           # install dependencies (npm under the hood, lockfile: package-lock.json)
vp dev               # dev server on http://localhost:5173
vp build             # production build -> dist/apps/yamg/browser
vp preview           # serve the build on http://localhost:4173
vp check             # format + lint checks (must pass before finishing)
vp check --fix       # auto-fix formatting
vp run typecheck     # tsc --noEmit on apps/yamg/tsconfig.app.json
```

Nx targets (same commands, with caching on `build`): `vp exec nx <build|serve|preview|typecheck|tauri-dev|tauri-build> yamg`.

Tauri, from `apps/yamg`:

```sh
vp exec tauri dev     # starts vp dev itself (beforeDevCommand), then the native window
vp exec tauri build   # runs vp build, then bundles (.deb, .rpm, .AppImage)
```

## Validation checklist

1. `vp check`
2. `vp run typecheck`
3. `vp build`
4. If `src-tauri/` changed: `vp exec tauri build --bundles deb` from `apps/yamg` (a full bundle is slow).

There are no unit or e2e tests in this project.

## Conventions

- 2-space indentation, single quotes, semicolons, trailing commas (enforced by Oxfmt, see root `vite.config.ts`).
- Standalone components only, no NgModules. Use `inject()`, signals, `effect`/`computed`, and `ChangeDetectionStrategy.OnPush`.
- Do not reintroduce `zone.js`, SSR (`@angular/ssr`, `platform-server`, `server.ts`), ESLint or Prettier.
- Component selector prefix: `yamg`. Page components are named `<Name>PageComponent` and live in `src/pages/<name>/`.
- Global styles (Material theme, `styles.scss`) go in `src/main.ts`, not in a builder `styles`/`scripts` array.
- Help-only dependencies stay lazy: `provideMarkdown()` is in the route providers of `src/pages/help/help.routes.ts`, and Prism (scripts + theme) is imported in `help.ts`.
- Static files go in `apps/yamg/public/`; data files fetched at runtime use paths relative to the base URL so the app also works on GitHub Pages.
- Add dependencies with `vp install <pkg>` (or `-D`). Keep Angular packages aligned on the same `~22.x` version and keep the `vite` override pointing to `@voidzero-dev/vite-plus-core`.
- Keep the Tauri CLI (`@tauri-apps/cli`) and the Rust crates (`tauri`, `tauri-build`, `tauri-plugin-log`) on major version 2.

## Gotchas

- Port 5173 is strict: stop any running `vp dev` before `vp exec tauri dev`, or pass `--config '{"build":{"beforeDevCommand":""}}'` to reuse it.
- The Tauri CLI rejects `CI=1`; use `CI=true vp exec tauri ...` in such environments.
- Tauri uses WebKitGTK on Linux, which renders some CSS differently from Chrome/Firefox: check layout changes in both `vp dev` (browser) and `vp exec tauri dev`.
- Linux native builds need the WebKitGTK/GTK development packages (on openSUSE: `webkitgtk3-devel`, `gtk3-devel`, `librsvg-devel`, `libopenssl-devel`, `libsoup-devel`).
- The main JS chunk is above 500 kB; the Vite warning is known and does not fail the build.
- GitHub Pages deploys from `.github/workflows/pages.yml` with `YAMG_BASE=/yamg/`; the standard build keeps `/` for local development and Tauri.
- Do not edit `dist/`, `node_modules/`, `.nx/` or `apps/yamg/src-tauri/target/`.

<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

## General Guidelines for working with Nx

- For navigating/exploring the workspace, invoke the `nx-workspace` skill first - it has patterns for querying projects, targets, and dependencies
- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- Prefix nx commands with the workspace's package manager (e.g., `pnpm nx build`, `npm exec nx test`) - avoids using globally installed CLI
- You have access to the Nx MCP server and its tools, use them to help the user
- For Nx plugin best practices, check `node_modules/@nx/<plugin>/PLUGIN.md`. Not all plugins have this file - proceed without it if unavailable.
- NEVER guess CLI flags - always check nx_docs or `--help` first when unsure

## Scaffolding & Generators

- For scaffolding tasks (creating apps, libs, project structure, setup), ALWAYS invoke the `nx-generate` skill FIRST before exploring or calling MCP tools

## When to use nx_docs

- USE for: advanced config options, unfamiliar flags, migration guides, plugin configuration, edge cases
- DON'T USE for: basic generator syntax (`nx g @nx/react:app`), standard commands, things you already know
- The `nx-generate` skill handles generator discovery internally - don't call nx_docs just to look up generator syntax

<!-- nx configuration end-->
