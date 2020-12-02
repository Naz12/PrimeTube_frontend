import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { tap, shareReplay, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Video } from 'src/app/model/video/video.model';
import appConfig from '../../../assets/appConfig.json'
import { AppService } from 'src/app/app.service.js';
import { VideoService } from 'src/app/video/video.service.js';
import { ChannelService } from '../channel.service';

@Component({
  selector: 'app-channel-home',
  templateUrl: './channel-home.component.html',
  styleUrls: ['./channel-home.component.css']
})
export class ChannelHomeComponent implements OnInit {

  videos$: Observable<Video[]>

  uploads$: Observable<Video[]>;
  tag: string = 'All Videos'

  populars$: Observable<Video[]>

  serverUri: string = appConfig.serverUri

  channelId: string
  constructor(private activatedRoute: ActivatedRoute, private channelService: ChannelService) {
    
  }

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe(params => {
      this.channelId = params['channelId']

      const token = localStorage.getItem('token');
      const requestOption = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`
        }),
      }
      this.videos$ = this.channelService.getChannelHome("GET", `${this.serverUri}/channel/${this.channelId}/home`, requestOption).pipe(
        tap(response => {
          console.log('channel home response', response)
          // this.uploads = response['uploads'];
          // this.populars = response['popular']
        }),
        shareReplay()
      )
  
      this.uploads$ = this.videos$.pipe(
        map(response => response['uploads'])
      )
  
      this.populars$ = this.videos$.pipe(
        map(response => response['popular'])
      )

    })

  }

}
