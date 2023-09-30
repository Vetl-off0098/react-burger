import {IsLoadingOrderAction, IsLoadingOrderActionTypes} from "../types/isLoadingOrder";

export const isLoadingOrderAction = (payload: boolean): IsLoadingOrderAction => ({type: IsLoadingOrderActionTypes.SET_IS_LOADING_ORDER, payload})
