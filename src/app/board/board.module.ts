import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { PlayPage } from './board.page';
import { GameBoardComponent } from "./board.page";
import { BoardTileComponent } from "./board-tile";
import {ChronoComponent} from "./board-chrono";

@NgModule({
  declarations: [
    PlayPage,
      ChronoComponent,
      GameBoardComponent,
        BoardTileComponent,
  ],
  imports: [IonicPageModule.forChild(PlayPage)],
})
export class PlayPageModule { }
