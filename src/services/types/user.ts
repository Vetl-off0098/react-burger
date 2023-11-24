export interface IUser {
  email: string,
  name: string
}

export type TUser = {
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

export interface ISetAuthCheckedAction {
  readonly type: typeof UserActionTypes.SET_AUTH_CHECKED;
  readonly payload: boolean;
}

export interface IAddUserAction {
  readonly type: typeof UserActionTypes.ADD_USER;
  readonly payload: IUser | null;
}

export type TUserAction = ISetAuthCheckedAction | IAddUserAction
