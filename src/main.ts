import { importProvidersFrom } from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app/app-routing';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule } from 'ngx-mask';
import { ExempleTemplateComponent } from './app/composants/exemple-template/exemple-template.component';
import { ExempleFormcontrolComponent } from './app/composants/exemple-formcontrol/exemple-formcontrol.component';
import { ExempleFormgroupComponent } from './app/composants/exemple-formgroup/exemple-formgroup.component';

bootstrapApplication(ExempleFormgroupComponent,{
  providers: [
    importProvidersFrom(RouterModule.forRoot(APP_ROUTES), BrowserAnimationsModule, NgxMaskModule.forRoot({validation: true}))]
});
