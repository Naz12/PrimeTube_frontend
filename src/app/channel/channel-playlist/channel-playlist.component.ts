import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-channel-playlist',
  templateUrl: './channel-playlist.component.html',
  styleUrls: ['./channel-playlist.component.css']
})
export class ChannelPlaylistComponent implements OnInit {

  channelId : string
  constructor(private activatedRoute : ActivatedRoute) {
     activatedRoute.parent.params.subscribe(params =>{
       this.channelId = params['channelId']
     
     })
   }

  ngOnInit() {
  }

}
