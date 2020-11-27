import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClientService } from 'src/app/services/http-client.service';
import { TaskToDo } from 'src/app/models/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo-app.component.html',
  styleUrls: ['./todo-app.component.scss'],
})
export class TodoAppComponent implements OnInit {
  tasks: TaskToDo[] = [];
  newTask: TaskToDo;
  toggle = false;

  constructor(private httpClientService: HttpClientService) {
  }

  ngOnInit(): void {
    this.getTasks();
  }

  isTaskCompleted(task: TaskToDo) {
    task.isCompleted = !task.isCompleted;
    this.httpClientService.editTask(task).subscribe(() => {
      this.getTasks();
    });
  }

  filterToggle(toggle: boolean) {
    toggle = !toggle;
    this.getTasks();
  }

  addTask() {
    this.newTask = new TaskToDo();
    this.tasks.push(this.newTask);
  }

  deleteTask(id: number, index: number) {
    if (id) {
      this.httpClientService.deleteTask(id).subscribe(() => {
        this.getTasks();
      });
    } else {
      this.tasks.splice(index, 1);
    }

  }

  editOrSaveTask(task: TaskToDo) {
    if (task.id) {
      this.httpClientService.editTask(task).subscribe(() => {
        this.getTasks();
      });
    } else {
      this.httpClientService.postTask(task).subscribe(() => {
        this.getTasks();
      });
    }
  }

  private getTasks() {
    this.httpClientService.getTasks().subscribe((tasks) => {
      if (!this.toggle) {
        this.tasks = tasks.filter(data => !data.isCompleted);
      } else {
        this.tasks = tasks;
      }
    });

  }
}
