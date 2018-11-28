import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {SplashScreen} from "@ionic-native/splash-screen";
import {HomePage} from "../home/home";
import {LoginPage} from "../login/login";

/**
 * Generated class for the SplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {

  constructor(public navCtrl:NavController,public viewCtrl: ViewController,public splashScreen: SplashScreen) {
  }

  ionViewDidLoad() {
  }

  ionViewDidEnter() {

    this.splashScreen.hide();

    setTimeout(() => {
      this.viewCtrl.dismiss();
    }, 5000);

  }

}
