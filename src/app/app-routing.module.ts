import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTaskComponent } from './component/task/create-task/create-task.component';
import { DisplayTasksComponent } from './component/task/display-tasks/display-tasks.component';

const routes: Routes = [
  { path:"", redirectTo:"taskList", pathMatch:'full' }, 
  { path:"taskList", component: DisplayTasksComponent }, 
  { path:"createTask", component: CreateTaskComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
