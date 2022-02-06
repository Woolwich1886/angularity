import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TaskPriority } from '../enums/task-priority-enum';
import { ToDoTask } from '../models/to-do-task-model';

@Injectable()
export class TodoService {
  private readonly toDoSubject: Subject<ToDoTask[]>;

  private toDoList: ToDoTask[] = [
    { 'name': 'Выучить Ангуляр', 'priority': TaskPriority.high, 'isDone': false },
    { 'name': 'Закрыть ипотеку', 'priority': TaskPriority.low, 'isDone': false },
    { 'name': 'Погладить кота', 'priority': TaskPriority.high, 'isDone': true },
    { 'name': 'Обработать раны после кота', 'priority': TaskPriority.medium, 'isDone': false },
  ];

  constructor() {
    this.toDoSubject = new BehaviorSubject(this.toDoList);
  }

  getToDoList(): Observable<ToDoTask[]> {
    return this.toDoSubject.asObservable();
  }

  addTaskToList(task: ToDoTask) {
    this.toDoList.push(task);
  }
}
