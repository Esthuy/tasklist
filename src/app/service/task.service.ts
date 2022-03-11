import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../model/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  taskList : Task[] = []; 

  constructor(private client: HttpClient) { }

  private readonly url_base = "http://localhost:3000/tasks"; 

  getTasks() : Observable<Task[]>{
    return this.client.get<Task[]>(this.url_base);
  }

  createTask(task: Task){
    console.log('on passe par create task');
    return this.client.post<Task>(this.url_base, task);  
  }
}
