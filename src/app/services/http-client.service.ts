import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskToDo } from '../models/task';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(private http: HttpClient) { }

  getTasks(): Observable<TaskToDo[]> {
    return this.http.get<TaskToDo[]>(environment.apiUrl + 'todo');
  }

  postTask(task: TaskToDo): Observable<object> {
    return this.http.post(environment.apiUrl + 'todo', task);
  }

  deleteTask(id: number): Observable<object> {
    let endpoint = `todo/${id}`;

    return this.http.delete(environment.apiUrl + endpoint);
  }

  editTask(task: TaskToDo): Observable<object> {
    let endpoint = `todo`;

    return this.http.put(environment.apiUrl + endpoint, task);
  }
}
