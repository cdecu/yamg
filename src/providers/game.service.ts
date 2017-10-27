import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Platform} from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import {GameNumbersProvider} from "./game-mumbers";
import {GameGreekLettersProvider} from "./game-greekLetters";
import {GameHebrewLettersProvider} from "./game-hebrewLetters";
import {GameTile, IGame, IGameDataProvider} from "../interfaces/games-intf";
import {GameEgyptianHierosProvider} from "./game-egyptianHieroglyphics";

/* *********************************************************************************************************************
 flip flap game board tile
 */
@Injectable()
export class GameService {

  private static GameStartMsg   = 'Click to Start';
  private static GameLostMsg    = 'Click to Start';
  public games: Array<IGame>;

  private NbTiles               = 9;
  private UnMatchedPairs        = 0;
  private matches               = 0;
  private moves                 = 0;
  private GameTimer?: number    = undefined;
  public  GameStartTime?: any   = null;
  public  GameCountDown: string = GameService.GameStartMsg;
  public  isOver                = false;

  private PickTimer?: number  = undefined;
  private firstPick?: GameTile  = undefined;
  private secondPick?: GameTile = undefined;

  public selectedItem: IGame;


  /* *********************************************************************************************************************
   * Ionic make me singleton iff
   */
  constructor(private http: Http) {
    console.log('Hello GameService Provider !');
    this.games = [
        {key: 'Numbers'       , title: 'Random Numbers'                 , icon: 'infinite'   }
      , {key: 'GreekLetters1' , title: 'Greek Letters'                  , icon: 'bluetooth'  }
      , {key: 'GreekLeeters2' , title: 'Greek Letters vs Latin Name'    , icon: 'bluetooth'  }
      , {key: 'HebrewLetters1', title: 'Hebrew Letters'                 , icon: 'wifi'       }
      , {key: 'HebrewLetters2', title: 'Hebrew Letters vs Name'         , icon: 'wifi'       }
      , {key: 'EgyptianHiero1', title: 'Egyptian Hieroglyph'            , icon: 'plane'      }
      , {key: 'EgyptianHiero2', title: 'Egyptian Hieroglyph vc Name'    , icon: 'plane'      }
      , {key: 'Phone Numbers' , title: 'Contacts Phone Numbers'         , icon: 'person'     }
      , {key: 'Contacts'      , title: 'Contacts Phone Numbers vs Image', icon: 'boat'       }
    ];
    }

  public get tiles$(): Observable<Array<GameTile>> {
    this.resetGame();
    console.log('Build Tiles:',this.NbTiles);
    let dataProvider : IGameDataProvider = this.getdataProvider();
    return dataProvider.generateData(this.NbTiles);
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

    this.GameCountDown=GameService.GameStartMsg;
    this.GameStartTime=null;
    clearTimeout(this.GameTimer);
    this.GameTimer=undefined;

    clearTimeout(this.PickTimer);
    this.PickTimer=undefined;
    }


  /* *********************************************************************************************************************
   * shuffle tiles ...
   */
  public getdataProvider(): IGameDataProvider{
    let s = 'EgyptianHiero1';
    if (this.selectedItem){
      s=this.selectedItem.key || 'GreekLetters';
      }
    //console.log('getdataProvider',s);
    switch(s) {
      case 'GreekLetters1':
      case 'GreekLetters2':
        return new GameGreekLettersProvider(this.http,s);
      case 'HebrewLetters1':
      case 'HebrewLetters2':
        return new GameHebrewLettersProvider(this.http,s);
      case 'EgyptianHiero1':
      case 'EgyptianHiero2':
        return new GameEgyptianHierosProvider(this.http,s);
      case 'Numbers':
        return new GameNumbersProvider();
      }
    return new GameNumbersProvider();
    }


/* *********************************************************************************************************************
 * Toggle clicked tile ...
 */
  public clickTile(tile: GameTile): void {

    if (!this.GameTimer) {
      this.startGameTimer();
    }

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
      this.startPickTimeOut();
      tile.turnOn();
      return;
      }

    if (this.firstPick.key != tile.key) {
      console.log('Second pick is missmatched !');
      this.secondPick = tile;
      this.startPickTimeOut();
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
    clearTimeout(this.PickTimer);
    this.PickTimer=undefined;
    tile.match();
    if (!this.UnMatchedPairs)
      this.gameWin();
    return
    }

  /* *********************************************************************************************************************
   * Second Pick TimeOut
   */
  public startPickTimeOut(): void {
    clearTimeout(this.PickTimer);
    this.PickTimer = setTimeout(() => {
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
    console.log('gameWin !');
    clearTimeout(this.GameTimer);
    this.GameCountDown = "WIN !! in " + this.GameCountDown;
    this.GameTimer=undefined;
    this.isOver=true;
    }

  /* *********************************************************************************************************************
   * Game Win
   */
  public gameOver(): void {
    console.log('gameOver !');
    clearTimeout(this.GameTimer);
    this.GameCountDown = GameService.GameLostMsg;
    this.GameTimer=undefined;
    this.isOver=true;
    }

  /* *********************************************************************************************************************
   * Second Pick TimeOut
   */
  public startGameTimer(): void {
    clearTimeout(this.GameTimer);
    this.GameStartTime =  new Date();
    this.GameTimer = setInterval(() => {
      const duration = 5*60;
      const diff = duration - (((Date.now() - this.GameStartTime) / 1000) | 0);
      if (diff<0) {
        this.gameOver();
      } else {
        const minutes = (diff / 60) | 0;
        const seconds = (diff % 60) | 0;
        this.GameCountDown = minutes + ":" + seconds;
      }
    }, 1000);
  }

}
