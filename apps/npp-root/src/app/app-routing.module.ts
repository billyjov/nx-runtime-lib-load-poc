import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes, PreloadAllModules, Router } from '@angular/router';


const routes: Routes = [
  // {
  //   path: 'ui',
  //   // loadChildren: () => import('@npp/ui').then(m => m.UiModule)
  //   loadChildren: async () => {
  //     const a = await import('@npp/ui')
  //     return a['AdminModule'];
  //   }
  // },

];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
