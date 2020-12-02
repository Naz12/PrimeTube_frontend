import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './dashboard.reducer';



export const selectDashbaordState = createFeatureSelector<State>('dashboard')

export const selectActiveLivestream = createSelector(selectDashbaordState , state => state.live)