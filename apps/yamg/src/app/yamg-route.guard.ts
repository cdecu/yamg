import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  CanActivate,
  GuardResult,
  MaybeAsync,
  RouterStateSnapshot,
} from '@angular/router';
import { GameStore } from '../../interfaces/GameStore';

@Injectable({
  providedIn: 'root',
})
export class YamgRouteGuard implements CanActivate {
  public readonly store = inject(GameStore);
  private readonly router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    if (!this.store.isAuth()) {
      console.log('YamgRouteGuard>login', route, state);
      return this.router.navigate(['/login'], {
        queryParams: route.queryParams,
        state: { url: state.url, queryParams: route.queryParams },
      });
    }

    switch (state.url) {
      case '/login':
      case '/logout':
        console.log('YamgRouteGuard>logout', route, state);
        this.store.logOff();
        return this.router.navigate(['/home']);
    }

    console.log('YamgRouteGuard', route, state);
    return true;
  }
}
