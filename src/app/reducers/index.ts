import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  Action
} from '@ngrx/store';
import { environment } from '../../environments/environment';

// ui state 
export interface uiState {
  toggeled: boolean
}

export const initialState: uiState = {
  toggeled: false
}

export class ToggleOn implements Action {
  readonly type = "Toggle On Action"
}

export class ToggleOff implements Action {
  readonly type = "Toggle Off Action"
}


//ui selector
export const selectUiState = appstate => appstate.toggeled;
export const toggelValue = createSelector(selectUiState , (value) => {
  console.log(!!value);
  return !!value})


export function stateReducer(state: uiState = initialState, action: ToggleOn|ToggleOff): uiState {
  switch (action.type) {
    case "Toggle On Action" : {
      return {
      toggeled : true
      }

    }

    case "Toggle Off Action" : {

      return {
      toggeled : false
      }

    }

    default: {
      return state
    }
  }
}




//  application state 
export interface State {

}

export const reducers: ActionReducerMap<State> = {
  'toggeled': stateReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
