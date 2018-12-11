import {Component, ElementRef, ViewChild} from '@angular/core';
import { NavController } from 'ionic-angular';
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
import {ShopServiceProvider} from "../../../../providers/shop-service/shop-service";
import {Shop} from "../../../../models/shop";

declare var google;

@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {

  @ViewChild('map') mapContainer:ElementRef;
  map:any;
  shopList=[];
  constructor(public navCtrl: NavController,public shopService:ShopServiceProvider) {
    this.shopService.fetchShops().subscribe(
      res=>{
      this.shopList = res['shops'];
      this.getMarkers();
    },
    err=>{
      console.log('unable to find data');
    }
    )
  }

  ionViewDidLoad() {
    this.displayGoogleMap();
  }

  displayGoogleMap() {
    this.shopList[1];
    let latLng = new google.maps.LatLng(28.6117993, 77.2194934);

    let mapOptions = {
      center: latLng,
      disableDefaultUI: true,
      zoom: 4,
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
  }

  addMarkersToMap(shop) {
    console.log(shop);
    var position = new google.maps.LatLng(shop['latitude'], shop['longitude']);
    var shopMarker = new google.maps.Marker({position: position, title: shop['name'],icon:'assets/imgs/marker.png'});
    shopMarker.setMap(this.map);
  }

}
