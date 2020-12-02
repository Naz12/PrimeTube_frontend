import { NgModule } from "@angular/core";
import { VideoComponent } from './video/video.component';
import { VideoSuggestionComponent } from './video-suggestion/video-suggestion.component';
import { VideoListComponent } from './video-list/video-list.component';
import { VideoCardListComponent } from './video-card-list/video-card-list.component';
import { PlayerComponent } from './player/player.component';
import { VideoDescriptionComponent } from './video-description/video-description.component';
import { LiveChatComponent } from './live/live-chat/live-chat.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import * as fromVideo from './video.reducer';
import { EffectsModule } from '@ngrx/effects';
import { VideoEffects } from './video.effects';
import { HttpClientModule } from '@angular/common/http';
import { VideoService } from './video.service';
import { LiveHomeComponent } from './live/live-home/live-home.component';
import { routeActivateAuthGuard } from '../auth/auth.guard';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../dashboard/dashboard.service';
import { AppService } from '../app.service';
import { PremmiumComponent } from './premmium/premmium.component';

@NgModule({
    declarations: [
        VideoComponent, VideoSuggestionComponent, VideoListComponent, VideoCardListComponent, PlayerComponent, VideoDescriptionComponent, LiveChatComponent, LiveHomeComponent
        , PremmiumComponent
    ],

    imports: [
        BrowserModule,
        FlexLayoutModule,
        MaterialModule,
        RouterModule,
        FormsModule,
        HttpClientModule,
        StoreModule.forFeature('video', fromVideo.reducer),
        EffectsModule.forFeature([VideoEffects])
    ],

    exports: [
        VideoComponent, VideoSuggestionComponent, VideoListComponent, VideoCardListComponent, PlayerComponent, VideoDescriptionComponent , PremmiumComponent
    ],
    entryComponents:[
        PremmiumComponent
    ],

    providers: [
     VideoService , routeActivateAuthGuard , DashboardService , AppService
    ],
})
export class VideoModule {

}