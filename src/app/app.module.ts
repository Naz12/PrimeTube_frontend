import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';

import { AuthModule } from "./auth/auth.module";
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import { EffectsModule } from '@ngrx/effects';
import { HomeComponent } from './home/home.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { FlexLayoutModule } from "@angular/flex-layout";
import { VideoModule } from './video/video.module';
import { AppService } from './app.service';
import { ChannelModule } from './channel/channel.module';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {LocalInterceptor} from "./local-interceptor";
import { LibraryComponent } from './library/library.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LibraryComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,

    VideoModule,
    MaterialModule,
    AuthModule,
    DashboardModule,
    ChannelModule,

    FlexLayoutModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : []



  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
