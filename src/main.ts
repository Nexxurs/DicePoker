/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {vemetric} from "@vemetric/web";

vemetric.init({
  token: "szsQBkk5tWK4hIaK"
})

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
