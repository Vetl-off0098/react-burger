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

const rootReducer = combineReducers({
		ingredients: ingredientsReducer,
		burger: burgerIngredientsReducer,
		isLoading: isLoadingReducer,
		createdOrder: createdOrderReducer,
		isLoadingOrder: isLoadingOrderReducer,
		user: userReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
export type RootState = ReturnType<typeof store.getState>;

type TRootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<TRootReducerType>

type TApplicationActions = TBurgerAction | TCreatedOrderAction | TIngredientsAction | TIsLoadingAction | TIsLoadingOrderAction | TUserAction;

export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>
export type AppDispatch = typeof store.dispatch;
