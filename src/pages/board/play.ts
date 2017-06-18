import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from "ionic-angular";

import {GameService} from "../../providers/game.service";

@IonicPage()
@Component({
  selector: 'play',
  templateUrl: 'play.html',
})
export class PlayPage  {
  
  constructor(public gameService: GameService, public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.gameService.selectedItem = navParams.get('item');
    }

}
