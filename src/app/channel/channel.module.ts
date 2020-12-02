import { NgModule } from "@angular/core";
import { ChannelService } from './channel.service';
import { ChannelAboutComponent } from './channel-about/channel-about.component';
import { ChannelVideoComponent } from './channel-video/channel-video.component';
import { ChannelPlaylistComponent } from './channel-playlist/channel-playlist.component';
import { ChannelHomeComponent } from './channel-home/channel-home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import { ChannelComponent } from './channel/channel.component';
import { RouterModule } from '@angular/router';
import { VideoModule } from '../video/video.module';
import { VideoService } from '../video/video.service';
import { AppService } from '../app.service';
import { StoreModule } from '@ngrx/store';
import * as fromChannel from './channel.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ChannelEffects } from './channel.effects';

@NgModule({
    imports: [
        FlexLayoutModule, MaterialModule, RouterModule, VideoModule,
        StoreModule.forFeature('channels', fromChannel.reducer),
        EffectsModule.forFeature([ChannelEffects])
    ],

    declarations: [
        ChannelAboutComponent, ChannelVideoComponent, ChannelPlaylistComponent, ChannelHomeComponent, ChannelComponent
    ],

    exports: [
        ChannelAboutComponent, ChannelVideoComponent, ChannelPlaylistComponent, ChannelHomeComponent, ChannelComponent
    ],

    providers: [
        ChannelService,

    ],
})
export class ChannelModule {

}