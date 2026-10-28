import { inject, Injectable } from '@angular/core';
import { GameStore } from './store/game.store';

@Injectable({
  providedIn: 'root',
})
export class YamgAuthService {
  public readonly store = inject(GameStore);

  login(login: { email: string; password: string }): true | string {
    this.store.logIn({ id: 1, email: login.email, name: 'John Doe' });
    return true;
  }

  logout() {
    this.store.logOff();
  }
}
