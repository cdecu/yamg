import { inject, Injectable } from '@angular/core';
import { GameStore } from '../../interfaces/GameStore';

@Injectable({
  providedIn: 'root',
})
export class YamgAuthService {
  public readonly store = inject(GameStore);

  login(login: { email: string; password: string }): true | string {
    console.log('YamgAuthService.login', login, 'isAuth:', this.store.isAuth());
    this.store.logIn({ id: 1, email: login.email, name: 'John Doe' });
    return true;
  }

  logout() {
    console.log('YamgAuthService.logout', 'isAuth:', this.store.isAuth());
    this.store.logOff();
  }
}
