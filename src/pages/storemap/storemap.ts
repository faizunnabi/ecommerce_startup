import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {ShopServiceProvider} from "../../providers/shop-service/shop-service";
import {Geolocation} from "@ionic-native/geolocation";

/**
 * Generated class for the StoremapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;

@Component({
  selector: 'page-storemap',
  templateUrl: 'storemap.html',
})

export class StoremapPage {

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
    var infowindow = new google.maps.InfoWindow({content: shop['name']});
    var shopMarker = new google.maps.Marker({position: position,icon:'assets/imgs/marker1.png'});
    shopMarker.addListener('click', function() {
      infowindow.open(this.map, shopMarker);
    });
    this.bounds.extend(shopMarker.getPosition());
    shopMarker.setMap(this.map);
  }

}
