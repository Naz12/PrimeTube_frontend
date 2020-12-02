import { Component, OnInit } from '@angular/core';
import {Observable, pipe, Subject} from "rxjs";
import {Video} from "../model/video/video.model";
import {CurrentUser} from "../model/user/currentUser.model";
import {AppService} from "../app.service";
import {HttpHeaders} from "@angular/common/http";
import appConfig from "../../assets/appConfig.json";
import {shareReplay} from "rxjs/operators";

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  videos$ : Subject<Video[]>
  currentUser : CurrentUser;
  likedVideos: Video[];
  serverUri : string = appConfig.serverUri
  constructor(private appService: AppService) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    const requestOption = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      }),
    }

    this.appService.getLibrary("GET" , `${this.serverUri}/auth/user/library` , requestOption).subscribe(user=>{
      this.currentUser = user;
      console.log(user);
      this.videos$.next(this.currentUser.likedVideoId as Video[])
      this.videos$.asObservable();
    });
  }

}
