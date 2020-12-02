import { Action } from '@ngrx/store';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Channel } from '../model/channel/channel.model';
import { channelActions, ChannelActionType } from './channel.actions';
import { channelSubscriptions } from '../model/user/currentUser.model';


export interface ownChannelState extends EntityState<Channel> {

}
export const ownChannelAdapter: EntityAdapter<Channel> = createEntityAdapter<Channel>({
  selectId : instance => instance._id
});
export const ownChannelInitialState: ownChannelState = ownChannelAdapter.getInitialState()


export function reducer(state = ownChannelInitialState, action: channelActions): ownChannelState {
  switch (action.type) {

    case ChannelActionType.AddOwnChannelAction: {
      return ownChannelAdapter.addOne(action.payload.channel, state);
    }

    case ChannelActionType.LoadOwnChannelAction: {
      return ownChannelAdapter.addAll(action.payload.channels, state)
    }
    
    default:
      return state;
  }
}
export const { selectAll ,selectIds} = ownChannelAdapter.getSelectors();





// export interface subscribedChannelState extends EntityState<channelSubscriptions> {

// }
// export const subscribedChannelAdapter: EntityAdapter<channelSubscriptions> = createEntityAdapter();
// export const subscribedChannelInitialState = subscribedChannelAdapter.getInitialState()


// export function subscribedChannelReducer(state: subscribedChannelState = subscribedChannelInitialState, action: channelActions) {
//   switch (action.type) {
//     case ChannelActionType.LoadSubscribedChannelAction: {
//       subscribedChannelAdapter.addAll(action.payload.channel, state);
//       break;
//     }
//   }
// }

// export const value =  { selectAll , selectEntities, selectIds }   = subscribedChannelAdapter.getSelectors();