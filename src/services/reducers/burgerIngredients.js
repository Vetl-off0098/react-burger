const defaultState = {
	burger: [],
}

const SET_BURGER_INGREDIENTS = 'SET_BURGER_INGREDIENTS';
const ADD_BURGER_INGREDIENTS = 'ADD_BURGER_INGREDIENTS';
const REMOVE_BURGER_INGREDIENT_BY_ID = 'REMOVE_BURGER_INGREDIENT_BY_ID';

export const burgerIngredientsReducer = (state = defaultState, action) => {
	switch(action.type) {
		case SET_BURGER_INGREDIENTS:
			return {...state, burger: [action.payload]}
		case ADD_BURGER_INGREDIENTS:
			return {...state, burger: [...state.burger, action.payload]}
		case REMOVE_BURGER_INGREDIENT_BY_ID:
			return {...state, burger: [...state.burger.filter(el => el.burgerIngredientId !== action.payload)]}
		default:
			return state
	}
}

export const setBurgerIngredientsAction = (payload) => ({type: SET_BURGER_INGREDIENTS, payload})
export const addBurgerIngredientsAction = (payload) => ({type: ADD_BURGER_INGREDIENTS, payload})
export const removeBurgerIngredientByIdAction = (payload) => ({type: REMOVE_BURGER_INGREDIENT_BY_ID, payload})
