import { UserRouteComponent } from './Components/home/user/user-route/user-route.component';
import { UserComponent } from './Components/home/user/user.component';
import { ViewRouteComponent } from './Components/home/view/view-route/view-route.component';
import { ViewComponent } from './Components/home/view/view.component';
import { MainNavComponent } from './Components/other/main-nav/main-nav.component';
import { MaterialModule } from './Modules/material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './Components/home/home.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SampleComponent } from './sample/sample.component';

@NgModule( {
  declarations: [
    AppComponent,
    MainNavComponent,
    HomeComponent,
    ViewComponent,
    ViewRouteComponent,
    UserComponent,
    UserRouteComponent,
    SampleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
} )
export class AppModule { }
