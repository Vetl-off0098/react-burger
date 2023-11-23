import {Middleware, MiddlewareAPI} from "redux";
import {AppDispatch, RootState, TFeedsWsAcions, TOrdersWsAcions} from "../reducers";
import {TWSActions} from "../action-types/wsActionTypes";
import {refreshToken} from "../../utils/burger-api";

const RECONNECT = 3000;

export const socketMiddleware = (wsActions: TFeedsWsAcions | TOrdersWsAcions, withTockenRefresh: boolean = false): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null;
    let isConnected = false;
    let reconnectTimer = 0;
    let url = "";

    return next => (action: TWSActions) => {
      const { dispatch } = store;
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
        url = payload;
        socket = new WebSocket(url);
        isConnected = true;
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({type: onOpen, payload: event});
        };

        socket.onerror = event => {
          dispatch({type: onError, payload: event});
        };
        socket.onmessage = event => {
          const {data} = event;
          const parsedData = JSON.parse(data);

          if (withTockenRefresh && parsedData.message === "Invalid or missing token") {
            refreshToken()
              .then((refreshData) => {
                const wssUrl = new URL(url);
                wssUrl.searchParams.set(
                  "token",
                  refreshData.accessToken.replace("Bearer ", "")
                );
                dispatch({type: wsInit, payload: wssUrl});
              })
              .catch((err) => {
                dispatch({ type: onError, payload: err });
              });

            dispatch({ type: wsClose, payload: event });
            return;
          }

          dispatch({type: onMessage, payload: {data: parsedData, timestamp: new Date().getTime() / 100}})
        };
        socket.onclose = event => {
          dispatch({type: onClose, payload: event})

          if (isConnected) {
            reconnectTimer = window.setTimeout(() => {
              dispatch({
                type: wsInit,
                payload: url,
              });
            }, RECONNECT);
          }
        };
      }

      if (wsClose && type === wsClose && socket) {
        clearTimeout(reconnectTimer);
        isConnected = false;
        reconnectTimer = 0;
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
