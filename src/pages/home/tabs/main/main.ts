import {Component, ViewChild} from '@angular/core';
import {Content, LoadingController, NavController, ToastController} from 'ionic-angular';
import {ProductListPage} from "../../../product-list/product-list";
import {ShopPage} from "../shop/shop";
import {Product} from "../../../../models/product";
import {ProductServiceProvider} from "../../../../providers/product-service/product-service";
import {CartServiceProvider} from "../../../../providers/cart-service/cart-service";
import {ShopServiceProvider} from "../../../../providers/shop-service/shop-service";

@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {
  loader:any;
  deals = [];
  recommended = [];
  shops = [];
  random_nums = [];
  constructor(public navCtrl: NavController,
              public productService:ProductServiceProvider,
              public shopService:ShopServiceProvider,
              private cartService:CartServiceProvider,
              public loadingCtrl:LoadingController,
              private toastCtrl: ToastController) {
    while(this.random_nums.length < 5){
      var r = Math.floor(Math.random()*30) + 1;
      if(this.random_nums.indexOf(r) === -1) this.random_nums.push(r);
    }
  }

  public goToShop(event,item)
  {
    this.navCtrl.push(ShopPage,{
      item:item
    });
  }

  ionViewWillEnter()
  {
    this.loader = this.loadingCtrl.create({
      content: ''
    });

    this.loader.present();

    this.productService.fetchProducts().subscribe(
      res=>{
        var r = this.random_nums;
        this.loader.dismiss();
        this.deals = res['products'].filter(function (item) {
          return item['offer'] > 0;
        });
        this.recommended = res['products'].filter(function (item) {
          return item['id'] in r;
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
    this.shopService.fetchShops().subscribe(
      res=>{
        this.shops = res['shops'].sort(function(a,b){
          var x = a['rating']; var y = b['rating'];
          return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        }).slice(1,4);
      },
      err=>{
        console.log('unable to find data');
      }
    )
  }
}
