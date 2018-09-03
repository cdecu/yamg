import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes : Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'ScoresPage',
    loadChildren: './list/list.module#ListPageModule'
  },
  {
    path: 'HelpPage',
    loadChildren: './help/help.module#HelpPageModule'
  },
  {
    path: 'BoardPage',
    loadChildren: './board/board.module#BoardPageModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false, onSameUrlNavigation: 'reload' } )],
  exports: [RouterModule]
})
export class AppRoutingModule {}
