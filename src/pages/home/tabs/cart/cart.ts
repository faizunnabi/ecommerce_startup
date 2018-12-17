import { Component } from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {CartServiceProvider} from "../../../../providers/cart-service/cart-service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
  animations:[
    trigger('editMode',[
      state('edit_inactive',style({
        "height":"100%",
        "bottom":"0px"
      })),
      state('edit_active',style({
        "height":"0",
        "bottom":"-200px"
      })),
      transition('edit_inactive<=>edit_active', animate('300ms'))
    ])
  ]
})
export class CartPage {
  cart_total:number = 0;
  cart_items:any = [];
  edit_mode:boolean = false;
  //edit_state = 'edit_inactive';
  constructor(public navCtrl: NavController,private cartService:CartServiceProvider,private toastCtrl: ToastController) {

  }

  ionViewWillEnter()
  {
    this.cartService.getAllProducts().subscribe(
      res=>{
        this.cart_total= 0;
        this.cart_items = res['products'];
        for(var i =0;i<res['products'].length;i++)
        {
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
    //this.edit_state = this.edit_state == 'edit_active' ? 'edit_inactive':'edit_active';
  }

  remove_item(id)
  {
    this.cartService.removeProduct(id);
  }

}
