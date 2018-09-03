import { Component } from '@angular/core';
import {GameService} from "../../providers/game.service";

/**
 * Display Game Status on top of the board
 *
 */
@Component({
  selector: 'chrono',
  templateUrl: 'board-chrono.html',
  styleUrls: ['board-chrono.scss']
})
export class BoardChronoComponent {

  public get GameCountDown(): string { return this.gameService.GameCountDown };

  constructor(public gameService: GameService) {
  }

}
