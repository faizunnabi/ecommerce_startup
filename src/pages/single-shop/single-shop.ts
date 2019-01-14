import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ProductServiceProvider} from "../../providers/product-service/product-service";
import {ShopPage} from "../shop/shop";
import {ProductListPage} from "../product-list/product-list";

/**
 * Generated class for the SingleShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-single-shop',
  templateUrl: 'single-shop.html',
})
export class SingleShopPage {
  shop:any;
  loader:any;
  deals = [];
  recommended = [];
  random_nums = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl:LoadingController,public productService:ProductServiceProvider) {
    this.shop = navParams.get('shop') !=null ? navParams.get('shop'):'';
    while(this.random_nums.length < 5){
      var r = Math.floor(Math.random()*30) + 1;
      if(this.random_nums.indexOf(r) === -1) this.random_nums.push(r);
    }
  }

  ionViewWillEnter() {
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
        console.log('error')
      }
    );
  }

  public goToShop(event,item)
  {
    this.navCtrl.push(ProductListPage,{
      item:item
    });
  }

}
