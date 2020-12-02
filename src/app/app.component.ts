import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Observable, of, Subscription, Subject } from 'rxjs';
import { map, tap, filter, mergeMap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { State, ToggleOn, ToggleOff, toggelValue } from './reducers';
import { Logout } from './auth/auth.actions';
import { isLoggedIn, selectUser } from './auth/auth.selector';
import { channelSubscriptions, CurrentUser } from './model/user/currentUser.model';
import { AppService } from './app.service';
import appConfig from '../assets/appConfig.json'
import { HttpHeaders } from '@angular/common/http';
import { channelActions } from './channel/channel.actions';
import { RemoveVideo } from './video/video.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  title = 'PrimeTube';
  loggedIn$: Observable<boolean>
  togglesideNav$: Observable<boolean>

  subscriptions$: Observable<channelSubscriptions[]>

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Large)
    .pipe(
      map(result => result.matches),
    );

  serverUri: string = appConfig.serverUri;

  constructor(private breakpointObserver: BreakpointObserver, private store: Store<State>, public appService: AppService) {
    this.loggedIn$ = this.store.select(isLoggedIn)
    this.togglesideNav$ = this.store.select(toggelValue).pipe(
      tap(result => { console.log(result) })
    )

  }

  ngOnInit() {
  this.appService.connectToSocket();
   this.appService.subscriptions$ = new Subject<channelSubscriptions[]>();
   this.appService.currentUser$ = new Subject<CurrentUser>();
  }


  ngAfterViewInit() {
    this.store.pipe(
      select(selectUser),
      tap(result => this.appService.currentUser$.next(result)),
      map(result => result.subscriptions),
      tap(result => this.appService.subscriptions$.next(result))
    ).subscribe();

   
  }

  onToggel(): Observable<boolean> {
    return this.isHandset$.pipe(
      tap(mobileView => {
        if (!mobileView) {
          return this.store.dispatch(new ToggleOn())
        }
        else {
          return of(this.store.dispatch(new ToggleOff()))
        }
      })
    )
  }

  logOut() {
    this.subscriptions$ = of(null);
    this.store.dispatch(new ToggleOn());
    this.store.dispatch(new Logout());
    this.store.dispatch(new RemoveVideo())
   
  }
}
