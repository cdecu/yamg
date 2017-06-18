import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { PlayPage } from './play';
import { GameBoardComponent } from "./board";
import { BoardTileComponent } from "./board-tile";

@NgModule({
  declarations: [
    PlayPage,
      GameBoardComponent,
      BoardTileComponent,
  ],
  imports: [IonicPageModule.forChild(PlayPage)],
})
export class PlayPageModule { }
