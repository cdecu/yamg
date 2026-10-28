import angular from '@analogjs/vite-plugin-angular';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite-plus';

export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  base: process.env.YAMG_BASE ?? '/',
  publicDir: 'public',
  clearScreen: false,
  envPrefix: ['VITE_', 'TAURI_ENV_*'],
  plugins: [angular({ tsconfig: './tsconfig.app.json' })],
  resolve: {
    mainFields: ['module'],
  },
  optimizeDeps: {
    exclude: ['ngx-markdown'],
  },
  server: {
    host: process.env.TAURI_DEV_HOST ?? 'localhost',
    port: 5173,
    strictPort: true,
    watch: {
      ignored: ['**/src-tauri/**'],
    },
  },
  build: {
    outDir: '../../dist/apps/yamg/browser',
    emptyOutDir: true,
  },
});
