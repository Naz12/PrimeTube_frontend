import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromAuthAction from './auth.actions'
import { tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { defer, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { selectUser } from './auth.selector';
import { CurrentUser } from '../model/user/currentUser.model';
import * as jwtDecode from 'jwt-decode'
import { AppService } from '../app.service';
import { AuthService } from './auth.service';
import appConfig from '../../assets/appConfig.json'
import { HttpHeaders } from '@angular/common/http';
import { LoadOwnChannel } from '../channel/channel.actions';
import { dispatch } from 'rxjs/internal/observable/range';

@Injectable()
export class AuthEffects {

  @Effect({dispatch : false})
  login$ = this.actions$.pipe(
    ofType<fromAuthAction.Login>(fromAuthAction.AuthActionTypes.LoginAction),
    tap(action => {
      localStorage.setItem('token', action.payload.token)
      this.appService.subscriptions$.next(action.payload.user.subscriptions);
      this.appService.currentUser$.next(action.payload.user);
    }),
    
  )

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType<fromAuthAction.Logout>(fromAuthAction.AuthActionTypes.LogoutAction),
    tap(action => {
      localStorage.removeItem('token');
      this.appService.subscriptions$.next(null);
      this.router.navigateByUrl('/auth/signin');
    })
  )

  @Effect()
  init$ = defer(() => {

    const token = localStorage.getItem("token");
    const userData = jwtDecode(token);
    const tokenExpDate = new Date(0).setUTCSeconds(userData.exp)
    if (token && (tokenExpDate.valueOf() > new Date().valueOf())) {
      const requestData = {
        headers: new HttpHeaders({
          "Authorization": "Bearer " + token,
        })
      }
       return of( new fromAuthAction.Login({ user: userData as CurrentUser, token: token }))

    }
    else {
      return of(new fromAuthAction.Logout());
    }

  });

  constructor(private actions$: Actions, private router: Router, private store: Store<State>, private appService: AppService, private authService: AuthService) { }

}
