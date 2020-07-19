import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { TodosComponent } from './todos/todos.component';

const routes: Routes = [
  {
    path: '',
    component: TodosComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TodosComponent],
  // exports: [TodosComponent],
})
export class UiModule {}
