import { Component } from '@angular/core';
import { IGame } from '../../interfaces/games-intf';
import { Router } from '@angular/router';
import { GameService } from '../../providers/game.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage {

  public get items(): Array<IGame> { return this.gameService.games; }

  constructor(private router: Router, private gameService: GameService) {
  }

  /* *********************************************************************************************************************
   * Goto wanted game
   */
  itemTapped(event, item) {
    this.router.navigate(['/HelpPage' , item]);
  }

}
