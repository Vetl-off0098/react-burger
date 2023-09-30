import {UserActionTypes, IUser, ISetAuthCheckedAction, IAddUserAction} from "../types/user";

export const setAuthChecked = (payload: boolean): ISetAuthCheckedAction => ({type: UserActionTypes.SET_AUTH_CHECKED, payload})
export const addUserAction = (payload: IUser | null): IAddUserAction => ({type: UserActionTypes.ADD_USER, payload})
