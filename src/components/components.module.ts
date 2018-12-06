import { NgModule } from '@angular/core';
import { CommonHeaderComponent } from './common-header/common-header';
import {BrowserModule} from "@angular/platform-browser";
import {IonicModule} from "ionic-angular";
import {MyApp} from "../app/app.component";
@NgModule({
	declarations: [CommonHeaderComponent],
	imports: [BrowserModule,IonicModule.forRoot(MyApp),],
	exports: [CommonHeaderComponent]
})
export class ComponentsModule {}
