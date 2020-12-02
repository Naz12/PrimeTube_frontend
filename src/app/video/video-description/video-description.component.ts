import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { Observable, of, noop, throwError, Subject } from 'rxjs';
import { Video } from 'src/app/model/video/video.model';
import { selectCurrentVideo } from '../video.selector';
import { tap, map, filter, catchError } from 'rxjs/operators';
import { VideoService } from '../video.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import appConfig from '../../../assets/appConfig.json'
import { selectUser } from 'src/app/auth/auth.selector';
import { AppService } from 'src/app/app.service';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import { RemoveUserInfo, AddUserInfo } from 'src/app/auth/auth.actions';
import { channelSubscriptions, CurrentUser } from 'src/app/model/user/currentUser.model';
import { saveAs } from 'file-saver';
import { Channel } from 'src/app/model/channel/channel.model';

@Component({
  selector: 'app-video-description',
  templateUrl: './video-description.component.html',
  styleUrls: ['./video-description.component.css']
})
export class VideoDescriptionComponent implements OnInit, AfterViewInit, OnDestroy {

  videoInfo?: Video
  selectedVideoForDownload: string
  videoTypes: String[] = appConfig.videotypes

  downloadProgressResult: Number | boolean
  allowNotification: boolean = false;
  channelId?: string
  subscriptions: channelSubscriptions[] = []
  createdChannels : Channel[] = []
  isSubscribed: boolean = false;

  isLiked: boolean = false
  isDisliked: boolean = false

  User: CurrentUser

  serverUri = appConfig.serverUri

  public liveRoomUserCount: number

  @ViewChild('likeCount', { static: false }) likeCount: ElementRef;
  @ViewChild('dislikeCount', { static: false }) dislikeCount: ElementRef
  constructor(private store: Store<State>, private videoService: VideoService, private appService: AppService, private http: HttpClient, private dashboardService: DashboardService) {

  }

  ngOnInit() {
    this.countLiveUser()

    this.videoService.video$.subscribe(result => {
      this.videoInfo = result
      this.store.pipe(
        select(selectUser),
        tap(user => {
          this.User = user;
          this.createdChannels = user.createdChannel
          var likeIndex = this.videoInfo.like.findIndex((element) => {
            return element.userId.toString() === user._id.toString()
          })
          var dislikeIndex = this.videoInfo.dislike.findIndex((element) => {
            return element.userId.toString() === user._id.toString()
          })
          if (likeIndex > -1) {
            this.isLiked = true;
            this.isDisliked = false
          }
          if (dislikeIndex > -1) {
            this.isLiked = false;
            this.isDisliked = true
          }
        }),
        map(result => {
          this.subscriptions = result.subscriptions;
          return this.subscriptions
        }),
        map(result => {
          this.channelId = this.videoInfo.channelId._id
          return result.some(element => element.channelId._id === this.channelId)
        })
      ).subscribe(result => {
        if (result == true) {
          this.isSubscribed = result
        }
      })
    })
  }

  ngAfterViewInit() {


  }


  ngOnDestroy() {
    this.isSubscribed = false
    this.channelId = null
  }



  subscribeChannel() {
    const token = localStorage.getItem('token');
    if (token) {

      const subscriptionData = {
        channelId: this.channelId,
        allowNotification: this.allowNotification
      }

      const requestData = {
        reportProgress: true,
        headers: new HttpHeaders({
          "Authorization": "Bearer " + token,
        }),
        body: subscriptionData
      }



      this.videoService.subscribeChannel("POST", `${this.serverUri}/channel/subscribe`, requestData).subscribe(result => {
        if (result) {
          console.log('ch', result)
          var subscriptionInfo: channelSubscriptions = {
            _id: null,
            allowNotification: true,
            channelId: this.videoInfo.channelId
          }
          this.subscriptions = [...this.User.subscriptions, subscriptionInfo]
          this.appService.subscriptions$.next(this.subscriptions)
          this.isSubscribed = true
        }
      })
    }
  }



