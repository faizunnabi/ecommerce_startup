import {Component, Input} from '@angular/core';
import {ProductServiceProvider} from "../../providers/product-service/product-service";
import {ShopServiceProvider} from "../../providers/shop-service/shop-service";
import {SingleProductPage} from "../../pages/single-product/single-product";
import {NavController} from "ionic-angular";
import {SingleShopPage} from "../../pages/single-shop/single-shop";

@Component({
  selector: 'search-box',
  template: `
              <ion-toolbar color="primary">
                <ion-searchbar [(ngModel)]="searchTerm" (input)="filterItems()" placeholder="Search your {{searchIn}}"></ion-searchbar>
              </ion-toolbar>
              <div class="result_container" *ngIf="searchTerm > ''">
                <ion-list #searchList >
                  <ion-item *ngFor="let item of items|slice:0:10" style="color:#3e76ff" (click)="goToPage(item)">
                    {{item.name}}
                  </ion-item>
                  <ion-item *ngIf="items==''">
                    <i>No result found !</i>
                  </ion-item>
                </ion-list>
              </div>
            `,
  styles:[
    '.result_container{position: absolute;height:100vh;width:100%;background: #fff;}'
  ]
})
export class SearchBoxComponent {

  searchTerm: string;
  items: any;
  searchIn:string;

  @Input()
  set searchModel(message : string ){
    this.searchIn = message;
  }
  get searchModel(){
    return this.searchIn;
  }

  constructor(private productService:ProductServiceProvider,private shopService:ShopServiceProvider,public navCtrl:NavController) {

  }

  filterItems()
  {

      if(this.searchIn == 'products')
      {
        this.productService.fetchProducts().subscribe(
          res=>{
            this.items = res['products'].filter((item)=>{
              return item['name'].toLowerCase().indexOf(this.searchTerm.toLowerCase())>-1;
            });
          }
        )
      }else if(this.searchIn=='shops')
      {
        this.shopService.fetchShops().subscribe(
          res=>{
            this.items =  res['shops'].filter((item)=>{
              return item['name'].toLowerCase().indexOf(this.searchTerm.toLowerCase())>-1;
            });
            console.log('yes');
          }
        )
      }else{
        this.productService.fetchProducts().subscribe(
          res=>{
            this.items =  res['products'].filter((item)=>{
              return item['name'].toLowerCase().indexOf(this.searchTerm.toLowerCase())>-1;
            });
            console.log(this.items);
          }
        )
      }
    }

    goToPage(item)
    {
      if(this.searchIn=='products')
      {
        this.navCtrl.push(SingleProductPage,{
          product:item
        });
      }else if(this.searchIn=='shops')
      {
        this.navCtrl.push(SingleShopPage,{
          shop:item
        });
      }

    }


}
