import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task.model';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-display-tasks',
  templateUrl: './display-tasks.component.html',
  styleUrls: ['./display-tasks.component.css']
})
export class DisplayTasksComponent implements OnInit {

  taskList : Task[] = []; 

  constructor(private service : TaskService) {
    this.getTasks(); 
  }

  getTasks(){
    this.service.getTasks()
    .subscribe({
      next: tasks => this.taskList = tasks,
      error: err => alert("echec"),
      complete: () => console.log("get tasks - completed")
    });
  }

  ngOnInit(): void {
  }

}
