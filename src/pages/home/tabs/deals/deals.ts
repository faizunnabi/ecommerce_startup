import { Component } from '@angular/core';
import {LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {ProductServiceProvider} from "../../../../providers/product-service/product-service";
import {CartServiceProvider} from "../../../../providers/cart-service/cart-service";

@Component({
  selector: 'page-deals',
  templateUrl: 'deals.html'
})
export class DealsPage {

  products :any;
  loader:any;
  constructor(public navCtrl: NavController,
              public productService:ProductServiceProvider,
              public loadingCtrl:LoadingController,
              private toastCtrl: ToastController) {

  }

  ionViewWillEnter()
  {
    this.loader = this.loadingCtrl.create({
      content: ''
    });

    this.loader.present();

    this.productService.fetchProducts().subscribe(
      res=>{
        this.loader.dismiss();
        this.products = res['products'].filter(function (item) {
          return item['offer'] > 0;
        });
      },
      err=>{
        this.loader.dismiss();
        this.toastCtrl.create({
          message: 'We encountered error !',
          duration: 3000,
          showCloseButton:true
        }).present();
      }
    );
  }

}
