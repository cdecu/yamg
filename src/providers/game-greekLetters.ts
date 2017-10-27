import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";

import {IGameDataProvider, GameTile, shuffleTiles} from "../interfaces/games-intf";

export class GameGreekLettersProvider implements IGameDataProvider{

  private static TextFontStyle = { "font-family":"Serif","font-size": "1.25em"};

  constructor(private http: Http, private selection:string) {
    //console.log('Hello GreekLetters Provider',this.selection);
    }

  generateData(NbTiles:number): Observable<Array<GameTile>>{
    // console.log('Hello GreekLetters Provider',this.selection);
    let selectedGame = this.selection;
    return this.http.get('assets/data/greekLetters.json')
        .map(function(res) : Array<GameTile> {
          let tiles : GameTile[] = [];
          let c = (NbTiles / 2);

          for (let i = 0; i < c ; i++)
            tiles[i] = new GameTile(i,'',GameGreekLettersProvider.TextFontStyle);

          let dispoLetters : Array<string> = res.json();
          let letters = Object.keys(dispoLetters);
          while (letters.length<c)
            letters = letters.concat(letters);

          for (let i = 0, j = 0; i < c; i++) {
            j = Math.floor(Math.random()*letters.length);
            let o = letters[j];
            tiles[i].frontText1= o;
            tiles[i].frontText2= dispoLetters[o].title;
            tiles[i].frontText = tiles[i].frontText1;
            tiles[i].isLetter  = true;
            letters.splice(j,1);
            }

          for (let i = 0; i < c ; i++) {
            tiles[c + i] = new GameTile(tiles[i].key, tiles[i].frontText,GameGreekLettersProvider.TextFontStyle);
            tiles[c + i].frontText1 = tiles[i].frontText1;
            tiles[c + i].frontText2 = tiles[i].frontText2;
            if (selectedGame==='GreekLetters') {
              tiles[c + i].frontText  = tiles[i].frontText1;
              tiles[c + i].isLetter   = true;
            }else {
              tiles[c + i].frontText  = tiles[i].frontText2;
              tiles[c + i].isLetter   = false;
            } }

          shuffleTiles(tiles);

          return tiles;
          });
    };

}
