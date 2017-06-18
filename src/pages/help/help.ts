import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GameService} from "../../providers/game.service";
import {IGame} from "../../interfaces/games-intf";

/**
 * Generated class for the HelpPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {

  public get items(): Array<IGame> { return this.gameService.games};

  constructor(public navCtrl: NavController, public navParams: NavParams, private gameService: GameService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpPage');
  }

  /* *********************************************************************************************************************
   * Goto wanted game
   */
  itemTapped(event, item) {
    this.navCtrl.push('HelpGamePage', {item: item});
  }

}
