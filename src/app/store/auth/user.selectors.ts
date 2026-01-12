import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./user.reducer";

export const selectAuthFeature = createFeatureSelector<AuthState>('user');

export const selectUserId = createSelector(
    selectAuthFeature,
    (state) => state.userId
);

export const selectIsLoggedIn = createSelector(
    selectAuthFeature,
    (state) => state.isLoggedIn
);