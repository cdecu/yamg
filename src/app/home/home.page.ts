import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {IGame} from '../../interfaces/games-intf';
import {GameService} from '../../providers/game.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public get items(): Array<IGame> { return this.gameService.games; }

  constructor(private router: Router, private gameService: GameService) {
  }

  /* *********************************************************************************************************************
   * Goto wanted game
   */
  itemTapped(event, item) {
    this.router.navigate(['/BoardPage' , item]);
  }

}
