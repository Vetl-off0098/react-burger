import {createStore, combineReducers, applyMiddleware} from "redux";
import {ingredientsReducer} from "./ingredientsReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {burgerIngredientsReducer} from "./burgerIngredients";
import {isLoadingReducer} from "./isLoadingReducer";
import {viewedIngredientReducer} from "./viewedIngredient";

const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	burger: burgerIngredientsReducer,
	isLoading: isLoadingReducer,
	viewedIngredient: viewedIngredientReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
