import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {MainPage} from "./tabs/main/main";
import {ProductPage} from "./tabs/product/product";
import {ShopPage} from "./tabs/shop/shop";
import {DealsPage} from "./tabs/deals/deals";
import {CartPage} from "./tabs/cart/cart";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tab1Root: any = MainPage;
  tab2Root: any = ProductPage;
  tab3Root: any = ShopPage;
  tab4Root: any = DealsPage;
  tab5Root: any = CartPage;
  myIndex: number;

  constructor(navParams: NavParams) {
    // Set the active tab based on the p
    //   tab1Root: any = MainPage;assed index from menu.ts
    this.myIndex = navParams.data.tabIndex || 0;
  }

}
