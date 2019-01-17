import {Component, Input} from '@angular/core';
import {CartServiceProvider} from "../../providers/cart-service/cart-service";
import {ToastController} from "ionic-angular";
import {Item} from "../../models/item";
import {ProductServiceProvider} from "../../providers/product-service/product-service";

/**
 * Generated class for the ProductOptionsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'product-options',
  templateUrl: 'product-options.html'
})
export class ProductOptionsComponent {

  @Input() product: any;

  cart_products = [];
  constructor(private cartService:CartServiceProvider,public productService:ProductServiceProvider,private toastCtrl: ToastController) {
    this.cartService.getAllProducts().subscribe(
      res=>{
        for(var i =0;i<res['products'].length;i++)
        {
          this.cart_products.push( res['products'][i]['product']['id']);
        }
      });
  }

  addToBasket(product)
  {
    let item:Item = {product:product,quantity:1}
    this.cartService.addProduct(item);
    this.toastCtrl.create({
      message: 'Product added to cart',
      duration: 3000,
      showCloseButton:true
    }).present();
  }

}
