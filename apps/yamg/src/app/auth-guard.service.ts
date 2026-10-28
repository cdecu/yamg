import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { GameStore } from './store/game.store';

export const authGuard: CanActivateFn = (_route, state) => {
  const store = inject(GameStore);
  const router = inject(Router);

  if (store.isAuth()) return true;

  return new RedirectCommand(router.createUrlTree(['/login']), {
    state: { url: state.url },
  });
};
