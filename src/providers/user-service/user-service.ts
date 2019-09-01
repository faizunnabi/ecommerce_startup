import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {USERS} from "../mock-user/mock-users";
import {NativeStorage} from "@ionic-native/native-storage";
import {LoginPage} from "../../pages/login/login";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/fromPromise';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {
  users:any;
  constructor(public http: HttpClient,private nativeStorage:NativeStorage) {
    this.users = USERS;
  }


  auth(e,p){
    let i = this.users.findIndex((_item)=>_item.email == e && _item.password == p);
    if(i>=0){
      return this.users[i];
    }else{
      return 0;
    }
  }

  getUser():Observable<any>{
    return Observable.fromPromise(this.nativeStorage.getItem('user'));
  }

  logOut(){
    return Observable.fromPromise(this.nativeStorage.clear());
  }
}
