import {Component} from '@angular/core';
import {GameService} from '../../providers/game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.page.html',
  styleUrls: ['./board.page.scss']
})
export class BoardPage {

  public get isOver(): boolean { return this.gameService.isOver; }

  constructor(public gameService: GameService) {
  }

}
