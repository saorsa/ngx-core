import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxInspectModule } from 'ngx-core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxUtilsModule} from "../../../ngx-core/src/ngx-utils";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxUtilsModule,
    NgxInspectModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
