import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Task } from 'src/app/model/task.model';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  constructor(private service : TaskService, private router : Router) { }

  taskToAdd! : Task; 

  ngOnInit(): void {
  }

  taskInsertForm = new FormGroup({
    'entitled': new FormControl( '', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
    'description': new FormControl(null, [Validators.minLength(1), Validators.maxLength(100)]),
    'creationDate': new FormControl([Validators.required]),
    'deadLine': new FormControl(null),
    'endDate': new FormControl(null),
    'priority': new FormControl([Validators.required])
  }); 


  onSubmit(){
    if(this.taskInsertForm.valid){
      this.taskToAdd = this.taskInsertForm.value; 
      this.service.createTask(this.taskToAdd).subscribe(); 
      this.router.navigateByUrl('/taskList'); 
      console.log(this.taskToAdd);
      
    }
  }; 
}
