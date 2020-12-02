import { Component, OnInit, Input } from '@angular/core';
import { Video } from 'src/app/model/video/video.model';
import { Observable } from 'rxjs';
import { liveFromChannel, popularLive, previouslyLive } from 'src/app/shared/constants';
import appConfig from "../../../assets/appConfig.json";
import { AppService } from 'src/app/app.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { PremmiumComponent } from '../premmium/premmium.component';

@Component({
  selector: 'app-video-card-list',
  templateUrl: './video-card-list.component.html',
  styleUrls: ['./video-card-list.component.css']
})
export class VideoCardListComponent implements OnInit {
  @Input('tag') videoTag : string
  @Input('videos') videos$ : Observable<Video[]>
  
  videoTypes : String[] = appConfig.videotypes
  currentlyLive = liveFromChannel;

  liveRoomUserCount : any
  constructor(private appService : AppService , private httpclient : HttpClient , private matDialog : MatDialog) { }

  ngOnInit() {

  }


  // liveCount(liveId){
  //   this.appService.socket.emit('getliveroommembersnumber' , liveId)
  //   this.appService.socket.on('updateusercount', userCount => {
  //     console.log('live user count' , userCount)
  //     this.liveRoomUserCount = userCount

  //   })
  // }

  pay(video : Video){
    console.log('check video' , video);
   var dialogRef =  this.matDialog.open(PremmiumComponent , {
     height : '600px',
     width : '450px',
     data : video,
     disableClose : true
   })
  }

}


