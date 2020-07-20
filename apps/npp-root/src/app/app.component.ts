import { Component, OnInit } from '@angular/core';
import { RouterService } from './services/router.service';
import { ModuleData } from './services/module.model';
import { ModuleService } from './services/module.service';

@Component({
  selector: 'npp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'npp-root';
  installedModules$: any;
  errorMessage: string;
  errorVisible = false;

  constructor(
    private routerService: RouterService,
    private moduleService: ModuleService
  ) {

  }

  ngOnInit() {
    this.moduleService.loadModules().subscribe(res => {
      res.forEach(moduleToEnable => {

        console.log('module x was loaded: ', moduleToEnable)
        if (moduleToEnable.registered)
          console.log('module x was registereds: ', moduleToEnable)
        this.registerRoute(moduleToEnable);
        // this.registerRoute(moduleToEnable);
      })
    });
  }

  enableModule(moduleToEnable: ModuleData) {
    // enable or disable module
    if (this.isRegistered(moduleToEnable)) {
      this.routerService.unRegisterRoute(moduleToEnable.path);
    } else {
      this.registerRoute(moduleToEnable);
    }
  }

  isRegistered(moduleData: ModuleData): boolean {
    return this.routerService.routeIsRegistered(moduleData.path);
  }

  // private registerRoute(moduleToEnable: ModuleData) {
  //   // load up the umd file and register the route whenever succeeded.
  //   console.log('module to enable :', moduleToEnable);

  //   this.moduleService.loadModule(moduleToEnable).subscribe((exports) => {

  //     console.log('exports: ', exports);
  //     this.routerService.createAndRegisterRoute(moduleToEnable, exports);
  //   }, () => this.showError(`${moduleToEnable.moduleName} could not be found, did you copy the umd file to ${moduleToEnable.location}?`));
  // }

  private registerRoute(moduleToEnable: ModuleData) {
    // load up the umd file and register the route whenever succeeded.
    this.moduleService.loadModuleSystemJS(moduleToEnable).then((exports) => {
      this.routerService.createAndRegisterRoute(moduleToEnable, exports);
      // tslint:disable-next-line: max-line-length
    }, (err) => this.showError(`${moduleToEnable.moduleName} could not be found, did you copy the umd file to ${moduleToEnable.location}?`));

    // this.moduleService.loadModule(moduleToEnable).subscribe((exports) => {
    //   this.routerService.createAndRegisterRoute(moduleToEnable, exports);
    // });
  }

  private showError(message: string) {
    this.errorMessage = message;
    this.errorVisible = true;
  }

}
