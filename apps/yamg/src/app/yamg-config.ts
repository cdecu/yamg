import { inject, Injectable, OnDestroy, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { fromEvent, map, Observable } from 'rxjs';
import { title as appTitle } from '../../../../package.json';
import { GameTile, InitialYamgSize, newGameTile, YamgSize } from '../../interfaces/GameTile';

export interface YamgMainMenuPage {
  icon: string;
  caption: string;
  url: string;
}

export interface YamgGameDef {
  id: string;
  title: string;
  icon: string;
}

@Injectable({
  providedIn: 'root',
})
export class YamgConfigService implements OnDestroy {
  private readonly platform = inject(PLATFORM_ID);
  private _dummy$?: Observable<{ width: number; height: number }> = undefined;
  public readonly title = appTitle;
  public readonly gameTimeSpanSec = 30 * 60;
  public readonly pickTimeSpanSec = 5;
  public readonly yamgSize = signal(InitialYamgSize);

  public readonly mainMenuPages: YamgMainMenuPage[] = [
    { caption: 'Games', icon: 'home', url: '/home' },
    { caption: 'Scores', icon: 'scoreboard', url: '/scores' },
    { caption: 'Help', icon: 'help', url: '/help' },
    { caption: 'logOff', icon: 'logout', url: '/logout' },
  ];

  public readonly games: YamgGameDef[] = [
    { id: 'numbers', title: 'Random Numbers', icon: 'infinite' },
    { id: 'greek1', title: 'Greek Letters', icon: 'bluetooth' },
    { id: 'egyptian1', title: 'Egyptian Hieroglyph', icon: 'wifi' },
  ];

  constructor() {
    console.log('>YamgConfigService Hello. Platform:', this.platform);
    if (isPlatformBrowser(this.platform)) {
      // console.log('YamgConfigService Browser. Listen to window resize');
      this.calcYamgSize({ width: window.innerWidth, height: window.innerHeight });
      this._dummy$ = fromEvent(window, 'resize').pipe(
        map(() => {
          return { width: window.innerWidth, height: window.innerHeight };
        }),
      );
      this._dummy$.subscribe((size) => this.calcYamgSize(size));
    }
  }

  ngOnDestroy() {
    console.log('<YamgConfigService Goodbye');
  }

  calcYamgSize(size: { width: number; height: number }) {
    const cols = Math.floor(size.width / 80.0);
    let rows = Math.floor(size.height / 80.0);
    if (cols % 2 && rows % 2) rows++;
    const tilesCount = cols * rows;
    console.log('.Window size', size.width, 'x', size.height, 'NbRows', rows, 'NbCols', cols, 'Tiles', tilesCount);
    this.yamgSize.set({ rows, cols, tilesCount });
  }

  public buildTiles(selectedGame: string, yamgSize: YamgSize) {
    const tiles: GameTile[] = [];
    const tilesCount = yamgSize.tilesCount;
    for (let i = 0; i < tilesCount; i++) {
      const tile = newGameTile(i);
      tiles.push(tile);
    }

    switch (selectedGame) {
      case 'numbers':
      default:
        this.generateNumbers(tiles);
        break;
    }

    // this.shuffleTiles(tiles);
    return tiles;
  }

  private generateNumbers(tiles: GameTile[]) {
    const c = tiles.length / 2;
    const usedNumbers: Array<number> = [0];
    for (let i = 0, j = 0; i < c; i++) {
      do j = Math.floor(Math.random() * 2 * (c + 1));
      while (usedNumbers.indexOf(j) !== -1);
      usedNumbers.push(j);
      const key = j.toString();
      const txt = j.toString();
      tiles[i].key = key;
      tiles[i].frontText = txt;
      tiles[c + i].key = key;
      tiles[c + i].frontText = txt;
    }
  }

  private shuffleTiles(tiles: GameTile[]) {
    for (let i = tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = tiles[i];
      tiles[i] = tiles[j];
      tiles[j] = temp;
    }
  }
}
