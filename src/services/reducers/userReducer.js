const user = {
		user: null,
		isAuthChecked: false,
}

const SET_AUTH_CHECKED = 'SET_AUTH_CHECKED';
const ADD_USER = 'ADD_USER';

export const userReducer = (state = user, action) => {
		switch (action.type) {
				case SET_AUTH_CHECKED:
						return {
								...state,
								isAuthChecked: action.payload
						}
				case ADD_USER:
						return {...state, user: action.payload}
				default:
						return state
		}
}

export const setAuthChecked = (payload) => ({type: SET_AUTH_CHECKED, payload})
export const addUserAction = (payload) => ({type: ADD_USER, payload})
