import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { VideoService } from '../../video.service';
import { Observable } from 'rxjs';
import { Video } from 'src/app/model/video/video.model';
import appConfig from '../../../../assets/appConfig.json'
import { shareReplay, map, tap } from 'rxjs/operators';
import { liveFromChannel , popularLive , previouslyLive } from 'src/app/shared/constants';


@Component({
  selector: 'app-live-home',
  templateUrl: './live-home.component.html',
  styleUrls: ['./live-home.component.css']
})



export class LiveHomeComponent implements OnInit {

  livevideos$ : Observable<Video[]>

  fromSubscription$ : Observable<Video[]>
  fromPOpular$ : Observable<Video[]>
  previouslyLive$ : Observable<Video[]>
  serverUri : String

    currentlyLive = liveFromChannel;
    popularLive = popularLive
    previouslyLive = previouslyLive

  constructor(private videoService : VideoService) {

   }

  ngOnInit() {
    this.serverUri = appConfig.serverUri
    const token = localStorage.getItem('token');
    const liveRequestOption = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      }),
    }

    this.livevideos$ = this.videoService.getLiveVideos("GET" , `${this.serverUri}/live/home`  , liveRequestOption).pipe(
      shareReplay()
    )
    this.fromSubscription$ = this.livevideos$.pipe(  
      map(liveResult => liveResult['subscriptions'] as Video[]),
      tap(result =>{
        console.log('subscription result ' , result)
      }),
     
    )

    this.fromPOpular$ =this.livevideos$.pipe(   
      map(liveResult => liveResult['popular'] as Video[]),
      tap(result =>{
        console.log('popular result ' , result)
      }),
      
     
    )

    this.previouslyLive$ =this.livevideos$.pipe(   
      map(liveResult => liveResult['previouslyLive'] as Video[]),
      tap(result =>{
        console.log('prev result ' , result)
      }),
      
     
    )
  }

}
