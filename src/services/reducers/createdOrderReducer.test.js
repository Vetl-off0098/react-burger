import {createdOrderReducer} from "./createdOrderReducer";
import {CreatedOrderActionTypes} from "../types/createdOrder";


let defaultState = {
		order: {
				isOpen: false,
				isSuccess: false,
				orderId: '',
		},
};
describe('Check createdOrderReducer reducer', () => {
		beforeEach(() => {
				defaultState = {
						order: {
								isOpen: false,
								isSuccess: false,
								orderId: '',
						},
				};
		});

		test('Should return the initial state with state is undefined', () => {
				expect(createdOrderReducer(undefined, {})).toEqual({
						order: {
								isOpen: false,
								isSuccess: false,
								orderId: '',
						},
				})
		});

		test('Should return the initial state with real state', () => {
				expect(createdOrderReducer(defaultState, {})).toEqual({
						order: {
								isOpen: false,
								isSuccess: false,
								orderId: '',
						},
				})
		});

		test('Should return the initial state create order', () => {
				const order = {
						isOpen: false,
						orderId: '0123',
						isSuccess: true,
				}
				expect(createdOrderReducer(defaultState, {type: CreatedOrderActionTypes.CREATE_ORDER, payload: order})).toEqual({
						order: {
								isOpen: false,
								orderId: '0123',
								isSuccess: true,
						},
				})
		});

		test('Should return the initial state toggle order', () => {
				expect(createdOrderReducer(defaultState, {type: CreatedOrderActionTypes.TOGGLE_ORDER, payload: true})).toEqual({
						order: {
								isOpen: true,
								orderId: '',
								isSuccess: false,
						},
				})
		});
})
