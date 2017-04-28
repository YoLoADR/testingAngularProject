import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { CitationsComponent } from './components/citations/citations.component';

import { UserService } from './models';
import { CitationsService } from './service/citations.service';

@NgModule({
  declarations: [
    AppComponent,
    DynamicFormComponent,
    WelcomeComponent,
    CitationsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [UserService, CitationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
