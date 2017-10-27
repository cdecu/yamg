import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";

import {IGameDataProvider, GameTile, shuffleTiles} from "../interfaces/games-intf";
import {GameService} from "./game.service";

/* *********************************************************************************************************************
 *
 */
export class GameHebrewLettersProvider implements IGameDataProvider{

  private static TextFontStyle = { "font-family":"Noto Sans", "font-size": "2em"};

  /* ..................................................................................................................
   *
   */
  constructor(private http: Http, private selection:string) {
    //console.log('Hello HebrewLetters Provider',this.selection);
  }

  /* ..................................................................................................................
   *
   */
  generateData(NbTiles:number): Observable<Array<GameTile>>{
    //console.log('Hello HebrewLetters Provider',this.selection);
    let selectedGame = this.selection;
    return this.http.get('assets/data/hebrewLetters.json')
               .map(function(res) : Array<GameTile> {
                 let tiles : GameTile[] = [];
                 let c = (NbTiles / 2);

                 for (let i = 0; i < c ; i++)
                   tiles[i] = new GameTile(i,'',GameHebrewLettersProvider.TextFontStyle,null);

                 let letters : Array<any> = res.json();
                 while (letters.length<c)
                   letters = letters.concat(letters);

                 for (let i = 0, j = 0; i < c; i++) {
                   j = Math.floor(Math.random()*letters.length);
                   let o = letters[j];
                   tiles[i].frontText = o["key"];
                   tiles[i].frontText1= o["key"];
                   tiles[i].frontText2= o["name"];
                   tiles[i].isLetter  = true;
                   letters.splice(j,1);
                 }

                 for (let i = 0; i < c ; i++) {
                   tiles[c + i] = new GameTile(tiles[i].key, tiles[i].frontText,GameHebrewLettersProvider.TextFontStyle,null);
                   tiles[c + i].frontText1 = tiles[i].frontText1;
                   tiles[c + i].frontText2 = tiles[i].frontText2;
                   if (selectedGame===GameService.GameMode_HebrewLetters2) {
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
    return this.http.get('assets/data/hebrewLetters.json')
      .map(function(res) : Array<GameTile> {
        let tiles : GameTile[] = [];
        res.json().map(
          l => {
            let g=new GameTile(0,'',null,null);
            g.frontText = l["key"];
            g.frontText1= l["key"];
            g.frontText2= l["name"];
            tiles.push(g);
          });

        return tiles;
      });
  };

}
