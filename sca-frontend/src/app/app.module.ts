import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
// import { CalendarModule, DateAdapter } from 'angular-calendar';
// import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ExampleModule } from './example/example.module';
import { Mod1AssetsModule } from './mod1-assets/mod1-assets.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    // CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),

    CoreModule,
    ExampleModule,
    // SharedModule,
    Mod1AssetsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
