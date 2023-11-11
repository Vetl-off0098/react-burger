import {
  FEED_CONNECTION_CLOSED,
  FEED_CONNECTION_ERROR,
  FEED_CONNECTION_SUCCESS, FEED_GET_MESSAGE,
  TWSActions,
} from "../action-types/wsActionTypes";

type TWSState = {
  error?: Event | null,
  orders: any[],
  total: number,
  totalToday: number,
  isOpen: boolean
}

const initialState:TWSState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isOpen: false,
  error: null
}

export const feedReducer = (state = initialState, action: TWSActions) => {
  switch (action.type) {
    case FEED_CONNECTION_SUCCESS:
      return {
        ...state,
        isOpen: true,
        error: null,
      }
    case FEED_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case FEED_CONNECTION_CLOSED:
      return {
        ...state,
        isOpen: false,
      }
    case FEED_GET_MESSAGE:
      return {
        ...state,
        orders: action.payload.data.orders,
        total: action.payload.data.total,
        totalToday: action.payload.data.totalToday
      }
    default:
      return state;
  }
}
