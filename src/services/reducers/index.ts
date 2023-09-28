import {createStore, combineReducers, applyMiddleware} from "redux";
import {ingredientsReducer} from "./ingredientsReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {burgerIngredientsReducer} from "./burgerIngredients";
import {isLoadingReducer} from "./isLoadingReducer";
import {createdOrderReducer} from "./createdOrderReducer";
import {isLoadingOrderReducer} from "./isLoadingOrder";
import {userReducer} from "./userReducer";

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
export type AppDispatch = typeof store.dispatch
