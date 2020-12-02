import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromVideoAction from './video.actions'
import { VideoService } from './video.service';
import appConfig from '../../assets/appConfig.json'
import { tap, exhaustMap, mergeMap, map } from 'rxjs/operators';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { of, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { Login } from '../auth/auth.actions';
import { Video } from '../model/video/video.model';




@Injectable()
export class VideoEffects {

  @Effect()
  currentVideoRequested$ = this.actions$.pipe(
    ofType<fromVideoAction.RequestCurrentVideo>(fromVideoAction.VideoActionTypes.RequestCurrentVideos),
    mergeMap(action => {
      const token = localStorage.getItem('token')
      const videoRequestOption = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`
        }),
      }

      console.log('from effects', action.payload.videoId);
      return this.videoService.getVideo("GET", `${this.serverUri}/video/watch/${action.payload.videoId}`, videoRequestOption)

    }),
    map(result => {
      console.log('video result from effects' , result);
      this.videoService.video$.next(result)
      return new fromVideoAction.LoadCurrentVideo({currentVideo : result , nextVideo : result})
    })
  )




  serverUri: string = appConfig.serverUri;
  constructor(private actions$: Actions, private videoService: VideoService, private store: Store<State> ) { }

}


