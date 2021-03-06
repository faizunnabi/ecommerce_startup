import {Component, ViewChild} from '@angular/core';
import {ModalController, Nav, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {SplashPage} from "../pages/splash/splash";
import {LoginPage} from "../pages/login/login";
import {ProductListPage} from "../pages/product-list/product-list";
import {MainPage} from "../pages/home/tabs/main/main";
import {StoremapPage} from "../pages/storemap/storemap";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav)
  nav: Nav;
  rootPage:any = LoginPage;
  homePage:any = HomePage;
  storeMapPage:any = StoremapPage;
  loginPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,modalCtrl: ModalController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      //splashScreen.hide();
      let splash = modalCtrl.create(SplashPage);
      splash.present();
    });
  }
  goTo(pagename)
  {
    this.nav.setRoot(pagename);
  }

  goToTab(pagename,index)
  {
    this.nav.setRoot(pagename,{index:index});
  }

}

