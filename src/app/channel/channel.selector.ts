import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ownChannelState, selectAll , selectIds } from './channel.reducer';

const selectOwnChannelState = createFeatureSelector<ownChannelState>('channels');

// export const selectOwnChannel = (channelId : string) => createSelector(selectOwnChannelState , state => state.entities[channelId])
export const selectOwnChannels = createSelector(selectOwnChannelState , selectAll)