const defaultState = {
	isLoading: false,
}

export const SET_IS_LOADING = 'SET_IS_LOADING';

export const isLoadingReducer = (state = defaultState, action) => {
	switch(action.type) {
		case SET_IS_LOADING:
			return {...state, isLoading: action.payload}
		default:
			return state
	}
}
