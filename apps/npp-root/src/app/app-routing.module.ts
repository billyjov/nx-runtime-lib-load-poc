import { NgModule } from '@angular/core';

import { RouterModule, Routes} from '@angular/router';
import { loadModule } from './external-deps';


const routes: Routes = [
  {
    path: 'ui',
    loadChildren: () => loadModule(`assets/js/npp-ui.umd.min.js?t=${new Date().getTime()}`)
      .then(module => {
        console.log('module: ', module);

        return module.npp['ui'].UiModule;
      })
  }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
