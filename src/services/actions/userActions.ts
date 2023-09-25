import {UserActionTypes, IUser} from "../types/user";

export const setAuthChecked = (payload: boolean) => ({type: UserActionTypes.SET_AUTH_CHECKED, payload})
export const addUserAction = (payload: IUser | null) => ({type: UserActionTypes.ADD_USER, payload})
