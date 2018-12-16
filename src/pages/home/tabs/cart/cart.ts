import { Component } from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {CartServiceProvider} from "../../../../providers/cart-service/cart-service";

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html'
})
export class CartPage {
  cart_total:number = 0;
  cart_items:any = [];
  edit_mode:boolean = false;
  constructor(public navCtrl: NavController,private cartService:CartServiceProvider,private toastCtrl: ToastController) {

  }

  ionViewDidLoad()
  {
    this.cartService.getAllProducts().subscribe(
      res=>{
        console.log('from cart');
        this.cart_total= 0;
        console.log(res);
        this.cart_items = res['products'];
        for(var i =0;i<res['products'].length;i++)
        {
          //console.log('from cart');
          console.log(res['products'][i]);
          this.cart_total  += res['products'][i]['product']['price'] * res['products'][i]['quantity'];
        }
      }
    )
  }

  ionViewDidLeave()
  {
    this.edit_mode = false;
  }

  incQuantity(id,q)
  {
    if(q >= 1){
      if(this.cartService.addQuantity(id)){
        this.toastCtrl.create({
          message: 'Product quantity updated',
          duration: 3000,
          showCloseButton:true
        }).present();
      }
    }

  }

  decQuantity(id,q) {
    if (q > 1) {
      if (this.cartService.minusQuantity(id)) {
        this.toastCtrl.create({
          message: 'Product quantity updated',
          duration: 3000,
          showCloseButton: true
        }).present();
      }
    }
  }

  enterEditMode()
  {
    this.edit_mode === false ? this.edit_mode=true : this.edit_mode=false;
  }

  remove_item(id)
  {
    this.cartService.removeProduct(id);
  }

}
