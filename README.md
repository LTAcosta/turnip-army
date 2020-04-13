# Turnip Army
https://turnip.army/

A team based turnip price predictor for Animal Crossing. Mostly built as an excuse to play around with Google Firebase.

From from Mike Bryant's Turnip Prophet: https://github.com/mikebryant/ac-nh-turnip-prices

Based on the great work done by Ninji.

## Development

This project uses [Angular 9](https://angular.io/) and [Firebase](https://firebase.google.com/docs/) with the help of [AngularFire](https://github.com/angular/angularfire) and [Angular Material UI](https://material.angular.io/).

### Setup

- Install [Node.js](https://nodejs.org/) (8.9 or higher. Tested with 12.16.2)
- Install Angular CLI. Run `npm install -g @angular/cli@9.1.1`
- Install project dependencies. From this directory, run `npm install`
- Make a copy of `src/environments/environments.ts.example` as `src/environments/environments.ts`.
- Copy the Firebase SDK snippet from console web app settings. Paste it into `src/environments/environments.ts`. This allows you to run locally and is not needed in the production environment. This file is gitignored to reduce the risk of checking in credentials.

### Build and run

Run `ng serve` to build the app and start a local dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Deploy to Firebase

Run `ng deploy` to build the project and deploy it to Firebase.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
