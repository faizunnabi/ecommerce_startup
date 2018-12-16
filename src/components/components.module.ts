import { NgModule } from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {IonicModule} from "ionic-angular";
import {MyApp} from "../app/app.component";
import { CartButtonComponent } from './cart-button/cart-button';
@NgModule({
	declarations: [CartButtonComponent],
	imports: [BrowserModule,IonicModule.forRoot(MyApp),],
	exports: [CartButtonComponent]
})
export class ComponentsModule {}
