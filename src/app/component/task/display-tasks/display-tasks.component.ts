import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/app/model/task.model';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-display-tasks',
  templateUrl: './display-tasks.component.html',
  styleUrls: ['./display-tasks.component.css']
})
export class DisplayTasksComponent implements OnInit {

  taskList : Task[] = []; 

  constructor(private service : TaskService, private router : Router) {
    this.getTasks(); 
  }

  getTasks(){
    this.service.getTasks()
    .subscribe({
      next: tasks => this.taskList = tasks,
      error: err => alert("echec"),
    });
  }

  ngOnInit(): void {
  }

  displayTask(task : Task){
    this.router.navigate(['task', task.id]);
  }

}
