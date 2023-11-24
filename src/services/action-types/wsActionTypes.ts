export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';

export const ORDERS_CONNECTION_INIT: 'ORDERS_CONNECTION_INIT' = 'ORDERS_CONNECTION_INIT';
export const ORDERS_CONNECTION_CLOSE: 'ORDERS_CONNECTION_CLOSE' = 'ORDERS_CONNECTION_CLOSE';
export const ORDERS_CONNECTION_SUCCESS: 'ORDERS_CONNECTION_SUCCESS' = 'ORDERS_CONNECTION_SUCCESS';
export const ORDERS_CONNECTION_CLOSED: 'ORDERS_CONNECTION_CLOSED' = 'ORDERS_CONNECTION_CLOSED';
export const ORDERS_CONNECTION_ERROR: 'ORDERS_CONNECTION_ERROR' = 'ORDERS_CONNECTION_ERROR';
export const ORDERS_GET_MESSAGE: 'ORDERS_GET_MESSAGE' = 'ORDERS_GET_MESSAGE';
export const ORDERS_SEND_MESSAGE: 'ORDERS_SEND_MESSAGE' = 'ORDERS_SEND_MESSAGE';

export const FEED_CONNECTION_INIT: 'FEED_CONNECTION_INIT' = 'FEED_CONNECTION_INIT';
export const FEED_CONNECTION_CLOSE: 'FEED_CONNECTION_CLOSE' = 'FEED_CONNECTION_CLOSE';
export const FEED_CONNECTION_SUCCESS: 'FEED_CONNECTION_SUCCESS' = 'FEED_CONNECTION_SUCCESS';
export const FEED_CONNECTION_CLOSED: 'FEED_CONNECTION_CLOSED' = 'FEED_CONNECTION_CLOSED';
export const FEED_CONNECTION_ERROR: 'FEED_CONNECTION_ERROR' = 'FEED_CONNECTION_ERROR';
export const FEED_GET_MESSAGE: 'FEED_GET_MESSAGE' = 'FEED_GET_MESSAGE';
export const FEED_SEND_MESSAGE: 'FEED_SEND_MESSAGE' = 'FEED_SEND_MESSAGE';

export interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: any,
}
export interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
  readonly payload: any,
}
export interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: any,
}
export interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
  readonly payload: any,
}
export interface IWsGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: any,
}
export interface IWsSendMessage {
  readonly type: typeof WS_SEND_MESSAGE;
  readonly payload: any,
}

export interface IOrdersConnectionInit {
  readonly type: typeof ORDERS_CONNECTION_INIT;
  readonly payload: any,
}
export interface IOrdersConnectionClose {
  readonly type: typeof ORDERS_CONNECTION_CLOSE;
  readonly payload: any,
}
export interface IOrdersConnectionSuccess {
  readonly type: typeof ORDERS_CONNECTION_SUCCESS;
  readonly payload: any,
}
export interface IOrdersConnectionClosed {
  readonly type: typeof ORDERS_CONNECTION_CLOSED;
  readonly payload: any,
}
export interface IOrdersConnectionError {
  readonly type: typeof ORDERS_CONNECTION_ERROR;
  readonly payload: any,
}
export interface IOrdersGetMessage {
  readonly type: typeof ORDERS_GET_MESSAGE;
  readonly payload: any,
}
export interface IOrdersSendMessage {
  readonly type: typeof ORDERS_SEND_MESSAGE;
  readonly payload: any,
}

export interface IFeedConnectionInit {
  readonly type: typeof FEED_CONNECTION_INIT;
  readonly payload: any,
}
export interface IFeedConnectionClose {
  readonly type: typeof FEED_CONNECTION_CLOSE;
  readonly payload: any,
}
export interface IFeedConnectionSuccess {
  readonly type: typeof FEED_CONNECTION_SUCCESS;
  readonly payload: any,
}
export interface IFeedConnectionClosed {
  readonly type: typeof FEED_CONNECTION_CLOSED;
  readonly payload: any,
}
export interface IFeedConnectionError {
  readonly type: typeof FEED_CONNECTION_ERROR;
  readonly payload: any,
}
export interface IFeedConnectionMessage {
  readonly type: typeof FEED_GET_MESSAGE;
  readonly payload: any,
}
export interface IFeedSendMessage {
  readonly type: typeof FEED_SEND_MESSAGE;
  readonly payload: any,
}

export type TWSActions = IWsConnectionStart
  | IWsConnectionSuccess
  | IWsConnectionError
  | IWsConnectionClosed
  | IWsGetMessage
  | IWsSendMessage

  | IFeedConnectionInit
  | IFeedConnectionClose
  | IFeedConnectionSuccess
  | IFeedConnectionClosed
  | IFeedConnectionError
  | IFeedConnectionMessage
  | IFeedSendMessage

export type TOrdersActions = IOrdersConnectionInit
  | IOrdersConnectionClose
  | IOrdersConnectionSuccess
  | IOrdersConnectionClosed
  | IOrdersConnectionError
  | IOrdersGetMessage
  | IOrdersSendMessage
