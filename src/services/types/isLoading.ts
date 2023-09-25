export interface IIsLoadingState {
  isLoading: boolean;
}

export enum IsLoadingActionTypes {
  SET_IS_LOADING = 'SET_IS_LOADING',
}

interface ISetIsLoadingAction {
  type: IsLoadingActionTypes.SET_IS_LOADING;
  payload: boolean;
}

export type TIsLoadingAction = ISetIsLoadingAction
