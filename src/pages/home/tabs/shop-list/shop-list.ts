import { Component } from '@angular/core';
import {LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {ShopServiceProvider} from "../../../../providers/shop-service/shop-service";
import {SingleShopPage} from "../../../single-shop/single-shop";


@Component({
  selector: 'page-shop-list',
  templateUrl: 'shop-list.html',
})
export class ShopListPage {

  shopList=[];
  loader:any;
  toast:any;
  category:string;
  constructor(public navParams: NavParams,public navCtrl: NavController,public shopService:ShopServiceProvider,public loadingCtrl:LoadingController,private toastCtrl: ToastController) {
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
      this.navCtrl.push(SingleShopPage,{
        shop:shop
      });
  }

}
