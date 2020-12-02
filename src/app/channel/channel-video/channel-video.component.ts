import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-channel-video',
  templateUrl: './channel-video.component.html',
  styleUrls: ['./channel-video.component.css']
})
export class ChannelVideoComponent implements OnInit {

  channelId : string
  constructor(private activatedRoute : ActivatedRoute) {
     activatedRoute.parent.params.subscribe(params =>{
       this.channelId = params['channelId']
      
     })
   }
  ngOnInit() {
  }

}
