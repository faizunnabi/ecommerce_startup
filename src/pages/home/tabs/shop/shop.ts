import {Component, ElementRef, ViewChild} from '@angular/core';
import {LoadingController, NavController, ToastController} from 'ionic-angular';
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
import {ShopServiceProvider} from "../../../../providers/shop-service/shop-service";
import {Shop} from "../../../../models/shop";
import {Geolocation} from "@ionic-native/geolocation";

declare var google;

@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {

  shopList=[];
  loader:any;
  toast:any;
  constructor(public navCtrl: NavController,public shopService:ShopServiceProvider,private geolocation:Geolocation,public loadingCtrl:LoadingController,private toastCtrl: ToastController) {
    this.loader = this.loadingCtrl.create({
      content: 'Fetching shops around you !'
    });
    this.toast = this.toastCtrl.create({
      message: 'We encountered error',
      duration: 3000,
      showCloseButton:true
    });
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

}
