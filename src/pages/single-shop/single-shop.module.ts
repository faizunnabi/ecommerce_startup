import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SingleShopPage } from './single-shop';

@NgModule({
  declarations: [
    SingleShopPage,
  ],
  imports: [
    IonicPageModule.forChild(SingleShopPage),
  ],
})
export class SingleShopPageModule {}
