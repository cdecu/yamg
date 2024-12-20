import { User } from './User';

export type GameState = {
  user: User;
  name: string;
  started: number;
  tilesCount: number;
  moveCount: number;
  matchesCount: number;
  // remainingSec
  countDown: string;
};
export const initialGameState: GameState = {
  user: { id: null },
  name: 'numbers',
  started: 0,
  tilesCount: 48,
  moveCount: 0,
  matchesCount: 0,
  countDown: '-:--',
};
export const newGameState: Partial<GameState> = {
  started: 1,
  moveCount: 0,
  matchesCount: 0,
  countDown: '-:--',
};
