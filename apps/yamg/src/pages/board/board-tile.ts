import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgClass } from '@angular/common';
import { YamgGameService } from '../../app/yamg-game.service';
import { GameTile } from '../../../interfaces/GameTile';

/* *********************************************************************************************************************
  flip flap game board tile
 see https://angular.io/docs/ts/latest/guide/animations.html#!#states-and-transitions
*/
@Component({
  selector: 'yamg-board-tile',
  templateUrl: './board-tile.html',
  styleUrl: './board-tile.scss',
  animations: [
    trigger('flip-flap', [
      state('back, void', style({ transform: 'rotateY(180deg)' })),
      state('front', style({ transform: 'rotateY(0deg)' })),
      transition('front <=> back', [animate('0.85s ease-in')]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass],
})
export class BoardTileComponent {
  readonly tile = input.required<GameTile>();
  public readonly yamgGame = inject(YamgGameService);

  public flipFlapState(baseClass: string): string {
    const tile = this.tile();
    if (baseClass === 'back') {
      return tile.flipped ? 'front' : 'back';
    } else {
      return tile.flipped ? 'back' : 'front';
    }
  }
  public flipFlapClasses(baseClass: string): string[] {
    const classes: string[] = [];
    classes.push(baseClass === 'back' ? 'flip-card-back' : 'flip-card-front');
    const tile = this.tile();
    if (tile?.matched) classes.push('matched');
    return classes;
  }

  public Toggle(): void {
    const tile = this.tile();
    // console.log('BoardTileComponent. Toggle ', tile);
    this.yamgGame.clickTile(tile);
  }
}
