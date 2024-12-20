import {ErrorHandler, NgModule } from '@angular/core';
import {HttpModule} from "@angular/http";
import {BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import {SplashScreen } from '@ionic-native/splash-screen';
import {StatusBar } from '@ionic-native/status-bar';

import {MyApp } from './app.component';
import {GameService} from "../providers/game.service";

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GameService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
