import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateTaskComponent } from './component/task/create-task/create-task.component';
import { DisplayTasksComponent } from './component/task/display-tasks/display-tasks.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DisplayOneTaskComponent } from './component/task/display-one-task/display-one-task.component';
import { PriorityPipe } from './pipe/priority.pipe';
import { NullPipe } from './pipe/null.pipe';
import { ModifyTaskComponent } from './component/task/modify-task/modify-task.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    CreateTaskComponent,
    DisplayTasksComponent,
    DisplayOneTaskComponent,
    PriorityPipe,
    NullPipe,
    ModifyTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule , 
    FormsModule, 
    ReactiveFormsModule,
    BrowserAnimationsModule, 
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
