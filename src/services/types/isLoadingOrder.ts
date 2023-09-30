export interface IIsLoadingOrderState {
  isLoadingOrder: boolean,
}

export enum IsLoadingOrderActionTypes {
  SET_IS_LOADING_ORDER = 'SET_IS_LOADING_ORDER',
}

export interface IsLoadingOrderAction {
  readonly type: typeof IsLoadingOrderActionTypes.SET_IS_LOADING_ORDER;
  readonly payload: boolean;
}

export type TIsLoadingOrderAction = IsLoadingOrderAction
