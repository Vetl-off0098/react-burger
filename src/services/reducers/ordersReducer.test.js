import {ordersReducer} from "./ordersReducer";
import {
		ORDERS_CONNECTION_CLOSED,
		ORDERS_CONNECTION_ERROR,
		ORDERS_CONNECTION_SUCCESS, ORDERS_GET_MESSAGE
} from "../action-types/wsActionTypes";

let defaultState = {
		data: [],
		isOpen: false,
		error: null,
}

describe('Check ordersReducer reducer', () => {
		beforeEach(() => {
				defaultState = {
						data: [],
						isOpen: false,
						error: null,
				};
		})

		test('Should return the initial state with state is undefined', () => {
				expect(ordersReducer(undefined, {})).toEqual({
						data: [],
						isOpen: false,
						error: null,
				})
		});

		test('Should return the initial state with real state', () => {
				expect(ordersReducer(defaultState, {})).toEqual({
						data: [],
						isOpen: false,
						error: null,
				})
		});

		test('Should return the initial state orders connection success', () => {
				expect(ordersReducer(defaultState, {type: ORDERS_CONNECTION_SUCCESS})).toEqual({
						data: [],
						isOpen: true,
						error: null,
				})
		});

		test('Should return the initial state orders connection success', () => {
				expect(ordersReducer(defaultState, {type: ORDERS_CONNECTION_ERROR, payload: 'error'})).toEqual({
						data: [],
						isOpen: false,
						error: 'error',
				})
		});

		test('Should return the initial state orders connection closed', () => {
				defaultState = {
						data: [],
						isOpen: true,
						error: null,
				}

				expect(ordersReducer(defaultState, {type: ORDERS_CONNECTION_CLOSED})).toEqual({
						data: [],
						isOpen: false,
						error: null,
				})
		});

		test('Should return the initial state orders get message', () => {
				expect(ordersReducer(defaultState, {type: ORDERS_GET_MESSAGE, payload: {data: {orders: [1, 2, 3]}}})).toEqual({
						data: [1, 2, 3],
						isOpen: false,
						error: null,
				})
		});
})
