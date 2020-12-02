import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { isLoggedIn } from './auth.selector';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';


@Injectable()
export class routeActivateAuthGuard implements  CanActivate{
  constructor(private store : Store<State> , private router : Router){}
  canActivate(route  : ActivatedRouteSnapshot , routeState : RouterStateSnapshot) : Observable<boolean> | boolean{
      return  this.store.select(isLoggedIn).pipe(
          tap(result =>{
              if(result){
               return  of(true)
              }
              else{
                this.router.navigateByUrl('/auth/signin')
                return of(false);
              
              }
          })
      )
  }
}

