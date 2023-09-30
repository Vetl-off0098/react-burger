export interface IOrderState {
  isOpen: boolean,
  isSuccess: boolean,
  orderId: string,
}

export interface ICreatedOrderState {
  order: IOrderState
}

export enum CreatedOrderActionTypes {
  CREATE_ORDER = 'CREATE_ORDER',
  TOGGLE_ORDER = 'TOGGLE_ORDER'
}

export interface ICreatedOrderAction {
  readonly type: typeof CreatedOrderActionTypes.CREATE_ORDER;
  readonly payload: IOrderState;
}

export interface IToggleOrderAction {
  readonly type: typeof CreatedOrderActionTypes.TOGGLE_ORDER;
  readonly payload: boolean;
}

export type TCreatedOrderAction = ICreatedOrderAction | IToggleOrderAction
