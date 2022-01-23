import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskPriority } from '../enums/task-priority-enum';
import { ToDoTask } from '../models/to-do-task-model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {

  toDoList: ToDoTask[] = [
    { 'name': 'Выучить Ангуляр', 'priority': TaskPriority.high, 'isDone': false },
    { 'name': 'Закрыть ипотеку', 'priority': TaskPriority.low, 'isDone': false },
    { 'name': 'Погладить кота', 'priority': TaskPriority.high, 'isDone': true },
    { 'name': 'Обработать раны после кота', 'priority': TaskPriority.medium, 'isDone': false },
  ];

  toDo$: Observable<ToDoTask[]>;

  constructor() { }

  ngOnInit(): void {
    this.toDo$ = of(this.toDoList);
    console.log(this.toDoList);
  }

  removeDone(): void {
    this.toDo$ = this.toDo$.pipe(map(data => data.filter(todo => todo.isDone !== true)));
  }

  changeToDone(todo: ToDoTask): void {
    todo.isDone = true;
  }

  addToDo(todo: ToDoTask): void {
    this.toDo$.subscribe(next => this.toDoList = next).unsubscribe();
    this.toDoList.push(todo);
    this.toDo$ = of(this.toDoList);
  }
}
