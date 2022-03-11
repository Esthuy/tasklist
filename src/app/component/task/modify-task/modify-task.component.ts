import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TASK_INSERT_FORM } from 'src/app/form/task.form';
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

  constructor( builder: FormBuilder, service : TaskService) { 
    this.taskToModify = service.receiveTask(); 
    this.taskModifyForm = builder.group(TASK_INSERT_FORM);
    this.taskModifyForm.patchValue({
      entitled : this.taskToModify.entitled,
      description : this.taskToModify.description,
      creationDate : this.taskToModify.creationDate,
      deadLine : this.taskToModify.deadLine,
      endDate : this.taskToModify.endDate,
      priority : this.taskToModify.priority
    })}

  onSubmit(){}; 

  ngOnInit(): void {
  }

}
