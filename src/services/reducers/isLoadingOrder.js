const defaultState = {
	isLoadingOrder: false,
}

const SET_IS_LOADING_ORDER = 'SET_IS_LOADING_ORDER';

export const isLoadingOrderReducer = (state = defaultState, action) => {
	switch(action.type) {
		case SET_IS_LOADING_ORDER:
			return {...state, isLoadingOrder: action.payload}
		default:
			return state
	}
}
