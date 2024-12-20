import {Component, OnInit} from '@angular/core';
import {IonicPage, NavParams } from 'ionic-angular';
import {GameService} from "../../providers/game.service";
import {GameTile} from "../../interfaces/games-intf";
import {Observable} from "rxjs/Observable";

/* *********************************************************************************************************************
 *
 */
@IonicPage()
@Component({
  selector: 'page-help-game',
  templateUrl: 'help-game.html',
})
export class HelpGamePage implements OnInit {

  private allTiles$ : Observable<Array<GameTile>>;
  public get gameTitle(): string { return this.gameService.selectedItem.title; };

  /* ..................................................................................................................
   *
   */
  constructor(public gameService: GameService, public navParams: NavParams) {
    // console.log('HelpGamePage>Constructor:',navCtrl);
    this.gameService.selectedItem = navParams.get('item');
    }

  /* ..................................................................................................................
   *
   */
  ngOnInit(): void {
    // console.log('HelpGamePage>OnInit:',this.gameService.selectedItem);
    this.allTiles$ = this.gameService.allTiles$;
  }

}
