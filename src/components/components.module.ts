import { NgModule } from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {IonicModule} from "ionic-angular";
import {MyApp} from "../app/app.component";
import { CartButtonComponent } from './cart-button/cart-button';
import { SearchBoxComponent } from './search-box/search-box';
import { OfferTagComponent } from './offer-tag/offer-tag';
import { RatingComponent } from './rating/rating';
import { ShrinkingHeaderComponent } from './shrinking-header/shrinking-header';
@NgModule({
	declarations: [CartButtonComponent,
    SearchBoxComponent,
    OfferTagComponent,
    RatingComponent,
    ShrinkingHeaderComponent],
	imports: [BrowserModule,IonicModule.forRoot(MyApp),],
	exports: [CartButtonComponent,
    SearchBoxComponent,
    OfferTagComponent,
    RatingComponent,
    ShrinkingHeaderComponent]
})
export class ComponentsModule {}
