import { Component } from '@angular/core';
import { NavParams} from 'ionic-angular';
import {MainPage} from "./tabs/main/main";
import {ProductPage} from "./tabs/product/product";
import {DealsPage} from "./tabs/deals/deals";
import {CartPage} from "./tabs/cart/cart";
import {CartServiceProvider} from "../../providers/cart-service/cart-service";
import {ProductServiceProvider} from "../../providers/product-service/product-service";
import {ShopListPage} from "./tabs/shop-list/shop-list";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tab1Root: any = MainPage;
  tab2Root: any = ProductPage;
  tab3Root: any = ShopListPage;
  tab4Root: any = DealsPage;
  tab5Root: any = CartPage;
  myIndex: number;
  cartCount:number = 0;
  dealsCount:number = 0;

  constructor(navParams: NavParams,private cartService:CartServiceProvider,private productService:ProductServiceProvider) {
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
    this.productService.fetchProducts().subscribe(
      res=>{
        if(res){
          this.dealsCount = res['products'].filter(function (item) {
            return item['offer'] > 0;
          }).length;
        }
      },
      err=>{
        console.log('error');
      }
    );
  }

}
