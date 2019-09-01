import {Component, ViewChild} from '@angular/core';
import {AlertController, ModalController, Nav, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {SplashPage} from "../pages/splash/splash";
import {LoginPage} from "../pages/login/login";
import {ProductListPage} from "../pages/product-list/product-list";
import {MainPage} from "../pages/home/tabs/main/main";
import {StoremapPage} from "../pages/storemap/storemap";
import {Keyboard} from "@ionic-native/keyboard";
import {ProductServiceProvider} from "../providers/product-service/product-service";
import {UserProfilePage} from "../pages/user-profile/user-profile";
import {Socket} from "ng-socket-io";
import {UserServiceProvider} from "../providers/user-service/user-service";
import {NativeStorage} from "@ionic-native/native-storage";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav)
  nav: Nav;
  rootPage:any = LoginPage;
  homePage:any = HomePage;
  storeMapPage:any = StoremapPage;
  profilePage:any = UserProfilePage;
  loginPage:any = LoginPage;
  userInfo:any;
  dealsCount:number;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,modalCtrl: ModalController,keyboard:Keyboard,private productService:ProductServiceProvider,private userService:UserServiceProvider,private nativeStorage:NativeStorage,private alertCtrl:AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //keyboard.setResizeMode('body')
      //statusBar.styleDefault();
      //statusBar.overlaysWebView(false);
      //splashScreen.hide();
      keyboard.hideFormAccessoryBar(false);
      let splash = modalCtrl.create(SplashPage);
      splash.present();
      this.loadDeals();
      this.userService.getUser().subscribe(
        data=>{
          this.userInfo = {
            name:data.name,
            addresses: data.addresses.filter((_item)=>_item.is_default==1)[0]
          };
        }
      )
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

  logOut(){
    let confirm = this.alertCtrl.create({
      title: 'Exit Application?',
      message: 'Do you want to exit this application?',
      buttons: [
        {
          text: 'No',
          handler: () => {}
        },
        {
          text: 'Yes',
          handler: () => {
            this.userService.logOut().subscribe(
              data=>{
                navigator['app'].exitApp();
              }
            )
          }
        }
      ]
    });
    confirm.present();
  }

  loadDeals()
  {
    this.productService.fetchProducts().subscribe(
      res=>{
        if(res){
          this.dealsCount = res['products'].filter(function (item) {
            return item['offer'] > 0;
          }).length;
        }
      },
      err=>{
        console.log('error');
      }
    );
  }

}

