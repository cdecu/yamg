import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { GameTile } from '../../app/models/game-tile';
import { GameStore } from '../../app/store/game.store';
import { games } from '../../app/yamg-config';

/* *********************************************************************************************************************
  flip flap game board tile
 see https://angular.io/docs/ts/latest/guide/animations.html#!#states-and-transitions
*/
@Component({
  selector: 'yamg-board-tile',
  templateUrl: './board-tile.html',
  styleUrl: './board-tile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardTileComponent {
  readonly tile = input.required<GameTile>();
  public readonly store = inject(GameStore);
  public readonly fontFamily = computed(
    () => games.find((game) => game.id === this.store.name())?.fontFamily ?? null,
  );
  public readonly showName = computed(
    () => this.store.showNames() && this.store.name() !== 'numbers' && !!this.tile().name,
  );

  public Toggle(): void {
    this.store.clickTile(this.tile());
  }
}
