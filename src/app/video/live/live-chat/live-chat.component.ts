import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { LiveChatData } from "../../../model/live/createLive.model";
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { selectUser } from 'src/app/auth/auth.selector';
import { tap } from 'rxjs/operators';
import { CurrentUser } from 'src/app/model/user/currentUser.model';
@Component({
  selector: 'app-live-chat',
  templateUrl: './live-chat.component.html',
  styleUrls: ['./live-chat.component.css']
})
export class LiveChatComponent implements OnInit, OnDestroy {
  private videoId: string
  private currentUser: CurrentUser
  chatHistory: LiveChatData[]

  @ViewChild('chatText', { static: false }) chatInputText: ElementRef
  @ViewChild('messageArea', { static: false }) chatMessageArea: ElementRef
  public liveRoomUserCount: number
  constructor(private appService: AppService, private routeState: ActivatedRoute, private store: Store<State>) {
    routeState.parent.params.subscribe(params => {
      this.videoId = params["videoId"]

    })

  }

  ngOnInit() {
    this.store.pipe(
      select(selectUser),
      tap(result => {
        this.currentUser = result
        this.joinLiveRoom(this.videoId);
      })
    ).subscribe();
  }

  joinLiveRoom(liveRoomName: string) {
    this.appService.socket.emit('joinliveroom', liveRoomName);


    this.appService.socket.on('chathistory', (chatHistory: LiveChatData[]) => {
      console.log('chat history', chatHistory);
      this.chatHistory = chatHistory
    })

    //update user count
    this.appService.socket.on('updateusercount', userCount => {
      this.liveRoomUserCount = userCount
    })

    this.appService.socket.on('response', (chatData) => {
      console.log('receive chat from server', chatData);
      var message = this.displayChat(chatData);

      this.chatMessageArea.nativeElement.innerHTML += message
    })
  }

  displayChat(chatData: LiveChatData) {
    var message = `
    <mat-card class="mat-elevation-z0">
    <mat-card-header>
      <div mat-card-avatar>
        <img src="/assets/bk.jpeg" style="width: 50px; height: 50px; border-radius: 50%; padding-top: 15px;" mat-card-image>
      </div>
      <mat-card-title>${chatData.userId.username}</mat-card-title>
      <mat-card-subtitle>
      ${chatData.text}
      </mat-card-subtitle>
    </mat-card-header>
  </mat-card>
    `
    return message
  }

  sendChat() {
    var textData = this.chatInputText.nativeElement.value
    var data: LiveChatData = {
      roomId: this.videoId,
      userId: this.currentUser,
      text: textData,
      image: "image path placeholder"
    }
    this.appService.socket.emit('chat', data);

  }

  leaveLiveRoom(roomName: String) {
    this.appService.socket.emit('leaveliveroom', roomName)
  }

  ngOnDestroy() {
    this.leaveLiveRoom(this.videoId)
  }


  step = 0;
}
