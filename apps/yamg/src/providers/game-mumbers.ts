import {Observer} from "rxjs/Observer";
import {Observable} from "rxjs/Observable";
import {IGameDataProvider, GameTile, shuffleTiles} from "../interfaces/games-intf";


/* *********************************************************************************************************************
 *
 */
export class GameNumbersProvider implements IGameDataProvider{

  private static TextFontStyle = { "font-family":"Noto Sans", "font-size": "2.5em"};

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
        tiles[i] = new GameTile(i,'',GameNumbersProvider.TextFontStyle,null);

      let usedNumbers : Array<number> = [0];
      for (let i = 0,j = 0; i < c; i++) {
        do j = Math.floor(Math.random() * 2 * (c + 1));
        while (usedNumbers.indexOf(j) !== -1);
        tiles[i].key       = j;
        tiles[i].frontText = j.toString();
        tiles[i].frontText1= tiles[i].frontText;
        tiles[i].frontText2= tiles[i].frontText;
        tiles[i].isLetter = true;
        usedNumbers.push(j)
        }

      for (let i = 0; i < c ; i++) {
        tiles[c + i] = new GameTile(tiles[i].key, tiles[i].frontText,GameNumbersProvider.TextFontStyle,null);
        tiles[c + i].isLetter = true;
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
