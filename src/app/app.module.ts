import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { RxSpheresComponent } from './rxspheres/rx-spheres/rx-spheres.component';
import { RxspheresModule } from './rxspheres/rxspheres.module';
import { ShopComponent } from './shop/shop.component';
import { ShopModule } from './shop/shop.module';
import { TestComponent } from './test/test.component';
import { TestModule } from './test/test.module';
import { TodoComponent } from './todo/todo.component';
import { TodoModule } from './todo/todo.module';
import { NumericSphereComponent } from './rxspheres/rx-spheres/numeric-sphere/numeric-sphere.component';


const routes: Routes = [
  { path: 'shop', component: ShopComponent },
  { path: 'todo', component: TodoComponent },
  { path: 'test', component: TestComponent },
  { path: 'rxspheres', component: RxSpheresComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule,
    ShopModule,
    TodoModule,
    TestModule,
    RxspheresModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
