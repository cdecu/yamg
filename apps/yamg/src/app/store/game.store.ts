import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  removeAllEntities,
  setAllEntities,
  updateAllEntities,
  withEntities,
} from '@ngrx/signals/entities';
import { games, gameTimeSpanSec, pickTimeSpanSec } from '../yamg-config';
import { buildTiles, loadGameSymbols, shuffleTiles } from '../game/tiles';
import { GameTile, YamgSize } from '../models/game-tile';
import { initialGameState, newGameState } from '../models/game-state';
import { User } from '../models/user';

const mismatchVisibleMs = 666;

function formatCountdown(milliseconds: number): string {
  const secondsRemaining = Math.max(0, Math.ceil(milliseconds / 1000));
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = (secondsRemaining % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

export const GameStore = signalStore(
  { providedIn: 'root' },
  withState(initialGameState),
  withEntities<GameTile>(),
  withComputed((store) => ({
    isAuth: computed(() => store.user().id !== null),
    gameStarted: computed(() => store.started() !== 0),
    gameOver: computed(() => store.started() === 0),
    gameCountDown: computed(() => store.countDown()),
    remainingMatches: computed(() => store.tilesCount() / 2 - store.matchesCount()),
  })),
  withMethods((store) => {
    let gameTimer: ReturnType<typeof setInterval> | undefined;
    let startRequestId = 0;

    const clearTimer = () => {
      if (gameTimer !== undefined) clearInterval(gameTimer);
      gameTimer = undefined;
    };

    const stopGame = () => {
      startRequestId++;
      clearTimer();
      patchState(
        store,
        {
          started: 0,
          countDown: '-:--',
          gameEndTime: 0,
          firstPickId: null,
          secondPickId: null,
          pickEndTime: 0,
        },
        updateAllEntities({ flipped: true }),
      );
    };

    const finishGame = () => {
      clearTimer();
      patchState(
        store,
        {
          started: 0,
          gameEndTime: 0,
          firstPickId: null,
          secondPickId: null,
          pickEndTime: 0,
        },
        updateAllEntities({ flipped: true, matched: true }),
      );
    };

    const startTimer = () => {
      if (gameTimer !== undefined) return;
      gameTimer = setInterval(() => {
        const now = Date.now();
        const gameEndTime = store.gameEndTime();

        if (gameEndTime > 0 && now >= gameEndTime) {
          patchState(store, { countDown: '0:00' });
          stopGame();
          return;
        }

        const pickEndTime = store.pickEndTime();
        if (pickEndTime > 0 && now >= pickEndTime) {
          const pickedIds = [store.firstPickId(), store.secondPickId()];
          patchState(
            store,
            {
              firstPickId: null,
              secondPickId: null,
              pickEndTime: 0,
            },
            updateAllEntities((tile) => (pickedIds.includes(tile.id) ? { flipped: false } : {})),
          );
        }

        if (gameEndTime > 0) {
          patchState(store, { countDown: formatCountdown(gameEndTime - now) });
        }
      }, 250);
    };

    return {
      logIn(user: User) {
        patchState(store, { user });
      },
      logOff() {
        patchState(store, { user: { id: null } });
      },
      setShowNames(showNames: boolean) {
        patchState(store, { showNames });
      },
      async startGame(selectedGame: string, yamgSize: YamgSize) {
        const requestId = ++startRequestId;
        clearTimer();
        const gameId = games.some((game) => game.id === selectedGame) ? selectedGame : 'numbers';
        const symbols = await loadGameSymbols(gameId);
        if (requestId !== startRequestId) return;
        const activeGame = symbols.length > 0 ? gameId : 'numbers';
        const tiles = buildTiles(symbols, yamgSize);
        patchState(
          store,
          newGameState,
          { name: activeGame, tilesCount: yamgSize.tilesCount, yamgSize },
          setAllEntities(tiles),
        );
      },
      restartGame() {
        startRequestId++;
        clearTimer();
        const tiles = store.entities().map((tile) => ({ ...tile, flipped: false, matched: false }));
        shuffleTiles(tiles);
        patchState(store, newGameState, setAllEntities(tiles));
      },
      stopGame,
      leaveGame() {
        stopGame();
        patchState(store, { tilesCount: 0, moveCount: 0, matchesCount: 0 }, removeAllEntities());
      },
      clickTile(tile: GameTile) {
        if (!store.gameStarted()) return;
        const currentTile = store.entities().find((candidate) => candidate.id === tile.id);
        if (!currentTile || currentTile.flipped || currentTile.matched) return;

        const now = Date.now();
        const firstPickId = store.firstPickId();
        if (firstPickId === null) {
          let gameEndTime = store.gameEndTime();
          if (gameEndTime === 0) {
            gameEndTime = now + gameTimeSpanSec * 1000;
            patchState(store, { gameEndTime, countDown: formatCountdown(gameEndTime - now) });
          }
          patchState(
            store,
            { firstPickId: currentTile.id, pickEndTime: now + pickTimeSpanSec * 1000 },
            updateAllEntities((candidate) =>
              candidate.id === currentTile.id ? { flipped: true } : {},
            ),
          );
          startTimer();
          return;
        }

        if (store.secondPickId() !== null) return;
        const firstTile = store.entities().find((candidate) => candidate.id === firstPickId);
        if (!firstTile) {
          patchState(store, { firstPickId: null, pickEndTime: 0 });
          return;
        }

        const pickedIds = [firstTile.id, currentTile.id];
        if (firstTile.key === currentTile.key) {
          const matchesCount = store.matchesCount() + 1;
          patchState(
            store,
            {
              moveCount: store.moveCount() + 1,
              matchesCount,
              firstPickId: null,
              secondPickId: null,
              pickEndTime: 0,
            },
            updateAllEntities((candidate) =>
              pickedIds.includes(candidate.id) ? { flipped: true, matched: true } : {},
            ),
          );
          if (matchesCount >= store.tilesCount() / 2) finishGame();
          return;
        }

        patchState(
          store,
          {
            moveCount: store.moveCount() + 1,
            secondPickId: currentTile.id,
            pickEndTime: now + mismatchVisibleMs,
          },
          updateAllEntities((candidate) =>
            pickedIds.includes(candidate.id) ? { flipped: true } : {},
          ),
        );
      },
    };
  }),
  withHooks((store) => ({
    onDestroy() {
      store.stopGame();
    },
  })),
);
