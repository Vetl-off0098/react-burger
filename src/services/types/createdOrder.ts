interface IOrderState {
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

interface ICreatedOrderAction {
  type: CreatedOrderActionTypes.CREATE_ORDER;
  payload: any;
}

interface IToggleOrderAction {
  type: CreatedOrderActionTypes.TOGGLE_ORDER;
  payload: any;
}

export type TCreatedOrderAction = ICreatedOrderAction | IToggleOrderAction
