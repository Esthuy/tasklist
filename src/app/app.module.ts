import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateTaskComponent } from './component/task/create-task/create-task.component';
import { DisplayTasksComponent } from './component/task/display-tasks/display-tasks.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DisplayOneTaskComponent } from './component/task/display-one-task/display-one-task.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateTaskComponent,
    DisplayTasksComponent,
    DisplayOneTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule , 
    FormsModule, 
    ReactiveFormsModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
