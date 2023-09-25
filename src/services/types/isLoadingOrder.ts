export interface IIsLoadingOrderState {
  isLoadingOrder: boolean,
}

export enum IsLoadingOrderActionTypes {
  SET_IS_LOADING_ORDER = 'SET_IS_LOADING_ORDER',
}

interface IsLoadingOrderAction {
  type: IsLoadingOrderActionTypes.SET_IS_LOADING_ORDER;
  payload: boolean;
}

export type TIsLoadingOrderAction = IsLoadingOrderAction
