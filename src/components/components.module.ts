import { NgModule } from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {IonicModule} from "ionic-angular";
import {MyApp} from "../app/app.component";
import { CartButtonComponent } from './cart-button/cart-button';
import { SearchBoxComponent } from './search-box/search-box';
@NgModule({
	declarations: [CartButtonComponent,
    SearchBoxComponent],
	imports: [BrowserModule,IonicModule.forRoot(MyApp),],
	exports: [CartButtonComponent,
    SearchBoxComponent]
})
export class ComponentsModule {}
