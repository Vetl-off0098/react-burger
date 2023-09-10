const defaultState = {
	order: {
		isOpen: false,
		isSuccess: false,
		orderId: '',
	},
}

const CREATE_ORDER = 'CREATE_ORDER';
const TOGGLE_ORDER = 'TOGGLE_ORDER';

export const createdOrderReducer = (state = defaultState, action) => {
	switch(action.type) {
		case CREATE_ORDER:
			return {...state, order: {...action.payload}}
		case TOGGLE_ORDER:
			return {...state, order: {...state.order, isOpen: action.payload}}
		default:
			return state
	}
}
