import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Video } from '../model/video/video.model';
import { AppService } from '../app.service';
import appConfig from '../../assets/appConfig.json'
import { HttpHeaders } from '@angular/common/http';
import { tap, shareReplay } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  videos$ : Observable<Video[]>
  tag : string = 'All Videos'

 serverUri : string = appConfig.serverUri
  constructor(private appService : AppService) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    const requestOption = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      }),
    }
    this.videos$ = this.appService.getHome("GET" , `${this.serverUri}/home` , requestOption).pipe(
      shareReplay()
    )
  }

 
}
