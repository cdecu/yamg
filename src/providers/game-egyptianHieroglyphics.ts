import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";

import {IGameDataProvider, GameTile, shuffleTiles} from "../interfaces/games-intf";

export class GameEgyptianHierosProvider implements IGameDataProvider{

  private static TextFontStyle = { "font-family":"NewGardiner,\"Noto Sans\"","font-size": "1.25em"};

  constructor(private http: Http, private selection:string) {
    //console.log('Hello GreekLetters Provider',this.selection);
  }

  generateData(NbTiles:number): Observable<Array<GameTile>>{
    // console.log('Hello GreekLetters Provider',this.selection);
    let selectedGame = this.selection;
    return this.http.get('assets/data/egyptianHieros.json')
      .map(function(res) : Array<GameTile> {
        let tiles : GameTile[] = [];
        let c = (NbTiles / 2);

        for (let i = 0; i < c ; i++)
          tiles[i] = new GameTile(i,'',GameEgyptianHierosProvider.TextFontStyle);

        let letters : Array<any> = res.json();
        while (letters.length<c)
          letters = letters.concat(letters);

        for (let i = 0, j = 0; i < c; i++) {
          j = Math.floor(Math.random()*letters.length);
          let o = letters[j];
          let c = parseInt(o["code"]);
          let s = String.fromCodePoint(c);
          tiles[i].key = o["key"];
          tiles[i].frontText1= s;
          tiles[i].frontText2= o["name"];
          tiles[i].frontText = s;
          tiles[i].isLetter  = true;
          letters.splice(j,1);
        }

        for (let i = 0; i < c ; i++) {
          tiles[c + i] = new GameTile(tiles[i].key, tiles[i].frontText,GameEgyptianHierosProvider.TextFontStyle);
          tiles[c + i].frontText1 = tiles[i].frontText1;
          tiles[c + i].frontText2 = tiles[i].frontText2;
          if (selectedGame==='EgyptianHiero2') {
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

}
