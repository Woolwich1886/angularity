import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BucketComponent } from './bucket/bucket.component';
import { BucketService } from './bucket/bucket.service';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductListService } from './product-list/product-list.service';
import { ShopComponent } from './shop.component';


@NgModule({
  declarations: [
    ShopComponent,
    BucketComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    ProductListService,
    BucketService
  ]
})

export class ShopModule { }
