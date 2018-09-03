import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import {BoardPage} from './board.page';
import {GameBoardComponent} from './board-playground';
import {BoardTileComponent} from './board-tile';
import {BoardChronoComponent} from './board-chrono';

const routes: Routes = [
  {
    path: '',
    component: BoardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BoardPage, GameBoardComponent, BoardTileComponent, BoardChronoComponent]
})
export class BoardPageModule {}
