import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NumericSphereComponent } from './rx-spheres/numeric-sphere/numeric-sphere.component';
import { RxSpheresComponent } from './rx-spheres/rx-spheres.component';
import { SpheresService } from './spheres.service';



@NgModule({
  declarations: [
    RxSpheresComponent,
    NumericSphereComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    SpheresService,
  ]
})
export class RxspheresModule { }
