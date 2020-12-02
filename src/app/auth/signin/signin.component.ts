import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

import * as jwtDecode from 'jwt-decode'
import appConfig from '../../../assets/appConfig.json'
import { map, tap, exhaustMap, mergeMap, catchError, finalize } from 'rxjs/operators';
import { fromEvent, throwError, Subject } from 'rxjs';
import { Store, resultMemoize } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { Login } from '../auth.actions';
import { Router } from '@angular/router';
import { MessageService, AppService } from 'src/app/app.service';
import { channelSubscriptions } from 'src/app/model/user/currentUser.model';
import { LoadOwnChannel } from 'src/app/channel/channel.actions';
import { Channel } from 'src/app/model/channel/channel.model';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, AfterViewInit {

  loginForm: FormGroup
  errorMessage: string = ''
  @ViewChild("signinButton", { static: false }) signinButton: ElementRef;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private appService: AppService,
    private store: Store<State>) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
      rememberMe: true
    })

  }

  onLogin() {
    if (this.loginForm.valid) {
      this.authService.signin("POST", `${appConfig.serverUri}/auth/signin`, this.loginForm.value).pipe(
        catchError((errors) => {
          this.errorMessage = 'invalid Email or Password'
          return throwError(errors)
        }),
        tap(response => {
          const token: string = response['token']

          const decodeToken = jwtDecode(token);
          console.log('tok' , decodeToken);
          this.appService.subscriptions$.next(decodeToken['subscriptions'] as channelSubscriptions[]);
          this.store.dispatch(new Login({ user: decodeToken, token: token }))
          console.log('c channels' , decodeToken['createdChannel'])
          this.store.dispatch(new LoadOwnChannel({channels : Array.from( decodeToken['createdChannel'])}))
          this.router.navigateByUrl('/home')
        })
      ).subscribe()
    }
  }

  facebookSignIn() {
    console.log('alskdjf;alskdfj')
    this.authService.signinWithFacebook('GET', `${appConfig.serverUri}/auth/facebook`).subscribe(reuslt => {
      console.log(reuslt);
    })
  }

  ngAfterViewInit() {

  }



}
