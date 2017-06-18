import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Platform} from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import {GameNumbersProvider} from "./game-mumbers";
import {GameGreekLettersProvider} from "./game-greekLetters";
import {GameHebrewLettersProvider} from "./game-hebrewLetters";
import {GameTile, IGame, IGameDataProvider} from "../interfaces/games-intf";

/* *********************************************************************************************************************
 flip flap game board tile
 */
@Injectable()
export class GameService {

  public games: Array<IGame>;

  private NbTiles               = 9;
  private timeoutID?: number    = undefined;
  private UnMatchedPairs        = 0;
  private isOver                = false;
  private matches               = 0;
  private moves                 = 0;
  private firstPick?: GameTile  = undefined;
  private secondPick?: GameTile = undefined;

  public selectedItem: IGame;


  /* *********************************************************************************************************************
   * Ionic make me singleton iff
   */
  constructor(private http: Http) {
    console.log('Hello GameService Provider');
    this.games = [
        {key: 'Numbers', title: 'Random Numbers', icon: 'flask'}
      , {key: 'GreekLetters', title: 'Greek Letters', icon: 'bluetooth'}
      , {key: 'GreekLeeterVsName', title: 'Greek Letters vs Latin Name', icon: 'bluetooth'}
      , {key: 'HebrewLetters', title: 'Hebrew Letters', icon: 'wifi'}
      , {key: 'HebrewLetterVsName', title: 'Hebrew Letters vs Latin Name', icon: 'wifi'}
      , {key: 'Phone Numbers', title: 'Contacts Phone Numbers', icon: 'boat'}
      , {key: 'Contacts', title: 'Contacts Phone Numbers vs Image', icon: 'boat'}
    ];
    }

  public get tiles$(): Observable<Array<GameTile>> {
    console.log('Build Tiles:',this.NbTiles);
    let dataProvider : IGameDataProvider = this.getdataProvider();
    let t$ = dataProvider.generateData(this.NbTiles);
    return t$;
    }

  /* *********************************************************************************************************************
   * Prepare tiles according to ...
   */
  public recalcBoard(platform: Platform): boolean {
    console.log('GameService recalcBoard Platform width:',platform.width(),'height:',platform.height());
    // Must match css board padding : .5px; + board-tile flex: 1 0 79.5px
    let NbCols = Math.floor(platform.width()  / 80.00);
    let NbRows = Math.floor(platform.height() / 80.00);
    if ((NbCols % 2)&&(NbRows % 2)) NbRows++;
    let Nb = NbCols*NbRows;
    if (this.NbTiles === Nb) {
      console.log('Keep NbRows',NbRows,'NbCols',NbCols,'Tiles',Nb);
      return false;
      }
    console.log('NbRows',NbRows,'NbCols',NbCols,'Tiles',Nb);
    this.NbTiles = Nb;
    this.resetGame();
    return true;
  }

  /* *********************************************************************************************************************
   * New Game, Reset counters
   */
  private resetGame(): void {
    console.log('Reset Game Tiles:',this.NbTiles);
    this.isOver = false;
    this.moves = 0;
    this.matches = 0;
    this.firstPick = undefined;
    this.secondPick = undefined;
    this.UnMatchedPairs = this.NbTiles / 2;
    clearTimeout(this.timeoutID);
    this.timeoutID=undefined;
    }


  /* *********************************************************************************************************************
   * shuffle tiles ...
   */
  public getdataProvider(): IGameDataProvider{
    let s = 'GreekLetters';
    if (this.selectedItem){
      s=this.selectedItem.key || 'GreekLetters';
      }
    //console.log('getdataProvider',s);
    switch(s) {
      case 'GreekLetters':
      case 'GreekLetterVsName':
        return new GameGreekLettersProvider(this.http,s);
      case 'HebrewLetters':
      case 'HebrewLetterVsName':
        return new GameHebrewLettersProvider(this.http,s);
      case 'Numbers':
        return new GameNumbersProvider(s);
      }
    return new GameGreekLettersProvider(this.http,s);
    }

  /* *********************************************************************************************************************
   * Toggle clicked tile ...
   */
  public clickTile(tile: GameTile): void {

    if (this.secondPick) {
      console.log('TurnDown previous missmatch');
      let dblClick = (this.firstPick === tile) || (this.secondPick === tile);
      this.firstPick.turnDown();
      this.secondPick.turnDown();
      this.firstPick = undefined;
      this.secondPick = undefined;
      if (dblClick)
        return;
      }

    if (!tile || tile.turnedOn || (this.firstPick === tile) ) {
      console.log('Double click on firstPick ?');
      return;
      }

    if (!this.firstPick) {
      console.log('first Pick ! Turn On and Wait for the second pick');
      this.firstPick = tile;
      this.startTimeOut();
      tile.turnOn();
      return;
      }

    if (this.firstPick.key != tile.key) {
      console.log('Second pick is missmatched !');
      this.secondPick = tile;
      this.startTimeOut();
      tile.turnOn();
      this.moves++;
      return;
      }

    console.log('match ! ',this.UnMatchedPairs);
    this.moves++;
    this.matches++;
    this.UnMatchedPairs--;
    this.firstPick.match();
    this.firstPick = undefined;
    this.secondPick = undefined;
    clearTimeout(this.timeoutID);
    this.timeoutID=undefined;
    tile.match();
    if (!this.UnMatchedPairs)
      this.gameWin();
    return
    }

  /* *********************************************************************************************************************
   * TurnDown missmathed
   */
  public startTimeOut(): void {
    clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout(() => {
      if (this.firstPick) this.firstPick.turnDown();
      if (this.secondPick) this.secondPick.turnDown();
      this.firstPick  = undefined;
      this.secondPick = undefined;
      }, 5000);
    }

  /* *********************************************************************************************************************
   * Game Win
   */
  public gameWin(): void {
    console.log('gameWin !')
    }

  /* *********************************************************************************************************************
   * Game Win
   */
  public gameOver(): void {
    console.log('gameOver !')
    }

  }
