import {Component, Input} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

import {GameTile} from '../../interfaces/games-intf';
import {GameService} from '../../providers/game.service';

/* *********************************************************************************************************************
  flip flap game board tile
 see https://angular.io/docs/ts/latest/guide/animations.html#!#states-and-transitions
*/
@Component({
  selector: 'board-tile',
  templateUrl: 'board-tile.html',
  styleUrls: ['board-tile.scss'],
  animations: [trigger('flipflap',
    [
    state('back, void', style({ transform: 'rotateY(180deg)' })),
    state('front', style({ transform: 'rotateY(0deg)' })),
    transition('front <=> back', [animate('0.85s ease-in')]),
    ])]
})
export class BoardTileComponent {

  private static TextFontStyle = { 'font-family': 'Noto Sans', 'font-size': '1.25em'};

  @Input() tile : GameTile;
  public get frontState(): string { return this.gameService.isOver && !this.tile.matched ? this.tile.backState : this.tile.frontState; }
  public get backState(): string { return this.gameService.isOver && !this.tile.matched ? this.tile.frontState : this.tile.backState; }
  public get frontText(): string { return this.tile.frontText; }
  public get matched(): boolean { return this.tile.matched; }
  public get isLetter(): boolean { return this.tile.isLetter; }
  public get isText(): boolean { return this.tile.isText; }

  /* ..................................................................................................................
   *
   */
  constructor(private gameService: GameService ) {
    }

  /* ..................................................................................................................
   *
   */
  public frontStyle(): object {
    if (this.tile.isText) {
      return this.tile.frontTextStyle || BoardTileComponent.TextFontStyle;
    } else {
      return this.tile.frontStyle || BoardTileComponent.TextFontStyle;
    }
  }

  /* ..................................................................................................................
   *
   */
  public Toggle(): void {
    console.log('Toggle ', this.tile);
    this.gameService.clickTile(this.tile);
  }

}
