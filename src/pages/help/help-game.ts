import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams } from 'ionic-angular';
import {GameService} from "../../providers/game.service";
import {IGameDataProvider,IGameItem} from "../../interfaces/games-intf";
import {Observable} from "rxjs/Observable";

/**
 */
@IonicPage()
@Component({
  selector: 'page-help-game',
  templateUrl: 'help-game.html',
})
export class HelpGamePage implements OnInit {

  items$ : Observable<Array<IGameItem>>;
  public get gameTitle(): string {
    if (!this.gameService.selectedItem) {
      // this.navCtrl.push('HelpPage');
      return null;
      }
    return this.gameService.selectedItem.title;
    };
  // public get items(): Observable(Array<string> {
  //   let dataProvider : IGameDataProvider = this.gameService.getdataProvider();
  //
  //   return this.gameService.games
  //   };

  constructor(public gameService: GameService, public navCtrl: NavController, public navParams: NavParams) {
    console.log('HelpGamePage>Constructor:');
    this.gameService.selectedItem = navParams.get('item');
    }

  ngOnInit(): void {
    console.log('HelpGamePage>OnInit:',this.gameService.selectedItem);
    let dataProvider : IGameDataProvider = this.gameService.getdataProvider();
    this.items$ = dataProvider.getData();
  }

  ionViewDidLoad() {
    console.log('HelpGamePage>ionViewDidLoad');
  }

}
