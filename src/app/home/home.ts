import {Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {GameService} from "../../providers/game.service";
import {IGame} from "../../interfaces/games-intf";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public get items(): Array<IGame> { return this.gameService.games};

  constructor(public navCtrl: NavController, public navParams: NavParams, private gameService: GameService) {
  }

  /* *********************************************************************************************************************
   * Goto wanted game
   */
  itemTapped(event, item) {
    this.navCtrl.push('PlayPage', {item: item});
  }
}

