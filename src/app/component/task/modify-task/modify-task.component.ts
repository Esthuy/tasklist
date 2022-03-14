import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { endBeforeDeadLine, startBeforeDeadLine, startBeforeEnd, TASK_INSERT_FORM } from 'src/app/form/task.form';
import { Task } from 'src/app/model/task.model';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-modify-task',
  templateUrl: './modify-task.component.html',
  styleUrls: ['./modify-task.component.css']
})
export class ModifyTaskComponent implements OnInit {

  taskModifyForm : FormGroup;
  taskToModify: Task;  
  modifiedTask!: Task; 

  constructor( private builder: FormBuilder,private service : TaskService, private router : Router) { 
    this.taskToModify = service.receiveTask(); 
    this.taskModifyForm = builder.group(TASK_INSERT_FORM,{
      validators : [startBeforeEnd, endBeforeDeadLine, startBeforeDeadLine]
  }); 
    this.taskModifyForm.patchValue({
      entitled : this.taskToModify.entitled,
      description : this.taskToModify.description,
      creationDate : this.taskToModify.creationDate,
      deadLine : this.taskToModify.deadLine,
      endDate : this.taskToModify.endDate,
      priority : this.taskToModify.priority
    })}

  onSubmit(){
    if(this.taskModifyForm.valid){
      this.modifiedTask = this.taskModifyForm.value; 
      this.service.modifyTask(this.taskToModify.id, this.modifiedTask).subscribe(() => {
        this.taskModifyForm.reset(); 
        this.router.navigateByUrl('/taskList')}); 
      
    }
  }; 

  cancel(){
    this.taskModifyForm.reset(); 
    this.router.navigateByUrl('/taskList'); 
  }


  ngOnInit(): void {
  }

}
