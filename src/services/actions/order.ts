import {IOrder} from "../../models/feed";
import {AppDispatch, AppThunk, AppValidThunk} from "../reducers";
import {getOrderByNumber as getOrderByNumberApi} from "../../utils/burger-api";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";

export type TGetOrderRequestAction = {
  readonly type: typeof GET_ORDER_REQUEST;
};

export type TGetOrderSuccessAction = {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly payload: {
    orders: IOrder[];
  };
};

export type TGetOrderFailedAction = {
  readonly type: typeof GET_ORDER_FAILED;
  readonly payload: unknown;
};

export type TOrderActions =
  | TGetOrderRequestAction
  | TGetOrderSuccessAction
  | TGetOrderFailedAction;


export const getOrderByNumber = (number: number): AppValidThunk<Promise<unknown>> => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_ORDER_REQUEST,
  });

  return getOrderByNumberApi(number)
    .then((res) => {
      dispatch({
        type: GET_ORDER_SUCCESS,
        payload: res,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ORDER_FAILED,
        payload: err,
      });
    });
};
