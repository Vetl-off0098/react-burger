const defaultState = {
	burger: [],
}

export const SET_BURGER_INGREDIENTS = 'SET_BURGER_INGREDIENTS';
export const SET_BURGER_INGREDIENTS_ARRAY = 'SET_BURGER_INGREDIENTS_ARRAY';
export const ADD_BURGER_INGREDIENTS = 'ADD_BURGER_INGREDIENTS';
export const REMOVE_BURGER_INGREDIENT_BY_ID = 'REMOVE_BURGER_INGREDIENT_BY_ID';

export const burgerIngredientsReducer = (state = defaultState, action) => {
		switch(action.type) {
				case SET_BURGER_INGREDIENTS:
						return {...state, burger: [action.payload]}
				case SET_BURGER_INGREDIENTS_ARRAY:
						return {...state, burger: [...action.payload]}
				case ADD_BURGER_INGREDIENTS:
						return {...state, burger: [...state.burger, action.payload]}
				case REMOVE_BURGER_INGREDIENT_BY_ID:
						return {...state, burger: [...state.burger.filter(el => el.burgerIngredientId !== action.payload)]}
				default:
						return state

		}
}
