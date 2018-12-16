import {Component, Input} from '@angular/core';
import {Item} from "../../models/item";
import {CartServiceProvider} from "../../providers/cart-service/cart-service";
import {ProductServiceProvider} from "../../providers/product-service/product-service";
import {ToastController} from "ionic-angular";


@Component({
  selector: 'cart-button',
  template: `
              <button ion-button color="dark" small icon-start style="" (click)="addToBasket(product)" [disabled]="cart_products.indexOf(product.id)>-1">
                <ion-icon name='basket'></ion-icon> BASKET
              </button>
            `,
  styles:[
    'button{float: right;}',
  ]
})

export class CartButtonComponent {

  text: string;
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
