import {feedReducer} from "./feedReducer";
import {createdOrderReducer} from "./createdOrderReducer";
import {CreatedOrderActionTypes} from "../types/createdOrder";
import {
		FEED_CONNECTION_CLOSED,
		FEED_CONNECTION_ERROR,
		FEED_CONNECTION_SUCCESS,
		FEED_GET_MESSAGE
} from "../action-types/wsActionTypes";

// feedReducer

let defaultState = {
		orders: [],
		total: 0,
		totalToday: 0,
		isOpen: false,
		error: null
};
describe('Check feedReducer reducer', () => {
		beforeEach(() => {
				defaultState = {
						orders: [],
						total: 0,
						totalToday: 0,
						isOpen: false,
						error: null
				};
		});

		test('Should return the initial state with state is undefined', () => {
				expect(feedReducer(undefined, {})).toEqual({
						orders: [],
						total: 0,
						totalToday: 0,
						isOpen: false,
						error: null
				})
		});

		test('Should return the initial state with real state', () => {
				expect(feedReducer(defaultState, {})).toEqual({
						orders: [],
						total: 0,
						totalToday: 0,
						isOpen: false,
						error: null
				})
		});

		test('Should return the initial state feed connection success', () => {
				expect(feedReducer(defaultState, {type: FEED_CONNECTION_SUCCESS})).toEqual({
						orders: [],
						total: 0,
						totalToday: 0,
						isOpen: true,
						error: null,
				})
		});

		test('Should return the initial state feed connection error', () => {
				expect(feedReducer(defaultState, {type: FEED_CONNECTION_ERROR, payload: 'ERROR'})).toEqual({
						orders: [],
						total: 0,
						totalToday: 0,
						isOpen: false,
						error: 'ERROR',
				})
		});

		test('Should return the initial state feed connection closed', () => {
				defaultState = {
						orders: [],
						total: 0,
						totalToday: 0,
						isOpen: true,
						error: null,
				}
				expect(feedReducer(defaultState, {type: FEED_CONNECTION_CLOSED})).toEqual({
						orders: [],
						total: 0,
						totalToday: 0,
						isOpen: false,
						error: null,
				})
		});

		test('Should return the initial state feed get messages', () => {
				const message = {
						data: {
								orders: [{id: 1}, {id: 2}],
								total: 2,
								totalToday: 1
						}
				}
				expect(feedReducer(defaultState, {type: FEED_GET_MESSAGE, payload: message})).toEqual({
						orders: [{id: 1}, {id: 2}],
						total: 2,
						totalToday: 1,
						isOpen: false,
						error: null,
				})
		});
})
