import {Observer} from "rxjs/Observer";
import {Observable} from "rxjs/Observable";
import {IGameDataProvider, GameTile, shuffleTiles} from "../interfaces/games-intf";


/* *********************************************************************************************************************
 *
 */
export class GameNumbersProvider implements IGameDataProvider{

  /* ..................................................................................................................
   *
   */
  constructor() {
    console.log('Hello GameNumbers Provider');
    }


  /* ..................................................................................................................
   *
   */
  generateData(NbTiles:number): Observable<Array<GameTile>>{
    return new Observable<Array<GameTile>>((observer: Observer<Array<GameTile>>) => {
      // console.log('Build Tiles$:',NbTiles);
      let tiles : GameTile[] = [];
      let c = (NbTiles / 2);
      for (let i = 0; i < c ; i++)
        tiles[i] = new GameTile(i,'',null,null);

      let usedNumbers : Array<number> = [0];
      for (let i = 0,j = 0; i < c; i++) {
        do j = Math.floor(Math.random() * 2 * (c + 1));
        while (usedNumbers.indexOf(j) !== -1);
        tiles[i].key       = j;
        tiles[i].frontText = j.toString();
        tiles[i].frontText1= tiles[j].frontText;
        tiles[i].frontText2= tiles[j].frontText;
        tiles[i].isLetter = true;
        usedNumbers.push(j)
        }

      for (let i = 0; i < c ; i++) {
        tiles[c + i] = new GameTile(tiles[i].key, tiles[i].frontText,null,null);
        }

      shuffleTiles(tiles);
      observer.next(tiles);
      observer.complete();
      });
    }

  /* ..................................................................................................................
   *
   */
  generateAllData(): Observable<Array<GameTile>>{
    return null;
  };

}
