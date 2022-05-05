import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Task } from '../model/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private taskToModify! : Task; 

  constructor(private client: HttpClient) { }

  // private readonly url_base = "http://localhost:3000/tasks"; 
  private readonly url_base = "https://my-json-server.typicode.com/Esthuy/tasklist/tasks"; 


  getTasks() : Observable<Task[]>{
    return this.client.get<Task[]>(this.url_base);
  }

  getOneTask(id : number){
    return this.client.get<Task>(this.url_base+'/'+id)
  }

  createTask(task: Task){
    return this.client.post<Task>(this.url_base, task);  
   
  }

  deleteTask(id : number){
    return this.client.delete<Task>(this.url_base+'/'+id); 
  }

  modifyTask(idToModify: number, modifiedTask: Task){
    return this.client.patch<Task>(this.url_base+'/'+idToModify, modifiedTask); 
  }

  sendTask(task : Task){
    this.taskToModify = task; 
  }

  receiveTask(){
    return this.taskToModify; 
  }

}
