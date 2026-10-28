import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { fromEvent, map } from 'rxjs';
import { YamgSize } from './models/game-tile';

function calculateYamgSize(width: number, height: number): YamgSize {
  const cols = Math.floor(width / 80);
  let rows = Math.floor(height / 80);
  if (cols % 2 && rows % 2) rows++;
  return { rows, cols, tilesCount: cols * rows };
}

@Injectable({ providedIn: 'root' })
export class YamgLayoutService {
  readonly yamgSize = toSignal(
    fromEvent(window, 'resize').pipe(
      map(() => calculateYamgSize(window.innerWidth, window.innerHeight)),
    ),
    { initialValue: calculateYamgSize(window.innerWidth, window.innerHeight) },
  );
}
