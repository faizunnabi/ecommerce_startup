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

  @ViewChild('map') mapContainer:ElementRef;
  map:any;
  bounds:any;
  shopList=[];
  loader:any;
  toast:any;
  constructor(public navCtrl: NavController,public shopService:ShopServiceProvider,private geolocation:Geolocation,public loadingCtrl:LoadingController,private toastCtrl: ToastController) {
    this.loader = this.loadingCtrl.create({
      content: 'Fetching shops around you !'
    });
    this.toast = this.toastCtrl.create({
      message: 'We encountered error in loading map.',
      duration: 3000,
      showCloseButton:true
    });
  }

  ionViewDidLoad() {
    this.loader.present();
    this.geolocation.getCurrentPosition().then((resp)=>{
      this.bounds = new google.maps.LatLngBounds();
      this.displayGoogleMap(resp.coords.latitude,resp.coords.longitude);
      this.shopService.fetchShops().subscribe(
        res=>{
          this.loader.dismiss();
          this.shopList = res['shops'];
          this.getMarkers();
        },
        err=>{
          this.loader.dismiss();
          this.toast.present();
          console.log('unable to find data');
        }
      )
    }).catch((error)=>{
      this.loader.dismiss();
      this.toast.present();
      console.log('got error');
    });

  }

  displayGoogleMap(la,lo) {
    this.shopList[1];
    let latLng = new google.maps.LatLng(la, lo);

    let mapOptions = {
      center: latLng,
      disableDefaultUI: true,
      zoom: 20,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
  }

  getMarkers() {
    for (let _i = 0; _i < this.shopList.length; _i++) {
      if(_i > 0 )
        console.log(this.shopList[_i]);
        this.addMarkersToMap(this.shopList[_i]);
    }
    this.map.fitBounds(this.bounds);
  }

  addMarkersToMap(shop) {
    console.log(shop);
    var position = new google.maps.LatLng(shop['latitude'], shop['longitude']);
    var shopMarker = new google.maps.Marker({position: position, title: shop['name'],icon:'assets/imgs/marker1.png'});
    this.bounds.extend(shopMarker.getPosition());
    shopMarker.setMap(this.map);
  }

}
