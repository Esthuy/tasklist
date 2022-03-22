import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { Task } from 'src/app/model/task.model';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-display-one-task',
  templateUrl: './display-one-task.component.html',
  styleUrls: ['./display-one-task.component.css']
})
export class DisplayOneTaskComponent implements OnInit {

  id: number;
  task!: Task; 
  $task : Observable<Task>; 


  constructor(  
    route: ActivatedRoute,
    private service : TaskService,
    private router: Router) {

    const param_id = route.snapshot.paramMap.get('id');
    this.id = param_id ? parseInt(param_id) : -1;
    this.$task = service.getOneTask(this.id).pipe(
      catchError((err) => {
        router.navigateByUrl("taskList"); 
        return of(); 
      })
    )
    
    //Vieille version sans pipe 

    // if( this.id && this.id > 0 )
    //   service.getOneTask(this.id).subscribe({
    //     next: (task) => this.task = task,
    //     error: (err) => router.navigateByUrl('/taskList')
    //   }); 
    }


  deleteTask(task : Task){
    if(confirm("Êtes vous sur de vouloir supprimer la tâche ?")){
      this.service.deleteTask(task.id).subscribe({
        next: () => this.router.navigateByUrl('/taskList')
      }); 
    } ;
  }

  modifyTask(task : Task){
    this.service.sendTask(task); 
    this.router.navigateByUrl('/modifyTask'); 
  }

  return(){
    this.router.navigateByUrl('/taskList');
  }



  ngOnInit(): void {
  }
 

}
