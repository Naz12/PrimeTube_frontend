import { Action } from '@ngrx/store';
import { CurrentUser } from "../model/user/currentUser.model";
import { AuthActions, AuthActionTypes } from './auth.actions';

export interface State {
  loggedIn: boolean,
  user: CurrentUser
}

export const initialState: State = {
  loggedIn: false,
  user: undefined
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.LoginAction:
      return {
        loggedIn: true,
        user: action.payload.user
      }

    case AuthActionTypes.LogoutAction:
      return {
        loggedIn: false,
        user: undefined
      }
    case AuthActionTypes.AddUserInfoAction:
      return {
        loggedIn: true,
        user: action.payload.user
      }
    case AuthActionTypes.RemoveUserInfoAction:
      return {
        loggedIn: true,
        user: undefined
      }
    default:
      return state;
  }
}
