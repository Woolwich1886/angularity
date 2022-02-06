import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TestComponent } from './test.component';
import { TestService } from './test.service';



@NgModule({
  declarations: [
    TestComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    TestService,
  ]
})
export class TestModule { }
