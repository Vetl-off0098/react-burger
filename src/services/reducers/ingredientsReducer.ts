import {IIngredientState, IngredientsActionTypes, TIngredientsAction} from '../types/ingredients';

const defaultState:IIngredientState = {
	ingredients: [],
}

export const ingredientsReducer = (state = defaultState, action: TIngredientsAction):IIngredientState => {
	switch(action.type) {
		case IngredientsActionTypes.ADD_INGREDIENTS:
			return {...state, ingredients: [...action.payload]}
		case IngredientsActionTypes.INCREASE_COUNT_INGREDIENT:
			const newArrInc = state?.ingredients;
			const findElInc = newArrInc.find((el) => el._id === action.payload._id);
			if (findElInc) findElInc.count++;
			return {...state, ingredients: [...newArrInc]}
		case IngredientsActionTypes.DECREASE_COUNT_INGREDIENT:
			const newArrDec = state.ingredients;
			const findElDec = newArrDec.find((el) => el._id === action.payload._id);
			if (findElDec) findElDec.count--;
			return {...state, ingredients: [...newArrDec]}
		case IngredientsActionTypes.RESET_COUNT_INGREDIENT:
			const newArrRes = state.ingredients;
			const findElRes = newArrRes.find((el) => el._id === action.payload._id);
			if (findElRes) findElRes.count = 0;
			return {...state, ingredients: [...newArrRes]}
		case IngredientsActionTypes.SET_COUNT_INGREDIENT_BUN:
			const newArrSet = state.ingredients;
			const findElSet = newArrSet.find((el) => el._id === action.payload._id);
			if (findElSet) findElSet.count = 2;
			return {...state, ingredients: [...newArrSet]}
		case IngredientsActionTypes.SET_COUNT_INGREDIENT:
			const newArrSetCount = state.ingredients;
			const findElSetCount = newArrSetCount.find((el) => el._id === action.payload._id);
			if (findElSetCount) findElSetCount.count = action.payload.newCount;
			return {...state, ingredients: [...newArrSetCount]}
		default:
			return state
	}
}
