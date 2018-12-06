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
  products :any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public productService:ProductServiceProvider) {
    this.category_title = navParams.get('item');
    this.productService.fetchProducts().subscribe(
      res=>{
        this.products = res;
        console.log(this.products);
      },
      err=>{
        console.log("error");
      }
    );
  }

}
