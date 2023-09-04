import {createStore, combineReducers, applyMiddleware} from "redux";
import {ingredientsReducer} from "./ingredientsReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {burgerIngredientsReducer} from "./burgerIngredients";
import {isLoadingReducer} from "./isLoadingReducer";
import {viewedIngredientReducer} from "./viewedIngredient";
import {createdOrderReducer} from "./createdOrderReducer";
import {isLoadingOrderReducer} from "./isLoadingOrder";
import {userReducer} from "./userReducer";

const rootReducer = combineReducers({
		ingredients: ingredientsReducer,
		burger: burgerIngredientsReducer,
		isLoading: isLoadingReducer,
		viewedIngredient: viewedIngredientReducer,
		createdOrder: createdOrderReducer,
		isLoadingOrder: isLoadingOrderReducer,
		user: userReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
