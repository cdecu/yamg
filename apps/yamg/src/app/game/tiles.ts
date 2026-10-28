import { GameTile, newGameTile, YamgSize } from '../models/game-tile';
import { games } from '../yamg-config';

export type GameSymbol = { name: string; key: string };

const symbolsCache = new Map<string, Promise<GameSymbol[]>>();

function convertCodePoint(key: string): string {
  if (!/^0x[\da-f]+$/i.test(key)) return key;
  const codePoint = Number.parseInt(key.slice(2), 16);
  return codePoint <= 0x10ffff ? String.fromCodePoint(codePoint) : key;
}

export function loadGameSymbols(gameId: string): Promise<GameSymbol[]> {
  const cachedSymbols = symbolsCache.get(gameId);
  if (cachedSymbols) return cachedSymbols;

  const dataUrl = games.find((game) => game.id === gameId)?.dataUrl;
  if (!dataUrl) return Promise.resolve([]);

  const symbolsPromise = fetch(dataUrl)
    .then((response) => {
      if (!response.ok) throw new Error(`Failed to load game data: ${response.status}`);
      return response.json() as Promise<GameSymbol[]>;
    })
    .then((symbols) => {
      if (!Array.isArray(symbols)) throw new Error('Invalid game data');
      const validSymbols = symbols.filter(
        (symbol) =>
          typeof symbol?.name === 'string' &&
          typeof symbol.key === 'string' &&
          symbol.key.length > 0,
      );
      if (validSymbols.length === 0) throw new Error('Game data contains no symbols');
      return validSymbols.map((symbol) => ({ ...symbol, key: convertCodePoint(symbol.key) }));
    })
    .catch(() => {
      symbolsCache.delete(gameId);
      return [];
    });

  symbolsCache.set(gameId, symbolsPromise);
  return symbolsPromise;
}

export function buildTiles(symbols: GameSymbol[], yamgSize: YamgSize): GameTile[] {
  const tiles = Array.from({ length: yamgSize.tilesCount }, (_, index) => newGameTile(index));
  const pairCount = tiles.length / 2;
  const availableSymbols =
    symbols.length > 0
      ? [...symbols]
      : Array.from({ length: pairCount * 2 }, (_, index) => ({ name: '', key: index.toString() }));
  shuffleSymbols(availableSymbols);

  for (let i = 0; i < pairCount; i++) {
    const symbol = availableSymbols[i % availableSymbols.length];
    const frontText = symbol.key;
    const name = symbol.name || frontText;
    const key = `pair-${i}`;
    const firstTile = tiles[i];
    const secondTile = tiles[pairCount + i];

    firstTile.key = key;
    firstTile.name = name;
    firstTile.frontText = frontText;
    secondTile.key = key;
    secondTile.name = name;
    secondTile.frontText = frontText;
  }

  shuffleTiles(tiles);
  return tiles;
}

function shuffleSymbols(symbols: GameSymbol[]): void {
  for (let i = symbols.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [symbols[i], symbols[j]] = [symbols[j], symbols[i]];
  }
}

export function shuffleTiles(tiles: GameTile[]): void {
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
}
