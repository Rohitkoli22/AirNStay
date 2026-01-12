import { createReducer, on } from "@ngrx/store";
import { login, logout } from "./user.actions";
import { state } from "@angular/animations";

export interface AuthState{
    userId: string | null;
    isLoggedIn : boolean;
}

export const initialState : AuthState = {
    userId : null,
    isLoggedIn : false
};

export const authReducer = createReducer(
    initialState,

    on(login, (state,  { userId })=> ({
        userId,
        isLoggedIn : true
    })),

    on(logout, state => ({
        userId : null,
        isLoggedIn : false

    }))
);