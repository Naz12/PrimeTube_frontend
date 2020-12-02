import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { RequestCurrentVideo, RemoveVideo } from '../video.actions';
import { ActivatedRoute } from '@angular/router';
import { selectCurrentVideo } from '../video.selector';
import { Observable, Subject } from 'rxjs';
import { Video } from 'src/app/model/video/video.model';
import { tap } from 'rxjs/operators';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit, AfterViewInit , OnDestroy {

  videoId: string
  constructor(private store: Store<State>, private activatedRoute: ActivatedRoute , private videoService: VideoService) {
    
     this.activatedRoute.params.subscribe(params=>{
      this.videoId = params['videoId']
    })
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
   
  }

  ngOnDestroy() {
    
  }


}
