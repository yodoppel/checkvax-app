import { createAction } from "@ngrx/store";

export const show = createAction("[Loading] show");  //create loading state
export const hide = createAction("[Loading] hide");