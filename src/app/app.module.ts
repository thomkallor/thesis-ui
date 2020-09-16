import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { DockerImageComponent } from './docker-image/docker-image.component';
import { PackageCheckboxComponent } from './package-checkbox/package-checkbox.component';
import {MatButtonModule} from '@angular/material/button';
import { PackageFormComponent } from './package-form/package-form.component';
import {MatRadioModule} from '@angular/material/radio';
import { PythonRadiobuttonComponent } from './python-radiobutton/python-radiobutton.component';

@NgModule({
  declarations: [
    AppComponent,
    DockerImageComponent,
    PackageCheckboxComponent,
    PackageFormComponent,
    PythonRadiobuttonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatButtonModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
