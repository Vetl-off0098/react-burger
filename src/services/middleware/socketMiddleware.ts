import {Middleware, MiddlewareAPI} from "redux";
import {AppDispatch, RootState, TFeedsWsAcions, TOrdersWsAcions} from "../reducers";
import {TWSActions} from "../action-types/wsActionTypes";

export const socketMiddleware = (wsActions: TFeedsWsAcions | TOrdersWsAcions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null;

    return next => (action: TWSActions) => {
      console.log(action)
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const {
        wsInit,
        wsClose,
        wsSendMessage,
        onOpen,
        onClose,
        onError,
        onMessage
      } = wsActions;

      if (type === wsInit) {
        console.log(payload)
        socket = new WebSocket(payload);
        console.log(socket)
      }
      if (socket) {
        socket.onopen = event => {
          // dispatch(wsConnectionSuccess(event));
          console.log('socket onopen')
          dispatch({type: onOpen, payload: event});
          // dispatch({type: 'WS_CONNECTION_SUCCESS', payload: event});
        };

        socket.onerror = event => {
          dispatch({type: onError, payload: event});
          // dispatch({type: 'WS_CONNECTION_ERROR', payload: event});
        };
        socket.onmessage = event => {
          const {data} = event;
          const parsedData = JSON.parse(data);
          dispatch({type: onMessage, payload: {data: parsedData, timestamp: new Date().getTime() / 100}})
          // dispatch({type: 'WS_GET_MESSAGE', payload: data});
        };
        socket.onclose = event => {
          dispatch({type: onClose, payload: event})
          // dispatch({type: 'WS_CONNECTION_CLOSED', payload: event});
        };
      }

      if (wsClose && type === wsClose && socket) {
        socket.close();
      }

      if (wsSendMessage && type === wsSendMessage && socket) {
        socket.send(JSON.stringify(payload))
      }

      next(action);
    }
  }) as Middleware;
};

// export const socketMiddlewareWithReconnect = (wsActions: IWsActions): Middleware => {
//   return (store: MiddlewareAPI<AppDispatch, RootState>) => {
//     let socket: WebSocket | null;
//     let isConnected: boolean = false;
//     let reconnectTimer: number = 0;
//     let url: string = "";
//
//     return (next) => (action: TWSActions) => {
//       const {dispatch} = store;
//       const {
//         wsConnect,
//         wsDisconnect,
//         wsSendMessage,
//         onOpen,
//         onClose,
//         onError,
//         onMessage,
//         wsConnecting
//       } = wsActions;
//
//       if (wsConnect.match(action)) {
//         url = action.payload;
//         socket = new WebSocket(url);
//         isConnected = true;
//         dispatch(wsConnecting());
//       }
//
//       if (socket) {
//         socket.onopen = () => {
//           dispatch(onOpen());
//         }
//
//         socket.onerror = (err) => {
//           dispatch(onError(err));
//         }
//
//         socket.onmessage = (event) => {
//           const {data} = event;
//           const parsedData = JSON.parse(data);
//           dispatch(onMessage(parsedData));
//         }
//
//         socket.onclose = (event) => {
//           if (event.code !== 1000) {
//             dispatch(onError(event.code.toString()));
//           }
//           dispatch(onClose());
//
//           if (isConnected) {
//             dispatch(wsConnecting());
//             reconnectTimer = window.setTimeout(() => {
//               dispatch(wsConnect(url));
//             }, 3000)
//           }
//         }
//
//         if (wsSendMessage && wsSendMessage.match(action)) {
//           socket.send(JSON.stringify(action.payload))
//         }
//
//         if (wsDisconnect.match(action)) {
//           clearTimeout(reconnectTimer);
//           isConnected = false;
//           reconnectTimer = 0;
//           socket.close();
//           dispatch(onClose());
//         }
//       }
//
//       next(action)
//     }
//   }
// }
