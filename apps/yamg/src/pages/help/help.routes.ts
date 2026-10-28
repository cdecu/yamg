import { HttpClient } from '@angular/common/http';
import { Routes } from '@angular/router';
import { provideMarkdown } from 'ngx-markdown';
import { HelpPageComponent } from './help';

export const helpRoutes: Routes = [
  {
    path: '',
    providers: [provideMarkdown({ loader: HttpClient })],
    component: HelpPageComponent,
  },
];
