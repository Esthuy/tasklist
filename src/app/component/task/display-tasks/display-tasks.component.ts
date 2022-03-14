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
  orderStr: string = "asc"; 
  hidden: boolean = false; 
 

  constructor(private service : TaskService, private router : Router) {
    this.getTasks(); 
  }

  order(){
    if(this.orderStr === "desc"){
      this.taskList = this.taskList.sort((task1, task2) => task2.entitled.localeCompare(task1.entitled)); 
    } else {
      this.taskList = this.taskList.sort((task1, task2) => task1.entitled.localeCompare(task2.entitled)); 
    }
  }


  hideClosed(){
    this.taskList = this.taskList.filter(task => !task.endDate); 
    this.hidden = true; 
  }

  displayClosed(){
    this.getTasks(); 
    this.hidden = false; 
  }

  getTasks(){
    this.service.getTasks()
    .subscribe({
      next: tasks => this.taskList = tasks,
      complete: () => this.order(),
      error: err => alert("echec"),
    });
  }

  ngOnInit(): void { 
    this.getTasks(); 
  }

  displayTask(task : Task){
    this.router.navigate(['task', task.id]);
  }

}
