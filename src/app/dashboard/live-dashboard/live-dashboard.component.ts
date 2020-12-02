import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import appConfig from '../../../assets/appConfig.json'
import { ActivatedRoute } from '@angular/router';
import { Subject, Observable, of, Observer, timer } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DashboardService } from '../dashboard.service';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { map, tap, mergeMap, retryWhen, delayWhen } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers/index';
import { Channel } from 'src/app/model/channel/channel.model';
import { LiveStart, LiveStop } from '../dashboard.action';
import { selectActiveLivestream } from '../dashboard.selector';
import * as shaka from 'shaka-player'
import { MatSnackBar, MatDialog } from '@angular/material';
import { SnackComponent } from '../snack/snack.component';
import { LiveWarningDialogComponent } from '../live-warning-dialog/live-warning-dialog.component';
import { category } from 'src/app/shared/constants.js';
import { selectOwnChannels } from 'src/app/channel/channel.selector.js';


@Component({
  selector: 'app-live-dashboard',
  templateUrl: './live-dashboard.component.html',
  styleUrls: ['./live-dashboard.component.css']
})
export class LiveDashboardComponent implements OnInit, AfterViewInit {

  @ViewChild('videoPlayer', { static: false }) videoElementRef: ElementRef;
  videoElement: HTMLVideoElement;


  livestreamServerUri = appConfig.liveServerUri
  serverUri = appConfig.serverUri
  manifestUri: string
  channelId: string
  streamKeyInfo: string
  streamKey: string
  thumbnailImage: File

  isLiveActive$: Observable<boolean>
  isLivestart$: Observable<boolean>

  stopSignal: boolean = true
  startSignal: boolean = true
  saveLiveStream: boolean = false

  videoCategory: string[]
  channelToLivestream$: Observable<Channel>
  liveForm: FormGroup

  player = null;

  constructor(private router: ActivatedRoute, private formbuidler: FormBuilder, private dashboardService: DashboardService, private store: Store<State>,
    private snack: MatSnackBar, private dialog: MatDialog) {

    this.router.params.subscribe(params => {
      this.channelId = params['channelid']

      this.channelToLivestream$ = this.store.pipe(
        select(selectOwnChannels),
        map(channelresults => {
          return channelresults.filter(channel => channel._id.toString() === this.channelId)[0]
        })
      )
    })

    this.router.params.subscribe(params => {
      this.streamKey = params['streamkey']
    })

    this.isLiveActive$ = of(false);
    this.manifestUri = `${this.livestreamServerUri}/${this.streamKey}/index.mpd`
  }

  ngOnInit() {

    this.videoCategory = category
    this.liveForm = this.formbuidler.group({
      'liveTittle': ['', Validators.required],
      'liveDescription': ['', Validators.required],
      'liveTag': ['', [Validators.required]],
      'rtmpServer': this.livestreamServerUri,
      'streamKey': this.streamKey

    })
  }

  // manifestUri = 'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd';

  ngAfterViewInit() {
    shaka.polyfill.installAll();


    if (shaka.Player.isBrowserSupported()) {
      // Everything looks good!
      this.videoElement = this.videoElementRef.nativeElement;
      this.initPlayer();
    } else {
      // This browser does not have the minimum set of APIs we need.
      console.error('Browser not supported!');
    }
  }


  private initPlayer() {
    this.player = new shaka.Player(this.videoElement);
    this.player.addEventListener('error', this.onErrorEvent);


    // this.player.load(this.manifestUri).then(() => {
    //   // This runs if the asynchronous load is successful.

    //   // this.stopSignal=false

    //   console.log('The video has now been loaded!');
    // }).catch(this.onError);  // onError is executed if the asynchronous load fails.

    this.loadLiveVideo(this.manifestUri).pipe(
      retryWhen(errors => errors.pipe(
        delayWhen(() => timer(3000))
      ))
    ).subscribe()
  }

  private onErrorEvent(event) {
    // Extract the shaka.util.Error object from the event.
    this.onError(event.detail);
  }

  private onError(error) {
    console.log(error);
  }


  onImageFileChange(event) {
    this.thumbnailImage = event.target.files[0];
  }


  startLiveStream() {
    this.startSignal = true
    this.stopSignal = false
    this.saveLiveStream = true;

    const liveData: FormData = new FormData();
    liveData.append('videoTittle', this.liveForm.get('liveTittle').value)
    liveData.append('videoDescription', this.liveForm.get('liveDescription').value);
    liveData.append('liveTag', this.liveForm.get('liveTag').value)
    liveData.append('originalThumbnailPath', this.thumbnailImage);
    liveData.append('channelId', this.channelId)
    liveData.append('streamKey', this.streamKey)

    const token = localStorage.getItem('token');
    const liveRequest = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      }),
      body: liveData
    }

    this.dashboardService.startLiveStream("POST", `${this.serverUri}/live/create`, liveRequest).pipe(
      tap(result => {
        console.log(result);
        this.saveLiveStream = false
        this.store.dispatch(new LiveStart({ liveData: result }))
      })
    ).subscribe()
  }



  loadLiveVideo(manifesturi: string): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.player.load(manifesturi).then(result => {
        observer.next(result);
        this.isLiveActive$ = of(true);
        this.startSignal = false
        observer.complete()
      }).catch(error => {
        observer.error(error);
      })
    })
  }


  stopLivestream() {
    // this.stopSignal = true
    this.saveLiveStream = true;

    const dialogRef = this.dialog.open(LiveWarningDialogComponent, {
      height: '600px',
      width: '400px',
      autoFocus: true,
      disableClose: true,

    })


    dialogRef.afterClosed().subscribe(observer => {
      console.log('observer', observer);
      if (observer == "yes") {
        this.startSignal = false;
        this.saveLiveStream = false;
      }

    })

  }




  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

}

