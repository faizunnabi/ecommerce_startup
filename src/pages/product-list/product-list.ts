import {Component, Input} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {ProductServiceProvider} from "../../providers/product-service/product-service";
import {CartServiceProvider} from "../../providers/cart-service/cart-service";
import {Item} from "../../models/item";

@IonicPage()
@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {

  category_title: string;
  sub_cat:string;
  products :any;
  cart_products = [];
  sub_cats = [];
  loader:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public productService:ProductServiceProvider,
              private cartService:CartServiceProvider,
              public loadingCtrl:LoadingController,
              private toastCtrl: ToastController) {
    this.loader = this.loadingCtrl.create({
      content: ''
    });
    this.category_title = navParams.get('item');
    this.loader.present();

    this.productService.fetchProducts().subscribe(
      res=>{
        this.loader.dismiss();
        var title = this.category_title;
        this.products = res['products'].filter(function (item) {
          return item['category']== title;
        });
        for(var i=0;i<this.products.length;i++)
        {
          for(var j=0;j<this.products[i]['tags'].length;j++){
            if(this.sub_cats.indexOf(this.products[i]['tags'][j]) > -1)
            {
              continue;
            }else{
              this.sub_cat = '';
              this.sub_cats.push(this.products[i]['tags'][j]);
            }
          }
        }
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

  ionViewDidEnter()
  {

  }

  activateSegment(i){
    this.sub_cat = this.sub_cats[i];
  }


}
