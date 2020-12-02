import { Action } from '@ngrx/store';
import { Video } from '../model/video/video.model';

export enum VideoActionTypes {
  LoadVideoSuggestions = '[Player] Video Suggestion Loaded',

  RequestCurrentVideos = '[Video] Current Video Requested',
  LoadCurrentVideos= '[API] Current Load Videos',

  RequestNextVideos = '[Player] Next Video Requested',
  LoadNextVideos = '[API] Next Video Loaded',

  StartVideos = '[Player] Video Started',
  EndVideos = '[Player] Video Ended',
  RemoveVideos ='[Side Nav] Video Removed From Store'

}

export class VideoSuggestionLoaded implements Action {
  readonly type = VideoActionTypes.LoadVideoSuggestions
}

export class RequestCurrentVideo implements Action {
  readonly type = VideoActionTypes.RequestCurrentVideos;
  constructor(public payload: { videoId: string }) {

  }
}

export class LoadCurrentVideo implements Action {
  readonly type = VideoActionTypes.LoadCurrentVideos
  constructor(public payload: { currentVideo: Video , nextVideo : Video }) {

  }
}

export class RequestNextVideo implements Action {
  readonly type = VideoActionTypes.RequestNextVideos;
}

export class LoadNextVideo implements Action {
  readonly type = VideoActionTypes.LoadNextVideos;
  constructor(public payload: { videoId: string }) {

  }
}

export class StartVideo implements Action {
  readonly type = VideoActionTypes.StartVideos;
}

export class EndVideo implements Action {
  readonly type = VideoActionTypes.EndVideos;
}

export class RemoveVideo implements Action {
  readonly type = VideoActionTypes.RemoveVideos;
}

export type VideoActions = RequestCurrentVideo | LoadCurrentVideo | RequestNextVideo | LoadNextVideo | StartVideo | EndVideo | RemoveVideo;
