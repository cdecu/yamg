# Yamg scaffolding

- Create a new Nx workspace with a zoneless Angular application (originally Angular v19 with SSR, now Angular v22 SPA)
```sh
npx create-nx-workspace@latest
cd yamg
nx add @nx/angular
nx g @nx/angular:application --directory=apps/yamg --name=yamg --e2eTestRunner=none --minimal=true --prefix=yamg --skipTests=true --ssr=false --style=scss --unitTestRunner=none --no-interactive
```

- Move to Vite+ (build/dev with `@analogjs/vite-plugin-angular`, lint/format with Oxlint/Oxfmt)
```sh
npm install -g vite-plus
vp migrate
vp install -D @analogjs/vite-plugin-angular
```
  Then add `apps/yamg/vite.config.ts` (Angular plugin, `public` dir, output `dist/apps/yamg/browser`), `apps/yamg/index.html`
  with `<script type="module" src="/src/main.ts">`, and point the Nx targets `build` / `serve` / `preview` to `vp build` / `vp dev` / `vp preview`.

- Day-to-day commands
```sh
vp dev
vp build
vp preview
vp check
```

- Add Tauri
```sh
  vp install -D @tauri-apps/cli@^2
  cd apps/yamg
  vp exec tauri init
  vp exec tauri dev
  export ANDROID_HOME=~/opt/Android/Sdk/
  export NDK_HOME=~/opt/Android/Sdk/ndk/28.0.12674087/
  vp exec tauri android init
  vp exec tauri android dev --open
```
  In `tauri.conf.json`: `devUrl` = `http://localhost:5173`, `beforeDevCommand` = `npm run dev` (`vp dev`),
  `beforeBuildCommand` = `npm run build` (`vp build`), `frontendDist` = `../../../dist/apps/yamg/browser`.


https://dev.to/davidihl/how-to-create-a-responsive-sidebar-and-mini-navigation-with-material-angular-o5l

https://developer.okta.com/blog/2020/01/21/angular-material-login

