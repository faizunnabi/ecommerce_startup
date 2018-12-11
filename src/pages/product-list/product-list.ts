import {Component, Input} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProductServiceProvider} from "../../providers/product-service/product-service";

@IonicPage()
@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {

  category_title: string;
  sub_cat:string;
  products :any;
  sub_cats = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public productService:ProductServiceProvider) {
    this.category_title = navParams.get('item');
    this.productService.fetchProducts().subscribe(
      res=>{
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
        console.log("error");
      }
    );
  }

  activateSegment(i){
    this.sub_cat = this.sub_cats[i];
  }

}
