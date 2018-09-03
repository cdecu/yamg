import {Component, ViewChild} from '@angular/core';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {GameService} from '../providers/game.service';
import {MenuController, Platform} from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public appPages: Array<{ title : string, url : string, icon? : string }>;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    public menu: MenuController,
    public gameBoard: GameService,
    private statusBar: StatusBar
  ) {

    // set our app's pages to be displaied in the Menu
    this.appPages = [
      {title: 'Games',  url: '/'          , icon: 'games'},
      {title: 'Scores', url: '/ScoresPage'},
      {title: 'Help',   url: '/HelpPage'  }
    ];

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.hide();
      this.splashScreen.hide();
      this.gameBoard.recalcBoard(this.platform);
    });

    this.platform.resize.subscribe(() => {

      // Cordova app comes out from the background.
      console.log('platform.resize');
      if (this.gameBoard.recalcBoard(this.platform)) {
        this.restartGame();
      } else {
        this.menu.close();
      }

    });

  }

  /** ******************************************************************************************************************
   *
   * @param page
   */
  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    // this.nav.setRoot(page.component);
  }

  /** ******************************************************************************************************************
   *
   */
  restartGame() {
    console.log('restartGame');
    // this.nav.popToRoot({});
  }


}
