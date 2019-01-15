import {Component, Input} from '@angular/core';
import {SingleShopPage} from "../../pages/single-shop/single-shop";
import {NavController} from "ionic-angular";

/**
 * Generated class for the ShopBoxComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'shop-box',
  templateUrl: 'shop-box.html'
})
export class ShopBoxComponent {

  @Input() shop:any;

  constructor(public navCtrl:NavController) {

  }

  public shopSingle(s){
    this.navCtrl.push(SingleShopPage,{
      shop:s
    });
  }

}
