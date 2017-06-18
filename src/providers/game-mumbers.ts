import {Observer} from "rxjs/Observer";
import {Observable} from "rxjs/Observable";
import {IGameDataProvider, GameTile, shuffleTiles, IGameItem} from "../interfaces/games-intf";


/**
 *
 */
export class GameNumbersProvider implements IGameDataProvider{

  /**
   *
   * @param selection
   */
  constructor(private selection:string) {
    console.log('Hello GameNumbers Provider');
    }

  /**
   *
   */
  getData(): Observable<Array<IGameItem>>{
    return null;
    }

  /**
   *
   * @param NbTiles
   * @returns {Observable<Array<GameTile>>|"../../Observable".Observable<Array<GameTile>>|"../../../Observable".Observable<Array<GameTile>>}
   */
  generateData(NbTiles:number): Observable<Array<GameTile>>{
    let t$ = new Observable<Array<GameTile>>((observer: Observer<Array<GameTile>>) => {
      console.log('Build Tiles$:',NbTiles);
      let tiles : GameTile[] = [];
      let c = (NbTiles / 2);
      for (let i = 0; i < c ; i++)
        tiles[i] = new GameTile(i,'');

      let usedNumbers : Array<number> = [0];
      for (let i = 0,j = 0; i < c; i++) {
        do j = Math.floor(Math.random() * 2 * (c + 1));
        while (usedNumbers.indexOf(j) !== -1);
        tiles[i].frontText = j.toString();
        tiles[i].isLetter = true;
        usedNumbers.push(j)
        }

      for (let i = 0; i < c ; i++) {
        tiles[c + i] = new GameTile(tiles[i].key, tiles[i].frontText);
        tiles[c + i].isLetter = true;
        }

      shuffleTiles(tiles);
      observer.next(tiles);
      observer.complete();
      });
    return t$;
    }

}
