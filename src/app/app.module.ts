import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
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

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SplashPage,
    LoginPage,
    MainPage,
    ShopPage,
    ProductPage,
    DealsPage,
    CartPage,
    ProductListPage,
  ],
  imports: [
    ComponentsModule,
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SplashPage,
    LoginPage,
    MainPage,
    ShopPage,
    ProductPage,
    DealsPage,
    CartPage,
    ProductListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},

    ProductServiceProvider
  ]
})
export class AppModule {}
