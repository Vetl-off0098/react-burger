import {
  IWsConnectionClosed,
  IWsConnectionError,
  IWsConnectionStart,
  IWsConnectionSuccess,
  IWsGetMessage,
  IWsSendMessage,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE
} from "../action-types/wsActionTypes";

export const wsConnectionStart = (payload: any): IWsConnectionStart => ({type: WS_CONNECTION_START, payload});
export const wsConnectionSuccess = (payload: any): IWsConnectionSuccess => ({type: WS_CONNECTION_SUCCESS, payload});
export const wsConnectionError = (payload: any): IWsConnectionError => ({type: WS_CONNECTION_ERROR, payload});
export const wsConnectionClosed = (payload: any): IWsConnectionClosed => ({type: WS_CONNECTION_CLOSED, payload});
export const wsGetMessage = (payload: any): IWsGetMessage => ({type: WS_GET_MESSAGE, payload});
export const wsSendMessage = (payload: any): IWsSendMessage => ({type: WS_SEND_MESSAGE, payload});
