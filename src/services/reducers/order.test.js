import {orderReducer} from "./order";
import {GET_ORDER_FAILED, GET_ORDER_REQUEST, GET_ORDER_SUCCESS} from "../actions/order";

let defaultState = {
		orderByNumber: null,
		isOrderByNumberLoading: false,
		orderByNumberError: null,
}

describe('Check orderReducer reducer', () => {
		beforeEach(() => {
				defaultState = {
						orderByNumber: null,
						isOrderByNumberLoading: false,
						orderByNumberError: null,
				};
		})

		test('Should return the initial state with state is undefined', () => {
				expect(orderReducer(undefined, {})).toEqual({
						orderByNumber: null,
						isOrderByNumberLoading: false,
						orderByNumberError: null,
				})
		});

		test('Should return the initial state with real state', () => {
				expect(orderReducer(defaultState, {})).toEqual({
						orderByNumber: null,
						isOrderByNumberLoading: false,
						orderByNumberError: null,
				})
		});

		test('Should return the initial state get order request', () => {
				expect(orderReducer(defaultState, {type: GET_ORDER_REQUEST})).toEqual({
						orderByNumber: null,
						isOrderByNumberLoading: true,
						orderByNumberError: null,
				})
		});

		test('Should return the initial state get order request', () => {
				expect(orderReducer(defaultState, {type: GET_ORDER_SUCCESS, payload: {orders: [123]}})).toEqual({
						orderByNumber: 123,
						isOrderByNumberLoading: false,
						orderByNumberError: null,
				})
		});

		test('Should return the initial state get order failed', () => {
				expect(orderReducer(defaultState, {type: GET_ORDER_FAILED, payload: 321})).toEqual({
						orderByNumber: null,
						isOrderByNumberLoading: false,
						orderByNumberError: 321,
				})
		});
})
