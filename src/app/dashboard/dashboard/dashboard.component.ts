import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ChannelCreateComponent } from '../channel-create/channel-create.component';
import { Observable } from 'rxjs';
import { Channel } from 'src/app/model/channel/channel.model';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';
import * as jwtDecode from 'jwt-decode'
import { tap } from 'rxjs/operators';
import { selectOwnChannels } from 'src/app/channel/channel.selector';
import { LoadOwnChannel } from 'src/app/channel/channel.actions';
import { CurrentUser } from 'src/app/model/user/currentUser.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  ownChannel$ : Observable<Channel[]>
  constructor(private dialog: MatDialog , private store : Store<State>) { }

  ngOnInit() {
    const token = localStorage.getItem("token");
    const userData = jwtDecode(token);
    this.store.dispatch(new LoadOwnChannel({channels : userData.createdChannel}))
    this.ownChannel$ = this.store.pipe(
      select(selectOwnChannels)
    )
  }

  onOpenDialog() {
    const dialogRef = this.dialog.open(ChannelCreateComponent, {
      height: '800px',
      width: '470px',
      autoFocus : true,
      disableClose : true,
    })

   
  }

}
