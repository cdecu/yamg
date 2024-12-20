import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { YamgConfigService, YamgMainMenuPage } from './yamg-config';
import { MatDividerModule } from '@angular/material/divider';
import { YamgGameService } from './yamg-game.service';

@Component({
  imports: [
    RouterModule,
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
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public readonly yamgConfig = inject(YamgConfigService);
  public readonly store = inject(YamgGameService);

  private authEffect = effect(() => {
    console.log(`authEffect: ${this.store.isAuth()}`);
  });

  menuIcon(menu: YamgMainMenuPage): string {
    switch (menu.icon) {
      case 'login':
      case 'logout':
        return this.store.isAuth() ? 'logout' : 'login';
      default:
        return menu.icon;
    }
  }
  menuCaption(menu: YamgMainMenuPage): string {
    switch (menu.icon) {
      case 'login':
      case 'logout':
        return this.store.isAuth() ? 'logout' : 'login';
      default:
        return menu.caption;
    }
  }
}
