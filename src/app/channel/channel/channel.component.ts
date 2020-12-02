import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChannelService } from '../channel.service';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Channel } from 'src/app/model/channel/channel.model';

import appConfig from '../../../assets/appConfig.json'
import { shareReplay, tap } from 'rxjs/operators';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {
  channelId: string
  channel: Channel

  serverUri: string = appConfig.serverUri
  constructor(private activatedRoute: ActivatedRoute, private channelService: ChannelService) {

    activatedRoute.params.subscribe(params => {
      this.channelId = params['channelId']
      this.getChannel()
    })

    // this.activatedRoute.pathFromRoot.forEach(route => route.params.subscribe(params => {
    //   this.channelId = params['channelId']
    // }))
  }

  ngOnInit() {

  }

  getChannel() {
    const token = localStorage.getItem('token');
    const requestOption = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      }),
    }
    this.channelService.getChannel("GET", `${this.serverUri}/channel/${this.channelId}`, requestOption).pipe(
      tap(response => {
        this.channel = response;
      })
    ).subscribe()
  }

}
