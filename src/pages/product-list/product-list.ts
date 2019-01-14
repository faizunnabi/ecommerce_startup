import {Component, Input} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {ProductServiceProvider} from "../../providers/product-service/product-service";
import {CartServiceProvider} from "../../providers/cart-service/cart-service";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";


@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
  animations:[
    trigger('showProducts',[
      transition('* => *',animate('1s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-5%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(5px)',  offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
          ])))
    ])
  ]
})
export class ProductListPage {

  category_title: string;
  sub_cat:string;
  products :any;
  original_product_list : any;
  sub_cats = [];
  loader:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public productService:ProductServiceProvider,
              private cartService:CartServiceProvider,
              public loadingCtrl:LoadingController,
              private toastCtrl: ToastController) {

    this.category_title = navParams.get('item');
  }

  ionViewWillEnter()
  {
    this.loader = this.loadingCtrl.create({
      content: ''
    });

    this.loader.present();

    this.productService.fetchProducts().subscribe(
      res=>{
        this.loader.dismiss();
        var title = this.category_title;
        this.products = res['products'].filter(function (item) {
          return item['category']== title;
        });
        this.original_product_list = this.products;
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

  activateSegment(i){
    this.products = this.original_product_list;
    if(i != null){
      this.sub_cat = this.sub_cats[i];
      var sc = this.sub_cat;
      this.products = this.products.filter(function (item) {
        return item['tags'].includes(sc);
      });
    }

    console.log(this.sub_cat);
  }


}
