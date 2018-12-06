import {Component, ViewChild} from '@angular/core';
import {Content, NavController} from 'ionic-angular';
import {ProductListPage} from "../../../product-list/product-list";

@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {
  constructor(public navCtrl: NavController) {
  }

  public goToProducts(event,item)
  {
    this.navCtrl.push(ProductListPage,{
      item:item
    });
  }
}
