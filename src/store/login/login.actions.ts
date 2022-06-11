import { createAction, props } from "@ngrx/store";
import { User } from "src/app/model/user/User";

//actions

//actions are instruction we gonna sent to the store to let
//the store know how it should update itself

export const recoverPassword = createAction("[Recover password]");
export const recoverPasswordSuccess = createAction("[Recover password] success");
export const recoverPasswordFail = createAction("[Recover password] fail", props<{error:any}>());

export const login = createAction("[Login]");
export const loginSuccess = createAction("[Login] success", props<{user: User}>());
export const loginFail = createAction("[Login] fail", props<{error: any}>());









