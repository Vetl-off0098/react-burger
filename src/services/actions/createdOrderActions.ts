import {CreatedOrderActionTypes} from "../types/createdOrder";

export const createOrderAction = (payload: any) => ({type: CreatedOrderActionTypes.CREATE_ORDER, payload})
export const toggleOrderAction = (payload: any) => ({type: CreatedOrderActionTypes.TOGGLE_ORDER, payload})
