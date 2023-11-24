export interface IIsLoadingState {
  isLoading: boolean;
}

export enum IsLoadingActionTypes {
  SET_IS_LOADING = 'SET_IS_LOADING',
}

export interface ISetIsLoadingAction {
  readonly type: typeof IsLoadingActionTypes.SET_IS_LOADING;
  readonly payload: boolean;
}

export type TIsLoadingAction = ISetIsLoadingAction
