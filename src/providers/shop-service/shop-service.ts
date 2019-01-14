import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Shop} from "../../models/shop";

/*
  Generated class for the ShopServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ShopServiceProvider {

  constructor(public http: HttpClient) {

  }

  fetchShops(){
    return this.http.get<Shop>('assets/data/shops.json');
  }

}
