import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './video.reducer';


export const selectVideoState = createFeatureSelector<State>('video')

export const selectCurrentVideo =  createSelector(selectVideoState , videostate => videostate.currentVideo )
export const selectNextVideo =  createSelector(selectVideoState , videostate => videostate.nextVideo )