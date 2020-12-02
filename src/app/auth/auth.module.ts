import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from './auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth.effects';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChannelEffects } from '../channel/channel.effects';

@NgModule({
  declarations: [SigninComponent, SignupComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule , 
    FlexLayoutModule,
    HttpClientModule,
    MaterialModule, StoreModule.forFeature('auth', fromAuth.reducer), 
    EffectsModule.forFeature([AuthEffects ])
  ] , 
  providers : [
    AuthService
  ]
})
export class AuthModule { }
