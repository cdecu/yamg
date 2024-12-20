import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { YamgConfigService } from '../../app/yamg-config';
import { BoardTileComponent } from './board-tile';
import { YamgGameService } from '../../app/yamg-game.service';
import { GameStore } from '../../../interfaces/GameStore';

@Component({
  imports: [MatGridList, MatGridTile, BoardTileComponent],
  templateUrl: './board.html',
  styleUrl: './board.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardPageComponent {
  private readonly router = inject(Router);
  public readonly yamgConfig = inject(YamgConfigService);
  public readonly yamgGame = inject(YamgGameService);
  public readonly store = inject(GameStore);

  constructor() {
    const nav = this.router.getCurrentNavigation();
    const selectedGame: string = nav?.finalUrl?.queryParams?.['game'] || 'numbers';
    effect(() => {
      const yamgSize = this.yamgConfig.yamgSize();
      console.log('BoardPageComponent. Start Game', selectedGame, yamgSize);
      this.yamgGame.startGame(selectedGame, yamgSize);
    });
  }
}
