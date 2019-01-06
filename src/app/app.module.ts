import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Geolocation} from "@ionic-native/geolocation";
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {SplashPage} from "../pages/splash/splash";
import {LoginPage} from "../pages/login/login";
import {MainPage} from "../pages/home/tabs/main/main";
import {ShopPage} from "../pages/home/tabs/shop/shop";
import {ProductPage} from "../pages/home/tabs/product/product";
import {DealsPage} from "../pages/home/tabs/deals/deals";
import {CartPage} from "../pages/home/tabs/cart/cart";
import {ComponentsModule} from "../components/components.module";
import {ProductListPage} from "../pages/product-list/product-list";
import { ProductServiceProvider } from '../providers/product-service/product-service';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ShopServiceProvider } from '../providers/shop-service/shop-service';
import { CartServiceProvider } from '../providers/cart-service/cart-service';
import {RegisterationPage} from "../pages/registeration/registeration";
import {StoremapPage} from "../pages/storemap/storemap";
import {Keyboard} from "@ionic-native/keyboard";
import {SingleShopPage} from "../pages/single-shop/single-shop";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SplashPage,
    RegisterationPage,
    MainPage,
    ShopPage,
    ProductPage,
    DealsPage,
    CartPage,
    ProductListPage,
    StoremapPage,
    SingleShopPage
  ],
  imports: [
    ComponentsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp,{
      scrollAssist: false,
      autoFocusAssist: false,
      platforms: {
        ios: {
          backButtonText: ''
        }
      }}),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SplashPage,
    HomePage,
    LoginPage,
    RegisterationPage,
    MainPage,
    ShopPage,
    ProductPage,
    DealsPage,
    CartPage,
    ProductListPage,
    StoremapPage,
    SingleShopPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProductServiceProvider,
    ShopServiceProvider,
    Geolocation,
    Keyboard,
    CartServiceProvider
  ]
})
export class AppModule {}
