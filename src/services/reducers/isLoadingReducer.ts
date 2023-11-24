import {IIsLoadingState, IsLoadingActionTypes, TIsLoadingAction} from '../types/isLoading';

const defaultState: IIsLoadingState = {
	isLoading: false,
}

export const isLoadingReducer = (state = defaultState, action: TIsLoadingAction): IIsLoadingState => {
	switch(action.type) {
		case IsLoadingActionTypes.SET_IS_LOADING:
			return {...state, isLoading: action.payload}
		default:
			return state
	}
}
