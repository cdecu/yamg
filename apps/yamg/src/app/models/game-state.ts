import { EntityId } from '@ngrx/signals/entities';
import { User } from './user';

export type GameState = {
  user: User;
  name: string;
  started: number;
  tilesCount: number;
  moveCount: number;
  matchesCount: number;
  countDown: string;
  firstPickId: EntityId | null;
  secondPickId: EntityId | null;
  pickEndTime: number;
  gameEndTime: number;
  showNames: boolean;
};

export const initialGameState: GameState = {
  user: { id: null },
  name: 'numbers',
  started: 0,
  tilesCount: 0,
  moveCount: 0,
  matchesCount: 0,
  countDown: '-:--',
  firstPickId: null,
  secondPickId: null,
  pickEndTime: 0,
  gameEndTime: 0,
  showNames: false,
};

export const newGameState: Partial<GameState> = {
  started: 1,
  moveCount: 0,
  matchesCount: 0,
  countDown: '-:--',
  firstPickId: null,
  secondPickId: null,
  pickEndTime: 0,
  gameEndTime: 0,
};
