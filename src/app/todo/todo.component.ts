import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToDoTask } from '../models/to-do-task-model';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent implements OnInit {

  toDo$: Observable<ToDoTask[]>;

  constructor(private service: TodoService) { }

  ngOnInit(): void {
    this.toDo$ = this.service.getToDoList();
  }

  removeDone(): void {
    this.toDo$ = this.toDo$.pipe(map(data => data.filter(todo => !todo.isDone)));
  }

  changeToDone(todo: ToDoTask): void {
    todo.isDone = true;
  }

  addToDo(todo: ToDoTask): void {
    this.service.addTaskToList(todo);
  }
}
