import { enableProdMode } from '@angular/core';
import { FIREBASE_OPTIONS } from '@angular/fire';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// Load the config from Firebase Hosting so that we don't have to define it explicitly
// From: https://stackoverflow.com/questions/56431192/inject-default-firebase-config-into-angular-app
// Also watching this issue, since there is a better way to do this coming in the future:
// https://github.com/angular/angularfire/issues/2360
function loadConfig() {
  return environment.production ?
    fetch('/__/firebase/init.json')
      .then(response => response.json())
    : Promise.resolve(environment.firebase);
}

(async () => {
  const config = await loadConfig();

  platformBrowserDynamic([{ provide: FIREBASE_OPTIONS, useValue: config }])
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
})();
