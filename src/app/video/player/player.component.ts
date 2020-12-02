import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input, OnDestroy } from '@angular/core';
import * as shaka from 'shaka-player'
import appConfig from '../../../assets/appConfig.json'
import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { State, ToggleOff, ToggleOn } from 'src/app/reducers/index.js';
import { RequestCurrentVideo, LoadCurrentVideo, RemoveVideo } from '../video.actions.js';
import { Video } from 'src/app/model/video/video.model.js';
import { selectCurrentVideo, selectNextVideo } from '../video.selector.js';
import { tap } from 'rxjs/operators';
import { VideoService } from '../video.service';
import { Subject, of, Observable } from 'rxjs';
import {environment} from '../../../environments/environment';
const BACKEND_URL = environment.apiUrl
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, AfterViewInit {
  @ViewChild('player', { static: false }) videoPlayer: ElementRef
  videoElement: HTMLVideoElement
  serverUri = appConfig.serverUri
  videoId: string
  manifestUri: string
  videoData? : Video

  nextVideo: Video

  constructor(private activatedRoute: ActivatedRoute, private store: Store<State>, private videoService: VideoService, private router: Router) {
    this.activatedRoute.params.subscribe(params => {
      this.videoId = params["videoId"]
      this.videoService.video$ = new Subject();
      this.store.dispatch(new RequestCurrentVideo({ videoId: this.videoId }))
    })


  }



  onVideoEnded() {
    this.store.pipe(
      select(selectNextVideo),
      tap(result => {
        this.nextVideo = result
      })
    ).subscribe(result => {
      window.location.replace('/watch/5cf02f67d62b7e1713d30143');
    })

  }


  updateWatchCount(){
   setTimeout(() => {
    var uri = `${this.serverUri}/video/watch/${this.videoId}`
    this.videoService.updateWatchCount("PUT" , uri).pipe(
  ).subscribe()
   }, 5000);
  }


  ngOnInit() {
     this.updateWatchCount();

  }



  ngAfterViewInit() {

    document.addEventListener('shaka-ui-loaded', this.newinit);
    // Listen to the custom shaka-ui-load-failed event, in case Shaka Player fails
    // to load (e.g. due to lack of browser support).
    document.addEventListener('shaka-ui-load-failed', this.initFailed);



    this.videoService.video$.subscribe(result => {
      this.manifestUri = result.videoPath || result.livePath
      this.videoData = result
      this.videoService.video$.unsubscribe();
      if (shaka.Player.isBrowserSupported()) {
        //   // Everything looks good!
        this.videoElement = this.videoPlayer.nativeElement;
        this.initPlayer()
      } else {
        //   // This browser does not have the minimum set of APIs we need.
        console.error('Browser not supported!');
        // }
      }
    })



    // Listen to the custom shaka-ui-loaded event, to wait until the UI is loaded.
    // document.addEventListener('shaka-ui-loaded', this.initPlayer);
    // // Listen to the custom shaka-ui-load-failed event, in case Shaka Player fails
    // // to load (e.g. due to lack of browser support).
    // document.addEventListener('shaka-ui-load-failed', this.initFailed);
    // Check to see if the browser supports the basic APIs Shaka needs.

  }
















  initPlayer() {
    // const video = document.getElementById('video')
    // const ui = video['ui'];



    // const uiConfig = {
    //     addSeekBar: true
    // };

    // // uiConfig['controlPanelElements'] = ['rewind', 'fast_forward', 'skip'];
    // ui.configure(uiConfig)

    // const controls = ui.getControls();
    // // const pl = new Plyr(controls)
    // const player = controls.getPlayer();


    // player.addEventListener('error', this.onPlayerErrorEvent);
    // controls.addEventListener('error', this.onUIErrorEvent);

    // // Try to load a manifest.
    // // This is an asynchronous process.
    // try {
    //   await player.load(this.manifestUri);
    //   // This runs if the asynchronous load is successful.
    //   console.log('The video has now been loaded!');
    // } catch (error) {
    //   this.onErrorEvent(error);
    // }





    // Create a Player instance.
    // var video = document.getElementById('video');
    let player = new shaka.Player(this.videoElement);

    // Attach player to the window to make it easy to access in the JS console.
    // window.player = player;

    // Listen for error events.
    player.addEventListener('error', this.onErrorEvent);

    // // Try to load a manifest.
    // // This is an asynchronous process.
    player.load(this.manifestUri.replace('localhost', BACKEND_URL)).then(() => {
      //   // This runs if the asynchronous load is successful.

      console.log('The video has now been loaded!');
    }).catch(this.onError);  // onError is executed if the asynchronous load fails.
  }


  onPlayerErrorEvent(errorEvent) {
    // Extract the shaka.util.Error object from the event.
    this.onPlayerError(errorEvent);
  }

  onPlayerError(error) {
    // Handle player error
  }

  onUIErrorEvent(errorEvent) {
    // Handle UI error
  }

  initFailed() {
    // Handle the failure to load
  }

  private onErrorEvent(event) {
    // Extract the shaka.util.Error object from the event.
    this.onError(event.detail);
  }

  private onError(error) {
    console.log(error);
  }














  async  newinit() {

    this.manifestUri =
    'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd';
    // When using the UI, the player is made automatically by the UI object.
    const video = document.getElementById('video');
    const ui = video['ui'];
    const controls = ui.getControls();
    const player = controls.getPlayer();

    // Listen for error events.
    player.addEventListener('error', this.onPlayerErrorEvent);
    controls.addEventListener('error', onUIErrorEvent);

    // Try to load a manifest.
    // This is an asynchronous process.
    try {
      await player.load(this.manifestUri);
      // This runs if the asynchronous load is successful.
      console.log('The video has now been loaded!');
    } catch (error) {
      onPlayerError(error);
    }
  }









}


































 function onPlayerErrorEvent(errorEvent) {
  // Extract the shaka.util.Error object from the event.
  onPlayerError(event);
}

function onPlayerError(error) {
  // Handle player error
  console.error('Error code', error.code, 'object', error);
}

function onUIErrorEvent(errorEvent) {
  // Extract the shaka.util.Error object from the event.
  onPlayerError(event);
}

function initFailed() {
  // Handle the failure to load
  console.error('Unable to load the UI library!');
}

// Listen to the custom shaka-ui-loaded event, to wait until the UI is loaded.







