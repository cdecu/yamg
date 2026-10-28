import { EntityId } from '@ngrx/signals/entities';

export type YamgSize = { rows: number; cols: number; tilesCount: number };

export type GameTile = {
  id: EntityId;
  key: string;
  name: string;
  frontText: string;
  flipped: boolean;
  matched: boolean;
};

export function newGameTile(id: number): GameTile {
  const name = id.toString();
  return { id, key: name, name, frontText: name, flipped: false, matched: false };
}
