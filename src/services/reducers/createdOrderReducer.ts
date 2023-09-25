import {ICreatedOrderState, CreatedOrderActionTypes, TCreatedOrderAction} from '../types/createdOrder'

const defaultState:ICreatedOrderState = {
	order: {
		isOpen: false,
		isSuccess: false,
		orderId: '',
	},
}

export const createdOrderReducer = (state = defaultState, action:TCreatedOrderAction):ICreatedOrderState => {
	switch(action.type) {
		case CreatedOrderActionTypes.CREATE_ORDER:
			return {...state, order: {...action.payload}}
		case CreatedOrderActionTypes.TOGGLE_ORDER:
			return {...state, order: {...state.order, isOpen: action.payload}}
		default:
			return state
	}
}
