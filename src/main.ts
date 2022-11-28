import { importProvidersFrom } from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app/app-routing';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




bootstrapApplication(AppComponent,{
  providers: [
    importProvidersFrom(RouterModule.forRoot(APP_ROUTES), BrowserAnimationsModule, BrowserAnimationsModule)]
});
