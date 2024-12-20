import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScoresPage } from './scores';

@NgModule({
  declarations: [ScoresPage],
  imports: [IonicPageModule.forChild(ScoresPage)],
})
export class ScoresPageModule { }
