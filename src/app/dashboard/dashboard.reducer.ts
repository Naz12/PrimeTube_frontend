import { Action } from '@ngrx/store';
import { EntityAdapter } from "@ngrx/entity";
import { dashboardAction, dashboardActionType } from './dashboard.action';
import { Live } from '../model/live/createLive.model';

export interface State {
  live: Live
}

export const initialState: State = {
  live: null
};

export function reducer(state = initialState, action: dashboardAction): State {
  switch (action.type) {

    case dashboardActionType.LiveStartAction: {
      return {
        live: action.payload.liveData
      }
    }

    case dashboardActionType.LiveStopAction: {
      return {
        live: null
      }
    }

    default:
      return state;
  }
}
