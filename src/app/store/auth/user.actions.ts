import { createAction, props } from "@ngrx/store";

export const login = createAction(
    '[Auth] User Login Successfull',
    props<{userId: string}>()
);

export const logout = createAction('[Auth] User Logout Successfull')