import { NgModule } from '@angular/core';
import { CommonHeaderComponent } from './common-header/common-header';
import {BrowserModule} from "@angular/platform-browser";
import {IonicModule} from "ionic-angular";
import {MyApp} from "../app/app.component";
import { CartButtonComponent } from './cart-button/cart-button';
@NgModule({
	declarations: [CommonHeaderComponent,
    CartButtonComponent],
	imports: [BrowserModule,IonicModule.forRoot(MyApp),],
	exports: [CommonHeaderComponent,
    CartButtonComponent]
})
export class ComponentsModule {}
