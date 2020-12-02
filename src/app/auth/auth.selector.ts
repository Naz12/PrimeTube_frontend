import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './auth.reducer';


export const selectAuthState = createFeatureSelector<State>('auth');

export const isLoggedIn  = createSelector(selectAuthState , authstate => authstate.loggedIn)
export const selectUser = createSelector(selectAuthState , authstate => authstate.user)
export const selectOwnChannel = createSelector(selectUser , user => user.createdChannel)