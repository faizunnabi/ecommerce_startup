import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {CartServiceProvider} from "../../../../providers/cart-service/cart-service";

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html'
})
export class CartPage {

  cart_items:any;
  cart_total:number = 0;
  constructor(public navCtrl: NavController,private cartService:CartServiceProvider) {

  }

  ionViewDidEnter()
  {
    this.cartService.getAllProducts().subscribe(
      res=>{
        //console.log('from cart');
        console.log(res);
        this.cart_items = res;
        for(var i =0;i<res.length;i++)
        {
          //console.log('from cart');
          console.log(res[i]);
          this.cart_total  += res[i]['product']['price'] * 1;
        }
      }
    )
  }

}
