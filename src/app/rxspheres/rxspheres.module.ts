import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NumericSphereComponent } from './rx-spheres/numeric-sphere/numeric-sphere.component';
import { RxSpheresComponent } from './rx-spheres/rx-spheres.component';



@NgModule({
  declarations: [
    RxSpheresComponent,
    NumericSphereComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RxspheresModule { }
