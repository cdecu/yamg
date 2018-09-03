import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {GameTile} from '../../interfaces/games-intf';
import {GameService} from '../../providers/game.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'board',
  templateUrl: './board-playground.html',
  styleUrls: ['./board-playground.scss']
})
export class GameBoardComponent implements OnInit {

  tiles$ : Observable<Array<GameTile>>;

  constructor(private route: ActivatedRoute, public gameService: GameService) {

  }

  ngOnInit(): void {
    console.log('GameBoardPage>OnInit');
      // If we navigated to this page, we will have an item available as a nav param
      this.route.params.subscribe((data: any) => {
        console.log('Params', data);
        this.gameService.selectedItem = data;
        this.tiles$ = this.gameService.tiles$;
      });
  }

}
