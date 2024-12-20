import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {HelpGamePage} from "./help-game";

@NgModule({
  declarations: [
    HelpGamePage,
  ],
  imports: [
    IonicPageModule.forChild(HelpGamePage),
  ],
  exports: [
    HelpGamePage
  ]
})
export class HelpGamePageModule {}
