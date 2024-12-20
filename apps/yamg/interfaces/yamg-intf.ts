export class xGameTile {
  private readonly _idx: number = 0;
  private readonly _frontText: string = '';
  private _isLetter = true;
  private _flipped = false;
  private _matched = false;

  public get idx(): number {
    return this._idx;
  }
  public get frontText(): string {
    return this._frontText;
  }
  public get isLetter(): boolean {
    return this._isLetter;
  }
  public set isLetter(value: boolean) {
    this._isLetter = value;
  }
  public get isText(): boolean {
    return !this._isLetter;
  }

  public get flipped(): boolean {
    return this._flipped;
  }
  public set flipped(value: boolean) {
    console.log('set', this.idx, 'flipped', value);
    this._flipped = value;
  }

  public get matched(): boolean {
    return this._matched;
  }
  public set matched(value: boolean) {
    this._matched = value;
    // if (!this._isLetter && this.frontText1 !== this.frontText2)
    //   this.frontText = this.frontText1 + ' ' + this.frontText2;
    // this.frontState = 'front';
    // this.backState = 'back';
    // this.turnedOn = true;
  }

  constructor(i: number) {
    this._idx = i;
    this._frontText = i.toString();
    this._isLetter = this._frontText.length <= 1;
  }
}
