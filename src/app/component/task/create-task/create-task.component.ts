import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  constructor(private service : TaskService) { }

  ngOnInit(): void {
  }

}
