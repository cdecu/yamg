import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {GameTile, IGameDataProvider, shuffleTiles} from '../interfaces/games-intf';
import {consts} from '../environments/consts';

/* *********************************************************************************************************************
 *
 */
export class GameEgyptianHierosProvider implements IGameDataProvider {

  private static TextFontStyle = { 'font-family': 'NewGardiner', 'font-size': '2.5em'};

  /* ..................................................................................................................
   *
   */
  constructor(private http: HttpClient, private selection: string) {
    // console.log('Hello GreekLetters Provider',this.selection);
  }

  /* ..................................................................................................................
   *
   */
  generateData(NbTiles: number): Observable<Array<GameTile>> {
    // console.log('Hello GreekLetters Provider',this.selection);
    const selectedGame = this.selection;
    return this.http.get<Array<any>>('assets/data/egyptianHieros.json')
        .pipe(
            map( (letters) => {
              const c = (NbTiles / 2);
              const tiles : GameTile[] = [];

              for (let i = 0; i < c ; i++) {
                tiles[i] = new GameTile(i, '', GameEgyptianHierosProvider.TextFontStyle, null);
              }

              while (letters.length < c) {
                letters = letters.concat(letters);
              }

              for (let i = 0, j = 0; i < c; i++) {
                j = Math.floor(Math.random() * letters.length);
                const o = letters[j];
                // let k : string = o["key"];
                const k = Number(o['key']);
                const s = String.fromCodePoint(k);
                tiles[i].frontText  = s;
                tiles[i].frontText1 = s;
                tiles[i].frontText2 = o['name'];
                tiles[i].isLetter   = true;
                letters.splice(j, 1);
              }

              for (let i = 0; i < c ; i++) {
                tiles[c + i] = new GameTile(tiles[i].key, tiles[i].frontText, GameEgyptianHierosProvider.TextFontStyle, null);
                tiles[c + i].frontText1 = tiles[i].frontText1;
                tiles[c + i].frontText2 = tiles[i].frontText2;
                if (selectedGame === consts.GameMode_EgyptianHiero2) {
                  tiles[c + i].frontText  = tiles[i].frontText2;
                  tiles[c + i].isLetter   = false;
                } else {
                  tiles[c + i].frontText  = tiles[i].frontText1;
                  tiles[c + i].isLetter   = true;
                } }

              shuffleTiles(tiles);

              return tiles;
            })
        );
  }

  /* ..................................................................................................................
   *
   */
  generateAllData(): Observable<Array<GameTile>> {
    // console.log('Hello GreekLetters Provider',this.selection);
    return this.http.get<Array<any>>('assets/data/egyptianHieros.json')
        .pipe(
            map( (letters) => {
              const tiles : GameTile[] = [];
              letters.map(
                l => {
                  const c = Number(l['key']);
                  const s = String.fromCodePoint(c);
                  const g = new GameTile(0, '', null, null);
                  g.frontText  = s;
                  g.frontText1 = s;
                  g.frontText2 = l['name'];
                  tiles.push(g);
                });
              return tiles;
            })
        );
    }

}
