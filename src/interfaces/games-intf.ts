import {Observable} from "rxjs/Observable";

/* *********************************************************************************************************************
 */
export interface IGame {
  key: string,
  title: string,
  icon: string
}
/* *********************************************************************************************************************
 */
export interface IGameItem {
  key: string,
  title: string,
  icon: string
}

/* *********************************************************************************************************************
 flip flap game board tile
 */
export class GameTile {

  private _isLetter = true;
  public get isLetter(): boolean {return this._isLetter;};
  public set isLetter(value: boolean) {this._isLetter=value;};
  public get isText(): boolean {return !this._isLetter;};

  public frontText1 = '';
  public frontText2 = '';
  public turnedOn   = false;
  public frontState = 'back';
  public backState  = 'front';
  public matched    = false;

  constructor(public key : number, public frontText : string) {
    this.frontText1=this.frontText;
    this.frontText2=this.frontText;
    this._isLetter=(this.frontText.length<=1);
    }

  public turnOn(): void {
    this.frontState='front';
    this.backState='back';
    this.turnedOn=true;
  }

  public turnDown(): void {
    this.frontState='back';
    this.backState='front';
    this.turnedOn=false;
    this.matched=false;
  }
  public delayedTurnDown(): void {
    this.frontState='delayedback';
    this.backState='delayedfront';
    this.turnedOn=false;
    this.matched=false;
  }

  public match(): void {
    if ((!this._isLetter)&&(this.frontText1!==this.frontText2))
      this.frontText=this.frontText1+' '+this.frontText2;
    this.frontState='front';
    this.backState='back';
    this.turnedOn=true;
    this.matched=true;
  }

}

// ..................................................................................................................
/**
 * IGameDataProvider
 */
export interface IGameDataProvider {
  getData(): Observable<Array<IGameItem>>;
  generateData(NbTiles:number): Observable<Array<GameTile>>;
}

/* *********************************************************************************************************************
 * shuffle tiles ...
 */
export function shuffleTiles(tiles:GameTile[]): void {
  console.log('GameService shuffleTiles');
  for (let i = tiles.length - 1; i > 0; i--) {
    let j    = Math.floor(Math.random() * (i + 1));
    let temp = tiles[i];
    tiles[i] = tiles[j];
    tiles[j] = temp;
  }
}

