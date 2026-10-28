import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  input,
} from '@angular/core';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { BoardTileComponent } from './board-tile';
import { GameStore } from '../../app/store/game.store';
import { YamgLayoutService } from '../../app/yamg-layout';

@Component({
  imports: [MatGridList, MatGridTile, BoardTileComponent],
  templateUrl: './board.html',
  styleUrl: './board.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardPageComponent {
  public readonly store = inject(GameStore);
  public readonly yamgLayout = inject(YamgLayoutService);
  public readonly game = input<string | undefined>();
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.destroyRef.onDestroy(() => this.store.leaveGame());
    effect(() => {
      this.store.startGame(this.game() || 'numbers', this.yamgLayout.yamgSize());
    });
  }
}
