import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTaskComponent } from './component/task/create-task/create-task.component';
import { DisplayOneTaskComponent } from './component/task/display-one-task/display-one-task.component';
import { DisplayTasksComponent } from './component/task/display-tasks/display-tasks.component';
import { ModifyTaskComponent } from './component/task/modify-task/modify-task.component';

const routes: Routes = [
  { path:"", redirectTo:"taskList", pathMatch:'full' }, 
  { path:"taskList", component: DisplayTasksComponent }, 
  { path:"createTask", component: CreateTaskComponent },
  { path:"task/:id", component: DisplayOneTaskComponent},  
  { path:"modifyTask", component: ModifyTaskComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
