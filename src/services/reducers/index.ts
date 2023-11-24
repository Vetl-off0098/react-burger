import {createStore, combineReducers, applyMiddleware, ActionCreator, Action} from "redux";
import {ingredientsReducer} from "./ingredientsReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk, {ThunkAction} from "redux-thunk";
import {burgerIngredientsReducer} from "./burgerIngredients";
import {isLoadingReducer} from "./isLoadingReducer";
import {createdOrderReducer} from "./createdOrderReducer";
import {isLoadingOrderReducer} from "./isLoadingOrder";
import {userReducer} from "./userReducer";
import {TBurgerAction} from "../types/burger";
import {TCreatedOrderAction} from "../types/createdOrder";
import {TIngredientsAction} from "../types/ingredients";
import {TIsLoadingAction} from "../types/isLoading";
import {TIsLoadingOrderAction} from "../types/isLoadingOrder";
import {TUserAction} from "../types/user";
import {socketMiddleware} from "../middleware/socketMiddleware";
import {feedReducer} from "./feedReducer";
import {ordersReducer} from "./ordersReducer";
import {
	FEED_CONNECTION_CLOSE, FEED_CONNECTION_CLOSED,
	FEED_CONNECTION_ERROR, FEED_CONNECTION_INIT,
	FEED_CONNECTION_SUCCESS, FEED_GET_MESSAGE, FEED_SEND_MESSAGE,
	ORDERS_CONNECTION_CLOSE, ORDERS_CONNECTION_CLOSED,
	ORDERS_CONNECTION_ERROR, ORDERS_CONNECTION_INIT,
	ORDERS_CONNECTION_SUCCESS, ORDERS_GET_MESSAGE, ORDERS_SEND_MESSAGE, TOrdersActions, TWSActions
} from "../action-types/wsActionTypes";
import {orderReducer} from "./order";
import {TOrderActions} from "../actions/order";
import {TUserAuthActions} from "../actions/userActions";
import {userAuthReducer} from "./userAuth";


const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	burger: burgerIngredientsReducer,
	isLoading: isLoadingReducer,
	createdOrder: createdOrderReducer,
	isLoadingOrder: isLoadingOrderReducer,
	user: userReducer,
	feedReducer: feedReducer,
	orders: ordersReducer,
	order: orderReducer,
	userAuth: userAuthReducer,
})

export type TOrdersWsAcions = {
	wsInit: typeof ORDERS_CONNECTION_INIT,
	wsClose: typeof ORDERS_CONNECTION_CLOSE,
	onOpen: typeof ORDERS_CONNECTION_SUCCESS,
	onClose: typeof ORDERS_CONNECTION_CLOSED,
	onError: typeof ORDERS_CONNECTION_ERROR,
	onMessage: typeof ORDERS_GET_MESSAGE,
	wsSendMessage: typeof ORDERS_SEND_MESSAGE
}

export type TFeedsWsAcions = {
	wsInit: typeof FEED_CONNECTION_INIT,
	wsClose: typeof FEED_CONNECTION_CLOSE,
	onOpen: typeof FEED_CONNECTION_SUCCESS,
	onClose: typeof FEED_CONNECTION_CLOSED,
	onError: typeof FEED_CONNECTION_ERROR,
	onMessage: typeof FEED_GET_MESSAGE,
	wsSendMessage: typeof FEED_SEND_MESSAGE
}

const ordersWsAcions: TOrdersWsAcions = {
	wsInit: ORDERS_CONNECTION_INIT,
	wsClose: ORDERS_CONNECTION_CLOSE,
	onOpen: ORDERS_CONNECTION_SUCCESS,
	onClose: ORDERS_CONNECTION_CLOSED,
	onError: ORDERS_CONNECTION_ERROR,
	onMessage: ORDERS_GET_MESSAGE,
	wsSendMessage: ORDERS_SEND_MESSAGE
};

const feedWsActions: TFeedsWsAcions = {
	wsInit: FEED_CONNECTION_INIT,
	wsClose: FEED_CONNECTION_CLOSE,
	onOpen: FEED_CONNECTION_SUCCESS,
	onClose: FEED_CONNECTION_CLOSED,
	onError: FEED_CONNECTION_ERROR,
	onMessage: FEED_GET_MESSAGE,
	wsSendMessage: FEED_SEND_MESSAGE
};

export const store = createStore(
	rootReducer,
	composeWithDevTools(
		applyMiddleware(
			thunk,
			socketMiddleware(ordersWsAcions),
			socketMiddleware(feedWsActions),
		)
	)
);
export type RootState = ReturnType<typeof store.getState>;

type TRootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<TRootReducerType>

type TApplicationActions = TBurgerAction
	| TCreatedOrderAction
	| TIngredientsAction
	| TIsLoadingAction
	| TIsLoadingOrderAction
	| TUserAction
	| TOrderActions
	| TWSActions
	| TOrdersActions
	| TUserAuthActions

export type AppValidThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	TApplicationActions
	>;

export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>
export type AppDispatch = typeof store.dispatch;
