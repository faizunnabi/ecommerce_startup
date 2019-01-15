import {Component, Input} from '@angular/core';
import {NavController} from "ionic-angular";
import {SingleProductPage} from "../../pages/single-product/single-product";

/**
 * Generated class for the ProductBoxComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'product-box',
  templateUrl: 'product-box.html'
})
export class ProductBoxComponent {

  @Input() product: any;

  constructor(public navCtrl:NavController) {

  }

  goToProduct(p)
  {
    this.navCtrl.push(SingleProductPage,{
      product:p
    })
  }


}
