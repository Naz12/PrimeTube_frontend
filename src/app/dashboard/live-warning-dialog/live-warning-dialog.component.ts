import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../dashboard.service';
import { State } from 'src/app/reducers';
import { Store, select } from '@ngrx/store';
import { selectActiveLivestream } from '../dashboard.selector';
import { map, tap, mergeMap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import appConfig from '../../../assets/appConfig.json'
import { SnackComponent } from '../snack/snack.component';
import { LiveStop } from '../dashboard.action';
@Component({
  selector: 'app-live-warning-dialog',
  templateUrl: './live-warning-dialog.component.html',
  styleUrls: ['./live-warning-dialog.component.css']
})
export class LiveWarningDialogComponent implements OnInit {

  serverUri = appConfig.serverUri
  constructor(private router: ActivatedRoute, private dashboardService: DashboardService, private store: Store<State> , 
    private snack : MatSnackBar  , private matDialogRef: MatDialogRef<LiveWarningDialogComponent>) { }

  ngOnInit() {


  }


  stopLiveStream(){
   this.store.pipe(
        select(selectActiveLivestream),
        map(result => {
          console.log('select result ', result)
          const token = localStorage.getItem('token');
  
          const liveData = {
            liveId: result._id,
            videoId: result.videoId,
            streamKey: result.streamKey
          }
  
          const liveStopRequest = {
            headers: new HttpHeaders({
              'Authorization': `Bearer ${token}`
            }),
            body: liveData
          }
          return liveStopRequest
        }),
        mergeMap(result => {
          return this.dashboardService.stopLvieStream("POST", `${this.serverUri}/live/stop`, result).pipe(
            tap(result => {
              console.log(result)
             
              
              this.snack.openFromComponent(SnackComponent, {
                duration: 10 * 1000,
                direction: "ltr", 
                horizontalPosition: "end",
                verticalPosition: "top"
              })
  
              this.store.dispatch(new LiveStop())

            })
          )
        }),
        tap(result => {
          console.log('final reslt ', result);
          this.matDialogRef.close();
        })
      ).subscribe()
  }

}
