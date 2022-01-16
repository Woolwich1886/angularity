import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ShopComponent } from './shop/shop.component';
import { NavComponent } from './nav/nav.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './shop/product-list/product-list.component';
import { BucketComponent } from './shop/bucket/bucket.component';
import { TodoComponent } from './todo/todo.component';
import { TodoFormComponent } from './todo/todo-form/todo-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'shop', component: ShopComponent },
  { path: 'todo', component: TodoComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    NavComponent,
    ProductListComponent,
    BucketComponent,
    TodoComponent,
    TodoFormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
