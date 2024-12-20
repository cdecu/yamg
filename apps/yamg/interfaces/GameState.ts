export type GameState = {
  name: string;
  started: number;
  tilesCount: number;
  moveCount: number;
  matchesCount: number;
  // remainingSec
  countDown: string;
};
export const initialGameState: GameState = {
  name: 'numbers',
  started: 0,
  tilesCount: 48,
  moveCount: 0,
  matchesCount: 0,
  countDown: '-:--',
};
