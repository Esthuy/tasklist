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

  //order the list
  order(){
    if(this.orderStr === "desc"){
      this.tasktoDisplay = this.taskList.sort((task1, task2) => task2.entitled.localeCompare(task1.entitled)); 
    } else {
      this.tasktoDisplay = this.taskList.sort((task1, task2) => task1.entitled.localeCompare(task2.entitled)); 
    }

    this.ifHidden(); 
    this.ifSearch(); 
    this.pagination(); 
  }


  //Hide closed task
  hideClosed(){
    this.hidden = true; 

    this.tasktoDisplay = this.taskList.filter(task => !task.endDate); 

    this.ifSearch(); 
    this.pagination(); 
  }

  //Display closed task 
  displayClosed(){
    this.hidden = false; 

    this.tasktoDisplay = this.taskList; 

    this.ifSearch(); 
    this.pagination(); 
  }

  //Search for a string in the tasks 
  search(){
    this.tasktoDisplay = this.taskList.filter(task => task.entitled.includes(this.toSearch));
    
    this.ifHidden(); 
    this.pagination(); 
  }

  //Check if hidden button is activated 
  ifHidden(){
    if (this.hidden){
      this.tasktoDisplay = this.tasktoDisplay.filter(task => !task.endDate);
    }
  }

  //Check if a search is on 
  ifSearch(){
    if(this.toSearch !== "" && this.toSearch != undefined){
      this.tasktoDisplay = this.tasktoDisplay.filter(task => task.entitled.includes(this.toSearch)); 
    }
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


    if(this.toSearch !== "" && this.toSearch != undefined){

        this.tasktoDisplay = this.taskList.filter(task => task.entitled.includes(this.toSearch)); 
        this.ifHidden(); 
        this.length = this.tasktoDisplay.length;
        this.tasktoDisplay = this.tasktoDisplay.slice(firstCut, secondCut);
        this.changed = true; 
        
    }

    if(this.hidden && !this.changed){

      this.tasktoDisplay = this.taskList.filter(task => !task.endDate);
      this.length = this.tasktoDisplay.length;
      this.tasktoDisplay = this.tasktoDisplay.slice(firstCut, secondCut); 
      this.changed= true; 
    } 

    if (!this.changed) {
        this.tasktoDisplay = this.taskList.slice(firstCut, secondCut); 
    }
  }


}
