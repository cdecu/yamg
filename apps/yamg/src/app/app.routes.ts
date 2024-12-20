import { Route } from '@angular/router';
import { HomePageComponent } from '../pages/home/home';
import { BoardPageComponent } from '../pages/board/board';
import { HelpPageComponent } from '../pages/help/help';
import { ScoresPageComponent } from '../pages/scores/scores';
import { LoginPageComponent } from '../pages/login/login';
import { YamgRouteGuard } from './yamg-route.guard';

export const appRoutes: Route[] = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'board',
    component: BoardPageComponent,
    canActivate: [YamgRouteGuard],
  },
  {
    path: 'scores',
    component: ScoresPageComponent,
    canActivate: [YamgRouteGuard],
  },
  {
    path: 'help',
    component: HelpPageComponent,
  },
  {
    path: 'logout',
    component: HomePageComponent,
    canActivate: [YamgRouteGuard],
  },
  {
    path: '**',
    component: HomePageComponent,
  },
];
