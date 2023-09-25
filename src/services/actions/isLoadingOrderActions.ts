import {IsLoadingOrderActionTypes} from "../types/isLoadingOrder";

export const isLoadingOrderAction = (payload: boolean) => ({type: IsLoadingOrderActionTypes.SET_IS_LOADING_ORDER, payload})
