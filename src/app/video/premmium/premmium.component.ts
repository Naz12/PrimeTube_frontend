import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef  , MAT_DIALOG_DATA } from '@angular/material';
import { VideoService } from '../video.service';
import appConfig from "../../../assets/appConfig.json";
import { Video, CartItem } from 'src/app/model/video/video.model';
import { HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Url } from 'url';

@Component({
  selector: 'app-premmium',
  templateUrl: './premmium.component.html',
  styleUrls: ['./premmium.component.css']
})
export class PremmiumComponent implements OnInit , AfterViewInit {

  paymentUrl: Url
  isvideoInfoLoaded : boolean = false
  videoData : Video
  constructor( private videoService : VideoService ,   private matDialogRef: MatDialogRef<PremmiumComponent>  ,@Inject(MAT_DIALOG_DATA) private data : Video ) { }

  ngOnInit() {

  }

  ngAfterViewInit(){
    this.videoData = this.data
    
    var cartItem : CartItem ={
      itemId : this.videoData._id,
      itemName : this.videoData.videoTittle,
      unitPrice : this.videoData.price === 0 ? 10.99 : this.videoData.price,
      quantity : 1
    }
    const token = localStorage.getItem('token');
    const requestOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      }),
      body: cartItem
    }
    var url = `${appConfig.serverUri}/video/premium`

    this.videoService.getPaymentUrl("POST" , url , requestOptions).pipe(
      tap(result =>{
        console.log('it' , result)
      })
    ).subscribe(
      result =>{
      console.log('res' , result);
      this.paymentUrl = new URL(result)
      this.isvideoInfoLoaded = true
    })
  }

}
