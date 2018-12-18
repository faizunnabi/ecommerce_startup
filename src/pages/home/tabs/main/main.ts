import {Component, ViewChild} from '@angular/core';
import {Content, NavController} from 'ionic-angular';
import {ProductListPage} from "../../../product-list/product-list";
import {ShopPage} from "../shop/shop";

@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {
  constructor(public navCtrl: NavController) {
  }

  public goToShop(event,item)
  {
    this.navCtrl.push(ShopPage,{
      item:item
    });
  }
}
