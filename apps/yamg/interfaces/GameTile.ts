import { EntityId } from '@ngrx/signals/entities';

export type YamgSize = { rows: number; cols: number; tilesCount: number };
export const InitialYamgSize: YamgSize = { rows: 8, cols: 6, tilesCount: 48 };

export type GameTile = {
  id: EntityId;
  key: string;
  frontText: string;
  flipped: boolean;
  matched: boolean;
};

export function newGameTile(id: number) {
  return { id, key: id.toString(), frontText: id.toString(), flipped: false, matched: false };
}
