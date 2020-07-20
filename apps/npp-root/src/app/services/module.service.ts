import { HttpClient } from '@angular/common/http';
import { Injectable, Compiler } from '@angular/core';

import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { ModuleData } from './module.model';

// Needed for the new modules
import * as AngularCore from '@angular/core';
import * as AngularCommon from '@angular/common';
import * as AngularRouter from '@angular/router';
import * as BrowserAnimations from '@angular/platform-browser/animations';

import { environment } from '../../environments/environment';

declare const SystemJS: any;

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  source = `http://${window.location.host}/`;
  constructor(
    private compiler: Compiler,
    private httpClient: HttpClient
  ) {
  }

  loadModules(): Observable<ModuleData[]> {
    return this.httpClient.get('./assets/modules.json').pipe(
      map((modulesData: ModuleData[]) => {
        return modulesData;
      }),
      catchError((error: Response) => {
        console.log(error);
        return throwError('Module meta data could not be loaded');
      }
      )
    );
  }

  loadModule(moduleInfo: ModuleData): Observable<any> {
    const url = this.source + moduleInfo.location;

    console.log('URL LOADMODULE', url);

    return this.httpClient.get(url).pipe(
      map(source => {
        console.log('SOURCE', source);
        const exports = {}; // this will hold module exports
        const modules = {   // this is the list of modules accessible by plugins
          '@angular/core': AngularCore,
          '@angular/common': AngularCommon,
          '@angular/router': AngularRouter,
          '@angular/platform-browser/animations': BrowserAnimations,
        };

        // shim 'require' and eval
        const require: any = (module) => modules[module];
        // tslint:disable-next-line: no-eval
        eval(source.toString());

        // Need to check if there is another solution for eval as this is described as 'Evil'
        console.log('MODULE INFO INSIDE LOAD MODULE', moduleInfo);

        this.compiler.compileModuleAndAllComponentsSync(exports[`${moduleInfo.moduleName}`]);
        // console.log(exports); // disabled as this object is cleared anyway
        return exports;
      })
    );
  }


  loadModuleSystemJS(moduleInfo: ModuleData): Promise<any> {
    // console.log(typeof SystemJS.set);
    const url = `${environment.moduleBaseurl}/${moduleInfo.location}`;
    console.log('URL LOADMODULESYSTEMJS', url);

    SystemJS.set('@angular/core', SystemJS.newModule(AngularCore));
    SystemJS.set('@angular/common', SystemJS.newModule(AngularCommon));
    SystemJS.set('@angular/router', SystemJS.newModule(AngularRouter));
    SystemJS.set('@angular/platform-browser/animations', SystemJS.newModule(BrowserAnimations));

    // now, import the new module
    return SystemJS.import(`${url}`).then((module) => {
      console.log('MODULE', module);
      console.log('MODULE INFO', moduleInfo);

      return this.compiler.compileModuleAndAllComponentsAsync(module[`${moduleInfo.moduleName}`]).then(compiled => {
        console.log('MODULE COMPILED', compiled);
        return module;
      });
    });
  }

}
