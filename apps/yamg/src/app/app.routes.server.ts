// app.routes.server.ts
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'board', // This renders the "/" route on the client (CSR)
    renderMode: RenderMode.Client,
  },
  {
    path: '**', // All other routes are static, so we prerender it (SSG)
    renderMode: RenderMode.Prerender,
  },
];
