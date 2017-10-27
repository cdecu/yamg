import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";

import {IGameDataProvider, GameTile, shuffleTiles} from "../interfaces/games-intf";

export class GameHebrewLettersProvider implements IGameDataProvider{

  constructor(private http: Http, private selection:string) {
    //console.log('Hello HebrewLetters Provider',this.selection);
  }

  generateData(NbTiles:number): Observable<Array<GameTile>>{
    //console.log('Hello HebrewLetters Provider',this.selection);
    let s = this.selection;
    return this.http.get('assets/data/hebrewLetters.json')
               .map(function(res) : Array<GameTile> {
                 let tiles : GameTile[] = [];
                 let c = (NbTiles / 2);
                 for (let i = 0; i < c ; i++)
                   tiles[i] = new GameTile(i,'',null);

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
                   tiles[c + i] = new GameTile(tiles[i].key, tiles[i].frontText,null);
                   tiles[c + i].frontText1 = tiles[i].frontText1;
                   tiles[c + i].frontText2 = tiles[i].frontText2;
                   if (s==='HebrewLetters') {
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
