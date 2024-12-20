import { inject, Injectable, OnDestroy } from '@angular/core';
import { interval, Subscription, takeWhile } from 'rxjs';
import { GameTile, InitialYamgSize, YamgSize } from '../../interfaces/GameTile';
import { GameStore } from '../../interfaces/GameStore';
import { YamgConfigService } from './yamg-config';

@Injectable({
  providedIn: 'root',
})
export class YamgGameService implements OnDestroy {
  public yamgSize = InitialYamgSize;
  public readonly yamgConfig = inject(YamgConfigService);
  public readonly store = inject(GameStore);

  private gameTimer$?: Subscription = undefined;
  private gameTimeSpanSec = 5;
  private gameEndTime = 0;

  private pickTimeSpanSec = 5;
  private pickEndTime = 0;
  private firstPick?: GameTile = undefined;
  private secondPick?: GameTile = undefined;

  constructor() {
    console.log('YamgStoreService Hello.');
  }

  ngOnDestroy() {
    console.log('YamgStoreService Destroy.');
    this.stopGameTimer();
  }

  //region ** Game Start , Stop, ...
  /**
   * Start a new game.
   * - Build the tiles
   * - Reset game counters
   * @param selectedGame
   * @param yamgSize
   */
  startGame(selectedGame: string, yamgSize: YamgSize) {
    console.log('YamgStoreService. Start Game', selectedGame, yamgSize);
    this.stopGameTimer();
    this.clearPickedTiles();
    this.yamgSize = yamgSize;
    this.store.startGame(selectedGame, yamgSize, this.yamgConfig.buildTiles(selectedGame, yamgSize));
  }
  restartGame() {
    console.log('YamgStoreService. Restart Game');
    this.stopGameTimer();
    this.clearPickedTiles();
    this.store.restartGame();
  }
  stopGame() {
    console.log('YamgStoreService. Stop Game');
    this.stopGameTimer();
    this.clearPickedTiles();
    this.store.stopGame();
  }
  clickTile(tile: GameTile) {
    // start game timer if not yet started
    if (!this.store.gameStarted()) {
      console.log('Game not started yet');
      return;
    }

    // start game timer if not yet started
    if (!this.gameTimer$) this.startGameTimer();

    // check dbl click
    if (!tile || tile.flipped || tile.matched || this.firstPick === tile) {
      console.log('Double click on firstPick ?', tile);
      return;
    }

    // first tile
    if (!this.firstPick) {
      console.log('First Pick ! Turn On and Wait for the second pick', tile);
      this.startPickTimout(tile);
      this.store.clickFirstTile(tile);
      return;
    }

    // second tile
    this.secondPick = tile;
    if (this.firstPick.key === this.secondPick.key) {
      console.log('Second pick is matched !');
      // if (this.store.remainingMatches() === 1) {
      console.log('Game Win ');
      this.clearPickedTiles();
      this.stopGameTimer();
      this.store.winGame();
      return;
      // }
      // this.store.matchTiles(this.firstPick, this.secondPick);
      // this.clearPickedTiles();
      // return;
    }

    console.log('Second pick is mismatched !', this.firstPick, 'mismatched', this.secondPick);
    this.store.clickSecondTile(this.firstPick, this.secondPick);
    this.cancelPickedTiles();
    return;
  }
  //endregion

  //region ** Game Timer
  /**
   * Game Over Timer. Start on first tile click.
   */
  public stopGameTimer(): void {
    this.gameTimer$?.unsubscribe();
    this.gameTimer$ = undefined;
  }
  public startGameTimer(): void {
    this.stopGameTimer();
    this.gameTimeSpanSec = this.yamgConfig.gameTimeSpanSec;
    this.gameEndTime = Date.now() + this.gameTimeSpanSec * 1000;
    this.gameTimer$ = interval(1000)
      .pipe(
        takeWhile(() => {
          const now = Date.now();
          if (now > this.gameEndTime) {
            this.gameTimout();
            return false;
          }
          if (this.firstPick || this.secondPick) {
            if (now > this.pickEndTime) {
              this.pickTimout();
              return true;
            }
          }
          console.log('Game Timer', (this.gameEndTime - now) / 24 / 60);
          return true;
        }),
      )
      .subscribe(() => this.store.updateGameCountDown(this.gameEndTime, this.gameTimeSpanSec));
  }
  private gameTimout(): void {
    this.gameTimer$ = undefined;
    this.gameEndTime = Date.now();
    this.stopGame();
  }
  //endregion

  //region ** Game Pick Timer
  /**
   * Game Pick Second choice timeout
   */
  private clearPickedTiles() {
    this.firstPick = undefined;
    this.secondPick = undefined;
  }
  private startPickTimout(tile: GameTile) {
    this.firstPick = tile;
    this.secondPick = undefined;
    this.pickTimeSpanSec = this.yamgConfig.pickTimeSpanSec;
    this.pickEndTime = Date.now() + this.pickTimeSpanSec * 1000;
  }
  private cancelPickedTiles() {
    this.firstPick = undefined;
    this.pickEndTime = Date.now() + 666;
  }
  private pickTimout(): void {
    console.log('Pick Timer ! Mismatched or Too late');
    this.pickEndTime = Date.now();
    this.firstPick = undefined;
    this.secondPick = undefined;
    this.store.pickTimout();
  }
  //endregion
}
