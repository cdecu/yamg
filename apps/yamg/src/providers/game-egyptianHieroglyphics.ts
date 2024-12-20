import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";

import {IGameDataProvider, GameTile, shuffleTiles} from "../interfaces/games-intf";
import {GameService} from "./game.service";

/* *********************************************************************************************************************
 *
 */
export class GameEgyptianHierosProvider implements IGameDataProvider{

  private static TextFontStyle = { "font-family":"NewGardiner","font-size": "2.5em"};

  /* ..................................................................................................................
   *
   */
  constructor(private http: Http, private selection:string) {
    //console.log('Hello GreekLetters Provider',this.selection);
  }

  /* ..................................................................................................................
   *
   */
  generateData(NbTiles:number): Observable<Array<GameTile>>{
    // console.log('Hello GreekLetters Provider',this.selection);
    let selectedGame = this.selection;
    return this.http.get('assets/data/egyptianHieros.json')
      .map(function(res) : Array<GameTile> {
        let tiles : GameTile[] = [];
        let c = (NbTiles / 2);

        for (let i = 0; i < c ; i++)
          tiles[i] = new GameTile(i,'',GameEgyptianHierosProvider.TextFontStyle,null);

        let letters : Array<any> = res.json();
        while (letters.length<c)
          letters = letters.concat(letters);

        for (let i = 0, j = 0; i < c; i++) {
          j = Math.floor(Math.random()*letters.length);
          let o = letters[j];
          // let k : string = o["key"];
          let c = parseInt(o["key"]);
          let s = String.fromCodePoint(c);
          tiles[i].frontText = s;
          tiles[i].frontText1= s;
          tiles[i].frontText2= o["name"];
          tiles[i].isLetter  = true;
          letters.splice(j,1);
        }

        for (let i = 0; i < c ; i++) {
          tiles[c + i] = new GameTile(tiles[i].key, tiles[i].frontText,GameEgyptianHierosProvider.TextFontStyle,null);
          tiles[c + i].frontText1 = tiles[i].frontText1;
          tiles[c + i].frontText2 = tiles[i].frontText2;
          if (selectedGame===GameService.GameMode_EgyptianHiero2) {
            tiles[c + i].frontText  = tiles[i].frontText2;
            tiles[c + i].isLetter   = false;
          }else {
            tiles[c + i].frontText  = tiles[i].frontText1;
            tiles[c + i].isLetter   = true;
          } }

        shuffleTiles(tiles);

        return tiles;
      });
  };

  /* ..................................................................................................................
   *
   */
  generateAllData(): Observable<Array<GameTile>>{
    // console.log('Hello GreekLetters Provider',this.selection);
    return this.http.get('assets/data/egyptianHieros.json')
      .map(function(res) : Array<GameTile> {
        let tiles : GameTile[] = [];
        res.json().map(
          l => {
            let c = parseInt(l["key"]);
            let s = String.fromCodePoint(c);
            let g=new GameTile(0,'',null,null);
            g.frontText = s;
            g.frontText1= s;
            g.frontText2= l["name"];
            tiles.push(g);
          });

        return tiles;
      });
  };

}
