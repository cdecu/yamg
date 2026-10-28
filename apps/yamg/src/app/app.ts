import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { YamgMainMenuPage, mainMenuPages, title } from './yamg-config';
import { GameStore } from './store/game.store';
import { YamgAuthService } from './yamg-auth';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';

@Component({
  imports: [
    RouterLink,
    RouterOutlet,
    MatToolbar,
    MatIcon,
    MatSidenavContainer,
    MatSidenavContent,
    MatSidenav,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
  selector: 'yamg-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public readonly title = title;
  public readonly mainMenuPages = mainMenuPages;
  public readonly store = inject(GameStore);
  private readonly auth = inject(YamgAuthService);
  private readonly router = inject(Router);
  public readonly onBoard = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects.split(/[?#]/, 1)[0] === '/board'),
    ),
    { initialValue: this.router.url.split(/[?#]/, 1)[0] === '/board' },
  );

  menuIcon(menu: YamgMainMenuPage): string {
    return menu.icon === 'logout' && !this.store.isAuth() ? 'login' : menu.icon;
  }

  menuCaption(menu: YamgMainMenuPage): string {
    return menu.icon === 'logout' && !this.store.isAuth() ? 'login' : menu.caption;
  }

  authAction(): void {
    if (this.store.isAuth()) {
      this.auth.logout();
      void this.router.navigateByUrl('/home');
      return;
    }
    void this.router.navigateByUrl('/login');
  }

  restart(): void {
    this.store.restartGame();
  }
}
