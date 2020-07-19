import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes, PreloadAllModules, Router } from '@angular/router';


const routes: Routes = [
  {
    path: 'ui',
    // loadChildren: () => import('@npp/ui').then(m => m.UiModule)
  },

];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
