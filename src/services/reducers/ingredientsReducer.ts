import {IIngredientState, IngredientsActionTypes, TIngredientsAction} from '../types/ingredients';

const defaultState:IIngredientState = {
	ingredients: [],
}

export const ingredientsReducer = (state = defaultState, action: TIngredientsAction):IIngredientState => {
	switch(action.type) {
		case IngredientsActionTypes.ADD_INGREDIENTS:
			return {...state, ingredients: [...action.payload]}
		case IngredientsActionTypes.INCREASE_COUNT_INGREDIENT:
			const newArrInc = state.ingredients;
			newArrInc.find(el => el._id === action.payload._id).count++;
			return {...state, ingredients: [...newArrInc]}
		case IngredientsActionTypes.DECREASE_COUNT_INGREDIENT:
			const newArrDec = state.ingredients;
			newArrDec.find(el => el._id === action.payload._id).count--;
			return {...state, ingredients: [...newArrDec]}
		case IngredientsActionTypes.RESET_COUNT_INGREDIENT:
			const newArrRes = state.ingredients;
			newArrRes.find(el => el._id === action.payload._id).count = 0;
			return {...state, ingredients: [...newArrRes]}
		case IngredientsActionTypes.SET_COUNT_INGREDIENT_BUN:
			const newArrSet = state.ingredients;
			newArrSet.find(el => el._id === action.payload._id).count = 2;
			return {...state, ingredients: [...newArrSet]}
		case IngredientsActionTypes.SET_COUNT_INGREDIENT:
			console.log(action.payload)
			const newArrSetCount = state.ingredients;
			newArrSetCount.find(el => el._id === action.payload.ingredient._id).count = action.payload.newCount;
			return {...state, ingredients: [...newArrSetCount]}
		default:
			return state
	}
}
