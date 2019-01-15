import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {ProductServiceProvider} from "../../providers/product-service/product-service";
import {CartServiceProvider} from "../../providers/cart-service/cart-service";
import {Item} from "../../models/item";

/**
 * Generated class for the SingleProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-single-product',
  templateUrl: 'single-product.html',
})
export class SingleProductPage {
  product:any;
  loader:any;
  cart_products = [];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public productService:ProductServiceProvider,
              private cartService:CartServiceProvider,
              private toastCtrl: ToastController,
              public loadingCtrl:LoadingController,) {
    this.product = navParams.get('product');
  }

  addToBasket(product)
  {
    let item:Item = {product:product,quantity:1}
    this.cartService.addProduct(item);
    this.toastCtrl.create({
      message: 'Product added to cart',
      duration: 3000,
      showCloseButton:true
    }).present();
  }

  ionViewWillEnter()
  {
    this.cartService.getAllProducts().subscribe(
      res=>{
        for(var i =0;i<res['products'].length;i++)
        {
          this.cart_products.push( res['products'][i]['product']['id']);
        }
      },
      err=>{

      },
      () => {

      });
  }

}
