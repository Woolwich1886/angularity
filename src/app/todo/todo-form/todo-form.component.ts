import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskPriority } from 'src/app/enums/task-priority-enum';
import { ToDoTask } from 'src/app/models/to-do-task-model';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  toDoForm: FormGroup;
  priorityList: string[] = Object.values(TaskPriority)
  @Output()
  addNewToDo: EventEmitter<ToDoTask> = new EventEmitter<ToDoTask>()

  constructor() { }

  ngOnInit(): void {
    this.toDoForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      priority: new FormControl(TaskPriority.medium, [Validators.required])
    })
  }

  createToDoTask(): void {
    if (this.toDoForm.valid) {
      const value = this.toDoForm.value;
      const todo: ToDoTask = {
        'name': value.name, 'priority': value.priority, 'isDone': false
      }
      this.addNewToDo.emit(todo)
      this.toDoForm.reset({
        name: '',
        priority: TaskPriority.medium,
      })
    } else {
      return;
    }
  }
}
