import { NgModule } from "@angular/core";
import { UploadComponent } from './upload/upload.component';
import { LiveDashboardComponent } from './live-dashboard/live-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StoreModule } from '@ngrx/store';
import * as fromDashboard from './dashboard.reducer';
import { Route, Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { DashboardService } from './dashboard.service';
import { CommonModule } from '@angular/common';
import { ChannelCreateComponent } from './channel-create/channel-create.component';
import { SnackComponent } from './snack/snack.component';
import { LiveWarningDialogComponent } from './live-warning-dialog/live-warning-dialog.component';
import { routeActivateAuthGuard } from '../auth/auth.guard';


export const routes: Routes = [
    {
        path: '', component: DashboardComponent,
        children: [
            { path: 'home', component: UploadComponent },
            { path: 'live', component: LiveDashboardComponent }
        ]
    }

]

@NgModule({
    imports: [
        StoreModule.forFeature('dashboard', fromDashboard.reducer),
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        CommonModule,

        FlexLayoutModule,
        MaterialModule
    ],

    exports: [UploadComponent, DashboardComponent, LiveDashboardComponent, ChannelCreateComponent , SnackComponent , LiveWarningDialogComponent],
    providers: [DashboardService , routeActivateAuthGuard],
    declarations: [UploadComponent, DashboardComponent, LiveDashboardComponent, ChannelCreateComponent , SnackComponent,LiveWarningDialogComponent],
    entryComponents: [ChannelCreateComponent  , LiveWarningDialogComponent, SnackComponent , ]
})

export class DashboardModule {

}