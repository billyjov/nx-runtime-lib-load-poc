declare const require: any;

const moduleMap = {};

export function loadModule(umdFileName: string): Promise<any> {
  return new Promise<any>((resolve, reject) => {

    if (moduleMap[umdFileName]) {
      resolve(window);
      return;
    }

    const script = document.createElement('script');
    script.src = umdFileName;

    script.onerror = reject;

    script.onload = () => {
      moduleMap[umdFileName] = true;
      // window is the global namespace
      resolve(window);
    }

    document.body.append(script);
  });
}

export function initExternalsDependencies(isProduction: boolean) {
  (window as any).ng = {};
  (window as any).ng.core = require('@angular/core');
  (window as any).ng.forms = require('@angular/forms');
  (window as any).ng.common = require('@angular/common');
  (window as any).ng.router = require('@angular/router');
  (window as any).ng.platformBrowser = require('@angular/platform-browser');

  if (!isProduction) {
    (window as any).ng.platformBrowserDynamic = require('@angular/platform-browser-dynamic');
    (window as any).ng.compiler = require('@angular/compiler');
  }
}
