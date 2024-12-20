import {Component, ViewChild} from '@angular/core';
import {MenuController, Nav, Platform} from 'ionic-angular';
import {StatusBar } from '@ionic-native/status-bar';
import {SplashScreen } from '@ionic-native/splash-screen';

import {GameService} from "../providers/game.service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  // rootPage:any = HomePage;
  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform,public statusBar: StatusBar,public splashScreen: SplashScreen,public menu: MenuController,public gameBoard: GameService) {

    // set our app's pages to be displaied in the Menu
    this.pages = [
      {title: 'Games',  component: 'HomePage'  },
      {title: 'Scores', component: 'ScoresPage'},
      {title: 'Help',   component: 'HelpPage'  }
      ];

    this.initializeApp();
  }

  /** ******************************************************************************************************************
   *
   */
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.hide();
      this.splashScreen.hide();
      this.gameBoard.recalcBoard(this.platform);
      this.nav.setRoot('HomePage');
      });

    this.platform.resize.subscribe(() => {

      // Cordova app comes out from the background.
      if (this.gameBoard.recalcBoard(this.platform))
        this.restartGame();
      else
        this.menu.close();

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
    this.nav.setRoot(page.component);
  }

  /** ******************************************************************************************************************
   *
   */
  restartGame() {
    console.log('restartGame');
    this.nav.popToRoot({});
  }

}

