import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from '../dashboard.service';
import { Observable, noop, Subject } from 'rxjs';
import * as decodetoken from 'jwt-decode'
import appConfig from '../../../assets/appConfig.json'
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Channel } from 'src/app/model/channel/channel.model';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { tap, flatMap, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { SnackComponent } from '../snack/snack.component';
import { Video, UploadData } from 'src/app/model/video/video.model';
import { selectOwnChannel } from 'src/app/auth/auth.selector';

export interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent implements OnInit ,AfterViewInit{

  videoFile: File = null;
  imageFile: File = null;
  imagePreviewUrl : string

  channelCreated$: Observable<Channel[]>
  videoUploads: UploadData[] = []
  videoProcessedFinishedIndicator: boolean[] = []
  uploadCount: number = 0
  uploadInProgress$: Subject<UploadData[]> = new Subject<UploadData[]>();
  displayUploadForm: boolean = true;
  addvideoButtonDisableTracker : boolean = false


  progressValue: Number | boolean
  isVideoProcessed: boolean = false
  isVideoUploaded: boolean = false
  uploadForm: FormGroup

  isPremium: boolean = false
  uploadNotification: boolean = true;
  serverUri = appConfig.serverUri

  constructor(private formBuilder: FormBuilder, private dashboardService: DashboardService, private store: Store<State>, private snack: MatSnackBar) { }

  ngOnInit() {

    this.channelCreated$ = this.store.pipe(select(selectOwnChannel))


    this.uploadForm = this.formBuilder.group({
      // 'videoPath': [''],
      // 'thumbnailPath': [''],
      'tittle': ['', Validators.required],
      'description': '',
      'tag': [[], [Validators.required]],
      'channelId': ['', Validators.required],
      'premium': false,
      'amount': 0,
      'creditCard': '',


    })

    this.uploadForm.get('premium').valueChanges.subscribe(value => {
      const amountController = this.uploadForm.get('amount')
      const creditCardController = this.uploadForm.get('creditCard')
      if (value) {

        this.isPremium = true;
        amountController.setValidators(Validators.required);
        creditCardController.setValidators([Validators.required])
        amountController.updateValueAndValidity();
        creditCardController.updateValueAndValidity();
      } else {
        amountController.clearValidators();
        creditCardController.clearValidators()
      }
    })

  }


  ngAfterViewInit(): void {
    var dropPortion = document.getElementById('dropzone')
    dropPortion.ondragover =  ()=> {
      this.addvideoButtonDisableTracker = false
      this.videoFile = null
      dropPortion.className = 'dropzone dragover'
      return false;
    }
     
    dropPortion.ondrop  = (e)=>{
      e.preventDefault()
      this.addvideoButtonDisableTracker = true
      this.onVideoFileChange(e.dataTransfer.files[0])
      dropPortion.className = 'dropzone';
      
    }

    dropPortion.ondragleave = ()=>{
      this.addvideoButtonDisableTracker = false
      dropPortion.className = 'dropzone';
      return false
    }
    
  }


  onVideoFileChange(videoFile) {
    this.videoFile = videoFile,
      this.uploadForm.patchValue({
        tittle: this.videoFile.name
      })
    console.log('video file ', this.videoFile)
  }

  onImageFileChange(event) {
    this.imageFile = event.target.files[0]
    var reader = new FileReader();
    
    reader.onload = ()=>{
      this.imagePreviewUrl = reader.result as string
    }
    reader.readAsDataURL(this.imageFile)
    console.log('image file ', this.imageFile)
  }


  newvalue() {
    var count = 0;
    setInterval(() => {

    })
  }




  upload() {

    this.isVideoUploaded = true
    const videoForm = new FormData();
    videoForm.append('originalVideoPath', this.videoFile)
    videoForm.append('originalThumbnailPath', this.imageFile)
    videoForm.append('videoTittle', this.uploadForm.get('tittle').value)
    videoForm.append('videoDescription', this.uploadForm.get('description').value)
    videoForm.append('videoTag', this.uploadForm.get('tag').value)
    videoForm.append('channelId', this.uploadForm.get('channelId').value)
    videoForm.append('premium', this.uploadForm.get('premium').value)
    videoForm.append('amount', this.uploadForm.get('amount').value)
    videoForm.append('creditCard', this.uploadForm.get('creditCard').value)


    const token = localStorage.getItem("token")
    const uploadMetadata = {
      reportProgress: true,
      headers: new HttpHeaders({
        "Authorization": "Bearer " + token,
      })
    }
    this.uploadCount += 1;
    this.dashboardService.uploadVideo("POST", `${appConfig.serverUri}/video/upload?uploadId=${this.uploadCount}`, videoForm, uploadMetadata).subscribe(
      result => {
        this.progressValue = result
        if (this.progressValue == false) {
          this.isVideoUploaded = false
          // this.isVideoProcessed = false

          this.snack.openFromComponent(SnackComponent, {
            duration: 10 * 1000,
            direction: "ltr",
            horizontalPosition: "start",
            verticalPosition: "top",
            data: 'some data is missing make sure you insert the whole field'
          })
        }
        else {
          if (result == 100) {
            this.isVideoUploaded = false
            // this.isVideoProcessed = true
            this.displayUploadForm = false
            this.videoProcessedFinishedIndicator.push(true);
            var uploadData: UploadData = {
              id: this.uploadCount,
              videoTittle: this.uploadForm.get('tittle').value,
              isProcessed: true,
              channelName: this.uploadForm.get('channelId').value,
              videoType: this.uploadForm.get('premium').value == true ? "PREMIUM" : "FREE"
            }
            this.videoUploads.push(uploadData);
            this.uploadInProgress$.next(this.videoUploads);


            this.snack.openFromComponent(SnackComponent, {
              duration: 10 * 1000,
              direction: "ltr",
              horizontalPosition: "end",
              verticalPosition: "top",
              data: 'the video is now in processing. now you can leave this page '
            })
          }
        }
      },
      noop,
      () => {
        this.dashboardService.uploadId.subscribe(result => {
          console.log('upload id is ', result);
          this.videoProcessedFinishedIndicator.splice(result - 1, 1, false)
          console.log('final', this.videoProcessedFinishedIndicator)
        })


      })

  }

  makeVideoPremium() {

  }


  addUploadForm() {
    this.uploadForm.reset();
    this.displayUploadForm = true
    this.videoFile = null;
    this.addvideoButtonDisableTracker = false
  }


}

