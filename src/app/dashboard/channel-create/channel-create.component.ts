import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { fromEvent, of } from 'rxjs';
import { DashboardService } from '../dashboard.service';
import { exhaustMap, tap, map } from 'rxjs/operators';
import appConfig from '../../../assets/appConfig.json'
import { HttpHeaders } from '@angular/common/http';
import { Channel } from 'src/app/model/channel/channel.model';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { RemoveUserInfo, AddUserInfo } from 'src/app/auth/auth.actions';
import { AddOwnChannel } from 'src/app/channel/channel.actions';
import { selectUser } from 'src/app/auth/auth.selector';
@Component({
  selector: 'app-channel-create',
  templateUrl: './channel-create.component.html',
  styleUrls: ['./channel-create.component.css']
})
export class ChannelCreateComponent implements OnInit, AfterViewInit {
  @ViewChild('createButton', { static: false }) channelCreateButton: ElementRef

  createProgress: boolean = false
  serverUri = appConfig.serverUri
  channelForm: FormGroup
  constructor(private formbuilder: FormBuilder, private dashboardService: DashboardService, private matDialogRef: MatDialogRef<ChannelCreateComponent>,
    private store: Store<State>) { }

  ngOnInit() {
    this.channelForm = this.formbuilder.group({
      'channelName': ['', [Validators.required, Validators.maxLength(25)]],
      'channelDescription': ['', Validators.required]
    })
  }

  ngAfterViewInit() {

  }

  onChannelCreate() {
    this.createProgress = true
    const token = localStorage.getItem('token');
    const channelRequest = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      }),
      body: this.channelForm.value
    }
    this.dashboardService.createChannel("POST", `${this.serverUri}/channel/register`, channelRequest).subscribe(channelResult => {
      if(channelResult){
        this.store.pipe(
          select(selectUser),
          tap(userData => {
            console.log('data' , userData)
            userData.createdChannel = [...userData.createdChannel, channelResult]
            this.store.dispatch(new RemoveUserInfo())
            this.store.dispatch(new AddUserInfo({ user: userData }))
          })
        ).subscribe();
        this.createProgress = false
        this.matDialogRef.close()
      }
      
    })



  }

}