  unsubscribeChannel() {
    //check token
    //send request and catch error and update ui
    const token = localStorage.getItem('token');
    if (token) {

      const requestData = {
        reportProgress: true,
        headers: new HttpHeaders({
          "Authorization": "Bearer " + token,
        }),
        body: { channelId: this.channelId }
      }

      this.videoService.unsubscribeChannel("POST", `${this.serverUri}/channel/unsubscribe`, requestData).pipe(
        catchError(error => {
          return throwError(error)
        })
      ).subscribe(result => {
        console.log('unsubscription result', result)
        console.log('subs is ' , this.subscriptions)
        var index = this.subscriptions.findIndex(element => { return element.channelId._id === result })
        console.log('index is' , index)
        if (index > -1) {
          this.subscriptions.splice(index, 1);
          this.appService.subscriptions$.next(this.subscriptions)
          this.isSubscribed = false
        }


      }, error => {
        console.log('error', error);
      })
    }
  }


  countLiveUser() {
    //update user count
    this.appService.socket.on('updateusercount', userCount => {
      this.liveRoomUserCount = userCount

    })
  }

  like() {
    const token = localStorage.getItem('token');
    if (token) {
      const requestData = {
        headers: new HttpHeaders({
          "Authorization": "Bearer " + token,
        })
      }
      var url = `${this.serverUri}/video/like/${this.videoInfo._id}`;
      this.videoService.likeVideo("PUT", url, requestData).pipe(
        catchError(error => {
          console.log('like error', error);
          return throwError(error);
        }),
        tap(result => {
          var value: string = (parseInt(this.likeCount.nativeElement.innerText) + 1).toString();
          this.likeCount.nativeElement.innerText = value

          if (this.isDisliked) {
            var dvalue: string = (parseInt(this.dislikeCount.nativeElement.innerText) - 1).toString();
            this.dislikeCount.nativeElement.innerText = dvalue;
          }

          this.isLiked = true
          this.isDisliked = false
        })
      ).subscribe()
    }

  }

  dislike() {
    const token = localStorage.getItem('token');
    if (token) {
      const requestData = {
        headers: new HttpHeaders({
          "Authorization": "Bearer " + token,
        })
      }
      var url = `${this.serverUri}/video/dislike/${this.videoInfo._id}`;
      this.videoService.likeVideo("PUT", url, requestData).pipe(
        catchError(error => {
          console.log('like error', error);
          return throwError(error);
        }),
        tap(result => {
          console.log('dis', result);
          var dvalue: string = (parseInt(this.dislikeCount.nativeElement.innerText) + 1).toString();
          this.dislikeCount.nativeElement.innerText = dvalue;

          if (this.isLiked) {
            var value: string = (parseInt(this.likeCount.nativeElement.innerText) - 1).toString();
            this.likeCount.nativeElement.innerText = value
          }

          this.isLiked = false
          this.isDisliked = true
        })
      ).subscribe()
    }
  }

  DownloadVideo() {
    var id = this.selectedVideoForDownload.split('/')[4]
    var resolution = this.selectedVideoForDownload.split('/')[5]
    console.log(resolution);
    const url = `${this.serverUri}/video/download/${id}/${resolution}`
    const token = localStorage.getItem("token")
    const downloadMetaData = {
      reportProgress: true,
      responseType: 'blob',
      headers: new HttpHeaders({
        "Authorization": "Bearer " + token
      })
    }
    this.dashboardService.downloadVideo("GET", url, downloadMetaData).subscribe(
      percentageResult => {
        this.downloadProgressResult = percentageResult
        console.log('result', this.downloadProgressResult);
        if (this.downloadProgressResult == 100) {

        }
        else if (this.downloadProgressResult == false) {
          console.log("there is error in downloading");
        } else {

        }

      },
      noop,
      () => {
        console.log('donwload completed');
      })

    this.dashboardService.downloadedFile$.subscribe(result => {
      console.log(result);
      saveAs(result, `${this.videoInfo.videoTittle}_${resolution}`)
    })

  }

  checkCreatedChannel(channelId : String , channels : Channel[]){
    var index = this.createdChannels.findIndex(element =>{
      return element._id === channelId
    })
    if(index > -1){
      return true
    }
  }

  OnDestroy(): void {
    this.isLiked = false;
    this.isDisliked = false;

  }


}
