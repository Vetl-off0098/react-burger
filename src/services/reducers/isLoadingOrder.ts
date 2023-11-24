import {IIsLoadingOrderState, IsLoadingOrderActionTypes, TIsLoadingOrderAction} from '../types/isLoadingOrder'

const defaultState: IIsLoadingOrderState = {
	isLoadingOrder: false,
}

export const isLoadingOrderReducer = (state = defaultState, action: TIsLoadingOrderAction): IIsLoadingOrderState => {
	switch(action.type) {
		case IsLoadingOrderActionTypes.SET_IS_LOADING_ORDER:
			return {...state, isLoadingOrder: action.payload}
		default:
			return state
	}
}
