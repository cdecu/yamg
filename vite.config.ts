import { defineConfig } from 'vite-plus';

export default defineConfig({
  defaultPackage: './apps/yamg',
  fmt: {
    ignorePatterns: [
      'dist/**',
      'node_modules/**',
      '.github/**',
      '.vscode/**',
      'README-Scaffolding.md',
      'apps/yamg/public/data/**',
      'apps/yamg/public/help.md',
      'apps/yamg/src-tauri/**',
    ],
    semi: true,
    singleQuote: true,
    trailingComma: 'all',
  },
  lint: {
    ignorePatterns: ['dist/**', 'node_modules/**'],
  },
});
