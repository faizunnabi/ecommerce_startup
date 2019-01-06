import {Component, ElementRef, ViewChild} from '@angular/core';
import {LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
import {ShopServiceProvider} from "../../../../providers/shop-service/shop-service";
import {Shop} from "../../../../models/shop";
import {Geolocation} from "@ionic-native/geolocation";
import {ProductListPage} from "../../../product-list/product-list";
import {SingleShopPage} from "../../../single-shop/single-shop";


@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {

  shopList=[];
  loader:any;
  toast:any;
  category:string;
  constructor(public navParams: NavParams,public navCtrl: NavController,public shopService:ShopServiceProvider,private geolocation:Geolocation,public loadingCtrl:LoadingController,private toastCtrl: ToastController) {
    this.loader = this.loadingCtrl.create({
      content: ''
    });
    this.toast = this.toastCtrl.create({
      message: 'We encountered error',
      duration: 3000,
      showCloseButton:true
    });
    this.category = navParams.get('item') !=null?navParams.get('item'):'';
  }

  ionViewDidLoad() {
    this.loader.present();

      this.shopService.fetchShops().subscribe(
        res=>{
          this.loader.dismiss();
          this.shopList = res['shops'];
        },
        err=>{
          this.loader.dismiss();
          this.toast.present();
          console.log('unable to find data');
        }
    )
  }

  shopSingle(shop)
  {
    if(this.category != '')
    {
      this.navCtrl.push(ProductListPage,{
        item:this.category
      });
    }else{
      this.navCtrl.push(SingleShopPage,{
        shop:shop
      });
    }
  }

}
