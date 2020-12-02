import { Action } from '@ngrx/store';
import { CurrentUser } from '../model/user/currentUser.model';

export enum AuthActionTypes {
  LoginAction = '[Login page] LoggedIn',
  LogoutAction = '[Home Page] LoggedOut',
  AddUserInfoAction = '[Video Description] AddInfo',
  RemoveUserInfoAction = '[video Description] RemoveInfo'

  
}


export class Login implements Action{
  readonly type = AuthActionTypes.LoginAction

  constructor(public payload : {user : CurrentUser , token : string}){

  }
}



export class Logout implements Action {
  readonly type = AuthActionTypes.LogoutAction;
}

export class AddUserInfo implements Action{
  readonly type = AuthActionTypes.AddUserInfoAction
  constructor(public payload : { user : CurrentUser}){

  }
}

export class RemoveUserInfo implements Action{
  readonly type = AuthActionTypes.RemoveUserInfoAction
}


export type AuthActions = Login | Logout | AddUserInfo | RemoveUserInfo;
