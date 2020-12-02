import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { UploadComponent } from './dashboard/upload/upload.component';
import { LiveDashboardComponent } from './dashboard/live-dashboard/live-dashboard.component';
import { HomeComponent } from './home/home.component';
import { VideoComponent } from './video/video/video.component';
import { VideoSuggestionComponent } from './video/video-suggestion/video-suggestion.component';
import { LiveChatComponent } from './video/live/live-chat/live-chat.component';
import { LiveHomeComponent } from './video/live/live-home/live-home.component';
import { ChannelComponent } from './channel/channel/channel.component';
import { ChannelHomeComponent } from './channel/channel-home/channel-home.component';
import { ChannelPlaylistComponent } from './channel/channel-playlist/channel-playlist.component';
import { ChannelVideoComponent } from './channel/channel-video/channel-video.component';
import { ChannelAboutComponent } from './channel/channel-about/channel-about.component';
import { routeActivateAuthGuard } from './auth/auth.guard';
import {LibraryComponent} from "./library/library.component";


const routes: Routes = [
  {
    path: 'watch/:videoId', component: VideoComponent,
    children: [
      { path: '', component: VideoSuggestionComponent },
      { path: 'live', component: LiveChatComponent }
    ]
  },

  { path: "auth/signup", component: SignupComponent },

  { path: 'auth/signin', component: SigninComponent },

  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      { path: 'home', component: UploadComponent },
      { path: 'live/:channelid/:streamkey', component: LiveDashboardComponent }
    ] ,
    canActivate : [routeActivateAuthGuard]
  },

  {
    path: 'channel/:channelId', component: ChannelComponent,
    children: [
      { path: 'home', component: ChannelHomeComponent },
      { path: 'playlists', component: ChannelPlaylistComponent },
      { path: 'videos', component: ChannelVideoComponent },
      { path: 'about', component: ChannelAboutComponent }
    ]
  },

  { path: 'home', component: HomeComponent },
  { path: 'library', component: LibraryComponent },
  { path: 'live', component: LiveHomeComponent  , canActivate : [routeActivateAuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
