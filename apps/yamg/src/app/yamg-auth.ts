import { inject, Injectable } from '@angular/core';
import { YamgGameService } from './yamg-game.service';

@Injectable({
  providedIn: 'root',
})
export class YamgAuthService {
  public readonly store = inject(YamgGameService);

  login(login: { email: string; password: string }) {
    console.log('YamgAuthService.login', login);
    if (false) {
      return 'Login failed !!!!';
    }
    this.store.login({ id: 1, email: login.email, name: 'John Doe' });
    return true;
  }

  logout() {
    // console.log('YamgAuthService.logout');
    this.store.logout();
  }
}
