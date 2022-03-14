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

  tasktoDisplay : Task[] = [];

  orderStr: string = "asc"; 
  toSearch!: string; 

  hidden: boolean = false; 
 

  constructor(private service : TaskService, private router : Router) {
    this.getTasks(); 
  }

  order(){
    if(this.orderStr === "desc"){
      this.tasktoDisplay = this.taskList.sort((task1, task2) => task2.entitled.localeCompare(task1.entitled)); 
      if (this.hidden){
        this.hideClosed();
      }else {
        this.displayClosed(); 
      }
    } else {
      this.tasktoDisplay = this.taskList.sort((task1, task2) => task1.entitled.localeCompare(task2.entitled)); 
      if (this.hidden){
        this.hideClosed();
      }else {
        this.displayClosed(); 
      }
    }
  }


  hideClosed(){
    this.tasktoDisplay = this.tasktoDisplay.filter(task => !task.endDate); 
    this.hidden = true; 
  }

  displayClosed(){
    this.tasktoDisplay = this.taskList; 
    this.hidden = false; 
  }

  search(){
    this.tasktoDisplay = this.taskList.filter(task => task.entitled.includes(this.toSearch)); 
    if (this.hidden){
      this.hideClosed();
    }
    this.toSearch = ""; 
  }

  getTasks(){
    this.service.getTasks()
    .subscribe({
      next: tasks => this.taskList = tasks,
      complete: () => {this.order(), this.tasktoDisplay = this.taskList}, 
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
