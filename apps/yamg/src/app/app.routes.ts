import { Routes } from '@angular/router';
import { authGuard } from './auth-guard.service';

export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'login',
    loadComponent: () => import('../pages/login/login').then((module) => module.LoginPageComponent),
  },
  {
    path: 'board',
    loadComponent: () => import('../pages/board/board').then((module) => module.BoardPageComponent),
  },
  {
    path: 'scores',
    canActivate: [authGuard],
    loadComponent: () =>
      import('../pages/scores/scores').then((module) => module.ScoresPageComponent),
  },
  {
    path: 'help',
    loadChildren: () => import('../pages/help/help.routes').then((module) => module.helpRoutes),
  },
  {
    path: 'home',
    loadComponent: () => import('../pages/home/home').then((module) => module.HomePageComponent),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
