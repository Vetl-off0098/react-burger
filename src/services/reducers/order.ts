import {IOrder} from "../../models/feed";
import {GET_ORDER_FAILED, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, TOrderActions} from "../actions/order";

export type TOrderState = {
  // newOrderData: TOrder | null;
  // isNewOrderLoading: boolean;
  // newOrderError: unknown;

  orderByNumber: IOrder | null;
  isOrderByNumberLoading: boolean;
  orderByNumberError: unknown;
};

const initialState: TOrderState = {
  // newOrderData: null,
  // isNewOrderLoading: false,
  // newOrderError: null,

  orderByNumber: null,
  isOrderByNumberLoading: false,
  orderByNumberError: null,
};

export const orderReducer = (state = initialState, action: TOrderActions): TOrderState => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        isOrderByNumberLoading: true,
        orderByNumberError: null,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderByNumber: action.payload.orders[0],
        isOrderByNumberLoading: false,
        orderByNumberError: null,
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        isOrderByNumberLoading: false,
        orderByNumberError: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
