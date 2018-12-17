import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {MainPage} from "./tabs/main/main";
import {ProductPage} from "./tabs/product/product";
import {ShopPage} from "./tabs/shop/shop";
import {DealsPage} from "./tabs/deals/deals";
import {CartPage} from "./tabs/cart/cart";
import {CartServiceProvider} from "../../providers/cart-service/cart-service";

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
  cartCount:number = 0;

  constructor(navParams: NavParams,private cartService:CartServiceProvider) {
    // Set the active tab based on the p
    //   tab1Root: any = MainPage;assed index from menu.ts
    this.myIndex = navParams.get('index') || 0;
    this.cartService.CartState.subscribe(
      res=>{
        console.log(res);
        if(res)
        {
          this.cartCount = res.products.length;
        }

      }
    )
  }

}
