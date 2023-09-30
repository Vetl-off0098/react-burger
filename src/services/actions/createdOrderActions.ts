import {CreatedOrderActionTypes, ICreatedOrderAction, IOrderState, IToggleOrderAction} from "../types/createdOrder";

export const createOrderAction = (payload: IOrderState): ICreatedOrderAction => ({type: CreatedOrderActionTypes.CREATE_ORDER, payload})
export const toggleOrderAction = (payload: boolean): IToggleOrderAction => ({type: CreatedOrderActionTypes.TOGGLE_ORDER, payload})
