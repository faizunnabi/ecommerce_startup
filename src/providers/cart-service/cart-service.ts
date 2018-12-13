import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Item} from "../../models/item";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import {Subject} from "rxjs/Subject";
import {CartState} from "../../models/cartstate";

/*
  Generated class for the CartServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CartServiceProvider {

  constructor(public http: HttpClient) {

  }

  private cartSubject = new Subject<CartState>();
  Items:Item[] = [];
  CartState = this.cartSubject.asObservable();


  addProduct(_product:any) {
    this.Items.push(_product);
    console.log(this.Items);
    this.cartSubject.next(<CartState>{loaded:true,products:this.Items});
  }

  removeProduct(id:number) {
    this.Items = this.Items.filter((_item) =>  _item.product.id !== id )
    this.cartSubject.next(<CartState>{loaded:false,products:this.Items});
  }

  getAllProducts() : Observable <any> {
    return Observable.of(this.Items);
  }

}
