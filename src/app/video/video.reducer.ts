import { Action } from '@ngrx/store';
import { EntityAdapter } from '@ngrx/entity';
import { VideoActionTypes, VideoActions } from './video.actions';
import { Video } from '../model/video/video.model';


export interface State {
  currentVideo: Video
  nextVideo: Video
  videoPlayed: boolean
}

export const initialState: State = {
  currentVideo: null,
  nextVideo: null,
  videoPlayed: false
};

export function reducer(state = initialState, action: VideoActions): State {
  switch (action.type) {

    case VideoActionTypes.LoadCurrentVideos: {
      return {
        currentVideo: action.payload.currentVideo,
        nextVideo: action.payload.nextVideo,
        videoPlayed: true
      }
    }

    case VideoActionTypes.RemoveVideos : {
      return {
        currentVideo : null,
        nextVideo : null,
        videoPlayed : false
      }
    }

    default:
      return state;
  }
}
