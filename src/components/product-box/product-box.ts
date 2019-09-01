import {Component, Input} from '@angular/core';
import {NavController} from "ionic-angular";
import {SingleProductPage} from "../../pages/single-product/single-product";
import {ShopServiceProvider} from "../../providers/shop-service/shop-service";

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
  shop_name:string;
  constructor(public navCtrl:NavController,private shopService:ShopServiceProvider) {

  }

  ngOnInit(){
    this.show_name(this.product.shop_id);
  }

  goToProduct(p)
  {
    this.navCtrl.push(SingleProductPage,{
      product:p
    })
  }

  show_name(id)
  {
    let rr:any;
    this.shopService.fetchShops().subscribe(
      data=>{

        this.shop_name = data['shops'].filter((_item)=>_item.shop_id == "1")[0].name;
      }
    );
  }

}
