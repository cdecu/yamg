import {Component, OnInit} from '@angular/core';
import {IonicPage, NavParams } from 'ionic-angular';
import {GameService} from "../../providers/game.service";

/**
 */
@IonicPage()
@Component({
  selector: 'page-help-game',
  templateUrl: 'help-game.html',
})
export class HelpGamePage implements OnInit {

  public get gameTitle(): string {
    if (!this.gameService.selectedItem) {
      // this.navCtrl.push('HelpPage');
      return null;
      }
    return this.gameService.selectedItem.title;
    };

  constructor(public gameService: GameService, public navParams: NavParams) {
    // console.log('HelpGamePage>Constructor:',navCtrl);
    this.gameService.selectedItem = navParams.get('item');
    }

  ngOnInit(): void {
    console.log('HelpGamePage>OnInit:',this.gameService.selectedItem);
  }

}
