import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { endBeforeDeadLine, startBeforeDeadLine, startBeforeEnd, TASK_INSERT_FORM } from 'src/app/form/task.form';
import { Task } from 'src/app/model/task.model';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  taskInsertForm : FormGroup; 

  constructor(private service : TaskService, private router : Router, builder: FormBuilder) { 

    this.taskInsertForm = builder.group(TASK_INSERT_FORM, {
      validators : [startBeforeEnd, endBeforeDeadLine, startBeforeDeadLine]
  }); 
  }

  taskToAdd! : Task; 

  ngOnInit(): void {
    this.taskInsertForm.reset({
      priority : "low"
    }); 
  }


  onSubmit(){
    if(this.taskInsertForm.valid){
      this.taskToAdd = this.taskInsertForm.value; 
      this.service.createTask(this.taskToAdd).subscribe(() => this.router.navigateByUrl('/taskList')); 
      this.taskInsertForm.reset({
        priority : "low"
      }); 
    }
  }; 


  cancel(){
    this.taskInsertForm.reset({
      priority : "low"
    }); 
  }
}
