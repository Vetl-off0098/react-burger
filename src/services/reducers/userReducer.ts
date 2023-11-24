import {IUserState, UserActionTypes, TUserAction} from '../types/user'

const initialState: IUserState = {
	user: null,
	isAuthChecked: false,
}

export const userReducer = (state = initialState, action: TUserAction): IUserState => {
	switch (action.type) {
		case UserActionTypes.SET_AUTH_CHECKED:
			return {
				...state,
				isAuthChecked: action.payload
			}
		case UserActionTypes.ADD_USER:
			return {...state, user: action.payload}
		default:
			return state
	}
}
