const defaultState = {
	viewedIngredient: {},
}

const SET_INGREDIENTS = 'SET_INGREDIENTS';

export const viewedIngredientReducer = (state = defaultState, action) => {
	switch(action.type) {
		case SET_INGREDIENTS:
			return {...state, viewedIngredient: {...action.payload}}
		default:
			return state
	}
}

export const setViewedIngredientsAction = (payload) => ({type: SET_INGREDIENTS, payload})
