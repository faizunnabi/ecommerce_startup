import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
  //animations : [
   // trigger('changeOpacity',[
      /**state('state1',style({
        transform:'scale(1) translate3d(0, 0, 0)'
      })),
      state('state2',style({
        transform:'scale(1.2) translate3d(10%, 50%, 0)'
      })),**/
    //  transition('*=>state2',animate('2s',keyframes([
    //    style({ color: "red", offset: 0 }),
   //     style({ color: "blue", offset: 0.2 }),
    //    style({ color: "orange", offset: 0.3 }),
    //    style({ color: "black", offset: 1 })
    //  ]))),
     // transition('state2=>state1',animate('300ms ease-in',keyframes([
      //  style({transform:'translate3d(0,0,0)'}),
     //   style({opacity:'1'})
     // ])))
      //transition('state2=>state1',animate('200ms ease-out'))
   // ])
 // ]
})
export class ShopPage {

 // toState = 'state1';

  //changeState(state: any) {
  //  this.toState = state;
 // }
  constructor(public navCtrl: NavController) {

  }

}
