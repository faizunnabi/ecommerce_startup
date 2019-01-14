import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Item} from "../../models/item";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import {Subject} from "rxjs/Subject";
import {CartState} from "../../models/cartstate";
import {ReplaySubject} from "rxjs/ReplaySubject";

/*
  Generated class for the CartServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CartServiceProvider {

  constructor(public http: HttpClient) {

  }

  private cartSubject = new ReplaySubject<CartState>();
  Items:Item[] = [];
  CartState = this.cartSubject.asObservable();


  addProduct(_product:any) {
    this.Items.push(_product);
    this.cartSubject.next(<CartState>{loaded:true,products:this.Items});
  }

  removeProduct(id:number) {
    let item = this.Items.findIndex((_item) =>  _item.product.id == id );
    this.Items.splice(item,1);
    this.cartSubject.next(<CartState>{loaded:true,products:this.Items});
  }

  getAllProducts() {
    return this.CartState;
  }

  addQuantity(id:number){
    let itemIndex = this.Items.findIndex(item=>item.product.id==id);
    this.Items[itemIndex].quantity += 1;
    this.cartSubject.next(<CartState>{loaded:true,products:this.Items});
    return 1;
  }

  minusQuantity(id:number){
    let itemIndex = this.Items.findIndex(item=>item.product.id==id);
    this.Items[itemIndex].quantity += -1;
    this.cartSubject.next(<CartState>{loaded:true,products:this.Items});
    return 1;
  }
}
