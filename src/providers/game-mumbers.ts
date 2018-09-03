import {Observable, Observer} from 'rxjs';
import {GameTile, IGameDataProvider, shuffleTiles} from '../interfaces/games-intf';


/* *********************************************************************************************************************
 *
 */
export class GameNumbersProvider implements IGameDataProvider {

  private static TextFontStyle = { 'font-family': 'Noto Sans', 'font-size': '2.5em'};

  /* ..................................................................................................................
   *
   */
  constructor() {
    console.log('Hello GameNumbers Provider');
    }


  /* ..................................................................................................................
   *
   */
  generateData(NbTiles: number): Observable<Array<GameTile>> {
    return new Observable<Array<GameTile>>((observer: Observer<Array<GameTile>>) => {
      // console.log('Build Tiles$:', NbTiles);
      const tiles : GameTile[] = [];
      const c : number = Math.trunc(NbTiles / 2);
      for (let i = 0; i < c ; i++) {
        tiles[i] = new GameTile(i,  i.toString(), GameNumbersProvider.TextFontStyle, null);
        tiles[i].isLetter = true;
      }

      for (let i = 0; i < c ; i++) {
        tiles[c + i] = new GameTile(tiles[i].key, tiles[i].frontText, GameNumbersProvider.TextFontStyle, null);
        tiles[c + i].isLetter = true;
        }
      // tiles.map((t:GameTile)=> console.log('txt',t.key));
      // console.log(tiles);
      shuffleTiles(tiles);
      // console.log(tiles);
      // tiles.map((t:GameTile)=> console.log('txt',t.key,t));
      observer.next(tiles);
      observer.complete();
      });
    }

  /* ..................................................................................................................
   *
   */
  generateAllData(): Observable<Array<GameTile>> {
    return null;
  }

}
