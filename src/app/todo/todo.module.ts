import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { TodoComponent } from './todo.component';
import { TodoService } from './todo.service';


@NgModule({
  declarations: [
    TodoComponent,
    TodoFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    TodoService,
  ],
})
export class TodoModule { }
