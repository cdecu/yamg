import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";

import {GameTile} from "../../interfaces/games-intf";
import {GameService} from "../../providers/game.service";


@Component({
  selector: 'board',
  templateUrl: 'board.html',
})
export class GameBoardComponent implements OnInit {

  tiles$ : Observable<Array<GameTile>>;

  constructor(public gameService: GameService) {

  }

  ngOnInit(): void {
    //console.log('GameBoardPage>OnInit:',this.gameService.selectedItem);
    this.tiles$ = this.gameService.tiles$;
  }

}
