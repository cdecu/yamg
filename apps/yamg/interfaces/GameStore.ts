import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { initialGameState } from './GameState';
import { computed } from '@angular/core';
import { setAllEntities, updateAllEntities, withEntities } from '@ngrx/signals/entities';
import { GameTile, YamgSize } from './GameTile';

export const GameStore = signalStore(
  { providedIn: 'root' },
  withState(initialGameState),
  withEntities<GameTile>(),
  withComputed((store) => ({
    gameStarted: computed(() => store.started() !== 0),
    gameOver: computed(() => store.started() === 0),
    gameCountDown: computed(() => store.countDown()),
    remainingMatches: computed(() => store.tilesCount() / 2 - store.matchesCount()),
  })),
  withMethods((store) => ({
    startGame(selectedGame: string, yamgSize: YamgSize, tiles: GameTile[]) {
      console.log('GameStore. Start Game', selectedGame, yamgSize, tiles);
      patchState(
        store,
        initialGameState,
        { name: selectedGame, tilesCount: yamgSize.tilesCount, started: 1 },
        setAllEntities(tiles),
      );
    },
    stopGame() {
      console.log('GameStore. Stop Game', store.name());
      patchState(store, { started: 0 }, updateAllEntities({ flipped: true }));
    },
    winGame() {
      console.log('GameStore. Win Game', store.name());
      patchState(store, { started: 0 }, updateAllEntities({ flipped: true, matched: true }));
    },
    clickFirstTile(firstPick: GameTile) {
      // console.log('GameStore. Click Tile');
      patchState(
        store,
        updateAllEntities((t) => {
          if (t.id == firstPick.id) return { flipped: true };
          return { flipped: t.matched };
        }),
      );
    },
    clickSecondTile(firstPick: GameTile, secondPick: GameTile) {
      // console.log('GameStore. Click Tile');
      patchState(
        store,
        updateAllEntities((t) => {
          if (t.id == firstPick.id || t.id == secondPick.id) return { flipped: true };
          return { flipped: t.matched };
        }),
      );
    },
    matchTiles(firstPick: GameTile, secondPick: GameTile) {
      // console.log('GameStore. Match Tiles');
      patchState(
        store,
        () => {
          const moveCount = store.moveCount() + 1;
          const matchesCount = store.matchesCount() + 1;
          return { moveCount, matchesCount };
        },
        updateAllEntities((t) => {
          if (t.id == firstPick.id || t.id == secondPick.id) return { flipped: true, matched: true };
          return { flipped: t.matched };
        }),
      );
    },
    updateGameCountDown(pickEndTime: number, pickTimeSpanSec: number) {
      const diff = (pickEndTime - Date.now() - pickTimeSpanSec * 60) / 1000;
      const minutes = (diff / 60) | 0;
      const seconds = diff % 60 | 0;
      patchState(store, { countDown: minutes + ':' + seconds });
    },
    pickTimout() {
      patchState(
        store,
        updateAllEntities((t) => ({ flipped: t.matched })),
      );
    },
  })),
);