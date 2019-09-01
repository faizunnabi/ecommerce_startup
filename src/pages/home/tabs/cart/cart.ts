import { Component } from '@angular/core';
import {DateTime, NavController, ToastController} from 'ionic-angular';
import {CartServiceProvider} from "../../../../providers/cart-service/cart-service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {HomePage} from "../../home";
import {Socket} from "ng-socket-io";
import {Order} from "../../../../models/order";
import {UserServiceProvider} from "../../../../providers/user-service/user-service";
import {NativeStorage} from "@ionic-native/native-storage";


export interface OrderProduct {
  product_id:number;
  product_name:string;
  product_pic:string;
  product_quantity:number;
}


@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
  animations:[
    trigger('editMode',[
      state('edit_inactive',style({
        "height":"100%",
        "bottom":"0px"
      })),
      state('edit_active',style({
        "height":"0",
        "bottom":"-200px"
      })),
      transition('edit_inactive<=>edit_active', animate('300ms'))
    ])
  ]
})

export class CartPage {
  cart_total:number = 0;
  cart_items:any = [];
  edit_mode:boolean = false;
  homePage:any = HomePage;
  //edit_state = 'edit_inactive';
  constructor(public navCtrl: NavController,private cartService:CartServiceProvider,private toastCtrl: ToastController,private socket:Socket,private userService:UserServiceProvider) {

  }

  ionViewWillEnter()
  {
    this.cartService.getAllProducts().subscribe(
      res=>{
        this.cart_total= 0;
        this.cart_items = res['products'];
        for(var i =0;i<res['products'].length;i++)
        {
          if(res['products'][i]['product']['offer'] > 0)
          {
            this.cart_total  += res['products'][i]['product']['offer'] * res['products'][i]['quantity'];
          }else{
            this.cart_total  += res['products'][i]['product']['price'] * res['products'][i]['quantity'];
          }
        }
      }
    )
  }

  goToTab(pagename,index)
  {
    this.navCtrl.push(pagename,{index:index});
  }

  ionViewDidLeave()
  {
    this.edit_mode = false;
  }

  incQuantity(id,q)
  {
    if(q >= 1){
      if(this.cartService.addQuantity(id)){
        this.toastCtrl.create({
          message: 'Product quantity updated',
          duration: 3000,
          showCloseButton:true
        }).present();
      }
    }

  }

  decQuantity(id,q) {
    if (q > 1) {
      if (this.cartService.minusQuantity(id)) {
        this.toastCtrl.create({
          message: 'Product quantity updated',
          duration: 3000,
          showCloseButton: true
        }).present();
      }
    }
  }

  enterEditMode()
  {
    this.edit_mode === false ? this.edit_mode=true : this.edit_mode=false;
    //this.edit_state = this.edit_state == 'edit_active' ? 'edit_inactive':'edit_active';
  }

  remove_item(id)
  {
    this.cartService.removeProduct(id);
  }

  checkout(c)
  {
    let orders : Array<Order> = [];
    this.userService.getUser().subscribe(
        data => {
            console.log(data);
            let order_user = {name:data.name,
                        email:data.email,
                        contact:data.contact,
                        addresses: data.addresses.filter((_item)=>_item.is_default==1)[0]
            };
          let d = new Date();
          let datetime = this.format_date(d);
          let order_products:Array<OrderProduct> = [];
          for(var i=0;i < c.length;i++) {
            if(orders.length > 0){
              let ind = orders.findIndex((_item)=>_item.shop_id == c[i].product.shop_id)
              if(ind > -1){
                orders[ind].products.push({
                  product_id:c[i].product.id,
                  product_name:c[i].product.name,
                  product_pic:c[i].product.picture,
                  product_quantity:c[i].quantity
                });
              }else{
                orders.push({
                  id:this.get_uniqid(),
                  shop_id:c[i].product.shop_id,
                  user:order_user,
                  products:[{
                    product_id:c[i].product.id,
                    product_name:c[i].product.name,
                    product_pic:c[i].product.picture,
                    product_quantity:c[i].quantity
                  }],
                  type:'cash',
                  amount:this.cart_total,
                  datetime:datetime
                });
              }

            }else{
              orders.push({
                id:this.get_uniqid(),
                shop_id:c[i].product.shop_id,
                user:order_user,
                products:[{
                  product_id:c[i].product.id,
                  product_name:c[i].product.name,
                  product_pic:c[i].product.picture,
                  product_quantity:c[i].quantity
                }],
                type:'cash',
                amount:this.cart_total,
                datetime:datetime
              });
            }
          }
          console.log(orders);
          this.socket.emit('new_order',orders);
          this.cartService.emptyCart();
        },
        error => console.error(error)

    );

  }

  format_date(d)
  {
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var strTime = hours+':'+minutes;
    return d.getMonth()+1 + "/" + d.getDate() + "/" + d.getFullYear() + "  " + strTime;
  }

  get_uniqid()
  {
    return '_'+Math.random().toString(36).substr(2,9);
  }

}
