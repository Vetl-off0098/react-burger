const defaultState = {
		ingredients: [],
}

const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
const INCREASE_COUNT_INGREDIENT = 'INCREASE_COUNT_INGREDIENT';
const DECREASE_COUNT_INGREDIENT = 'DECREASE_COUNT_INGREDIENT';
const RESET_COUNT_INGREDIENT = 'RESET_COUNT_INGREDIENT';
const SET_COUNT_INGREDIENT_BUN = 'SET_COUNT_INGREDIENT_BUN';
const SET_COUNT_INGREDIENT = 'SET_COUNT_INGREDIENT';

export const ingredientsReducer = (state = defaultState, action) => {
		switch(action.type) {
				case ADD_INGREDIENTS:
						return {...state, ingredients: [...action.payload]}
				case INCREASE_COUNT_INGREDIENT:
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
				case SET_COUNT_INGREDIENT:
						console.log(action.payload)
						const newArrSetCount = state.ingredients;
						newArrSetCount.find(el => el._id === action.payload.ingredient._id).count = action.payload.newCount;
						return {...state, ingredients: [...newArrSetCount]}
				default:
						return state
		}
}
