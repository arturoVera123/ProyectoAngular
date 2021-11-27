import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';
import {ObjToArrayPipe} from './ObjectToArrayPipe';
import { TestComponent } from './pages/test/test.component'




import { ReactiveFormsModule } from '@angular/forms'

const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
};


@NgModule({
  declarations: [
    AppComponent,
    ObjToArrayPipe,
    TestComponent,
    

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgWizardModule.forRoot(ngWizardConfig),
    HttpClientModule
    ,ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
