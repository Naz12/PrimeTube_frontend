import { Action } from '@ngrx/store';
import { Channel } from '../model/channel/channel.model';
import { channelSubscriptions } from '../model/user/currentUser.model';

export enum ChannelActionType {
  LoadSubscribedChannelAction = '[Home Page] Load ',
  AddSubscriptionAction = '[Subscribe Button] Add Subscription',
  RemoveSubscriptionAction = '[UnSubscribe Button] Remove Subscription',

  LoadOwnChannelAction = '[Dashboard Page] Load Own Channel ',
  AddOwnChannelAction = '[Subscribe Button] Add Own Channel',
  RemoveOwnChannelAction = '[UnSubscribe Button] Remove Own Channel'
}

export class LoadSubscribedChannel implements Action {
  readonly type = ChannelActionType.LoadSubscribedChannelAction;
  constructor(public payload: { channel: channelSubscriptions[] }) {

  }
}

export class AddSubscription implements Action {
  readonly type = ChannelActionType.AddSubscriptionAction;
  constructor(public payload: { channel: channelSubscriptions }) {

  }
}

export class LoadOwnChannel implements Action {
readonly type = ChannelActionType.LoadOwnChannelAction
constructor(public payload : {channels : Channel[]}){}
}

export class AddOwnChannel implements Action{
  readonly type = ChannelActionType.AddOwnChannelAction
  constructor(public payload : {channel : Channel}){}
}


export type channelActions = LoadSubscribedChannel | AddSubscription | LoadOwnChannel | AddOwnChannel
