import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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

  //Pagination 
  length: number = 1000;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  event!: PageEvent; 

  changed: boolean = false; 
 

  constructor(private service : TaskService, private router : Router) {
    this.getTasks(); 
  }

  order(){
    if(this.orderStr === "desc"){
      this.tasktoDisplay = this.taskList.sort((task1, task2) => task2.entitled.localeCompare(task1.entitled)); 
    } else {
      this.tasktoDisplay = this.taskList.sort((task1, task2) => task1.entitled.localeCompare(task2.entitled)); 
    }

    if (this.hidden){
      this.tasktoDisplay = this.tasktoDisplay.filter(task => !task.endDate);
    }

    this.pagination(); 
  }


  hideClosed(){
    this.tasktoDisplay = this.taskList.filter(task => !task.endDate); 
    if(this.toSearch !== "" && this.toSearch != undefined){
      this.tasktoDisplay = this.tasktoDisplay.filter(task => task.entitled.includes(this.toSearch)); 
    }
    this.hidden = true; 
    this.pagination(); 
  }

  displayClosed(){
    this.tasktoDisplay = this.taskList; 
    if(this.toSearch !== "" && this.toSearch != undefined){
      this.tasktoDisplay = this.tasktoDisplay.filter(task => task.entitled.includes(this.toSearch)); 
    }
    this.hidden = false; 
    this.pagination(); 
  }

  search(){
    this.tasktoDisplay = this.taskList.filter(task => task.entitled.includes(this.toSearch));
    
    if (this.hidden){
      this.tasktoDisplay = this.tasktoDisplay.filter(task => !task.endDate);
    }
    this.pagination(); 
  }



  getTasks(){
    this.service.getTasks()
    .subscribe({
      next: tasks => this.taskList = tasks,
      complete: () => {this.order();
                       this.tasktoDisplay = this.taskList;
                       this.pagination(); 
                      }, 
      error: err => alert("echec"),
    });
  }

  ngOnInit(): void { 
    this.getTasks(); 
  }

  displayTask(task : Task){
    this.router.navigate(['task', task.id]);
  }

  pagination(){
    this.length = this.tasktoDisplay.length;

    if(this.event == null){
      this.tasktoDisplay = this.tasktoDisplay.slice(0, this.pageSize);
    } else {
      this.onPageChanged(this.event); 
    }
  }

  onPageChanged(e : PageEvent) {
    this.event = e; 

    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize; 

    this.changed = false; 

  
    if(this.hidden){

        this.tasktoDisplay = this.taskList.filter(task => !task.endDate);
        this.length = this.tasktoDisplay.length;
        this.tasktoDisplay = this.tasktoDisplay.slice(firstCut, secondCut); 
        this.changed= true; 
    } 

    if(this.toSearch !== "" && this.toSearch != undefined){

        this.tasktoDisplay = this.taskList.filter(task => task.entitled.includes(this.toSearch)); 
          if(this.hidden){
            this.tasktoDisplay = this.tasktoDisplay.filter(task => !task.endDate);
          }
        this.length = this.tasktoDisplay.length;
        this.tasktoDisplay = this.tasktoDisplay.slice(firstCut, secondCut);
        this.changed = true; 
    }

    if (!this.changed) {
        this.tasktoDisplay = this.taskList.slice(firstCut, secondCut); 
    }
  }


}
