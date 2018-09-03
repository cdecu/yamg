import { Component } from '@angular/core';
import {GameService} from "../../providers/game.service";

/**
 * Display Game Status on top of the board
 *
 */
@Component({
  selector: 'chrono',
  templateUrl: 'board-chrono.html'
})
export class ChronoComponent {

  public get isOver(): boolean { return this.gameService.isOver };
  public get GameCountDown(): string { return this.gameService.GameCountDown };

  constructor(public gameService: GameService) {
  }

}
