import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BucketComponent } from './bucket/bucket.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ShopComponent } from './shop.component';


@NgModule({
  declarations: [
    ShopComponent,
    BucketComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule
  ]
})

export class ShopModule { }
