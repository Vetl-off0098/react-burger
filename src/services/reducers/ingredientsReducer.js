const defaultState = {
	ingredients: [],
}

const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
const INCREASE_COUNT_INGREDIENT = 'INCREASE_COUNT_INGREDIENT';
const DECREASE_COUNT_INGREDIENT = 'DECREASE_COUNT_INGREDIENT';
const RESET_COUNT_INGREDIENT = 'RESET_COUNT_INGREDIENT';
const SET_COUNT_INGREDIENT_BUN = 'SET_COUNT_INGREDIENT_BUN';

export const ingredientsReducer = (state = defaultState, action) => {
	switch(action.type) {
		case ADD_INGREDIENTS:
			return {...state, ingredients: [...action.payload]}
		case INCREASE_COUNT_INGREDIENT:
			console.log(action.payload)
			const newArrInc = state.ingredients;
			newArrInc.find(el => el._id === action.payload._id).count++;
			return {...state, ingredients: [...newArrInc]}
		case DECREASE_COUNT_INGREDIENT:
			const newArrDec = state.ingredients;
			newArrDec.find(el => el._id === action.payload._id).count--;
			return {...state, ingredients: [...newArrDec]}
		case RESET_COUNT_INGREDIENT:
			const newArrRes = state.ingredients;
			newArrRes.find(el => el._id === action.payload._id).count = 0;
			return {...state, ingredients: [...newArrRes]}
		case SET_COUNT_INGREDIENT_BUN:
			const newArrSet = state.ingredients;
			newArrSet.find(el => el._id === action.payload._id).count = 2;
			return {...state, ingredients: [...newArrSet]}
		default:
			return state
	}
}

export const addIngredientsAction = (payload) => ({type: ADD_INGREDIENTS, payload})
export const increaseCountIngredientAction = (payload) => ({type: INCREASE_COUNT_INGREDIENT, payload})
export const decreaseCountIngredientAction = (payload) => ({type: DECREASE_COUNT_INGREDIENT, payload})
export const resetCountIngredientAction = (payload) => ({type: RESET_COUNT_INGREDIENT, payload})
export const setCountIngredientBunAction = (payload) => ({type: SET_COUNT_INGREDIENT_BUN, payload})
