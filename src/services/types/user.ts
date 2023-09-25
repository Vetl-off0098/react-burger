export interface IUser {
  email: string,
  name: string
}

export interface IUserState {
  user: IUser |null,
  isAuthChecked: boolean,
}

export enum UserActionTypes {
  SET_AUTH_CHECKED = 'SET_AUTH_CHECKED',
  ADD_USER = 'ADD_USER'
}

interface ISetAuthCheckedAction {
  type: UserActionTypes.SET_AUTH_CHECKED;
  payload: boolean;
}

interface IAddUserAction {
  type: UserActionTypes.ADD_USER;
  payload: IUser | null;
}

export type TUserAction = ISetAuthCheckedAction | IAddUserAction
