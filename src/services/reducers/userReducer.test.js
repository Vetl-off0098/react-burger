import {GET_ORDER_FAILED, GET_ORDER_REQUEST, GET_ORDER_SUCCESS} from "../actions/order";
import {userReducer} from "./userReducer";
import {UserActionTypes} from "../types/user";

let defaultState = {
		user: null,
		isAuthChecked: false,
}

describe('Check userReducer reducer', () => {
		beforeEach(() => {
				defaultState = {
						user: null,
						isAuthChecked: false,
				};
		})

		test('Should return the initial state with state is undefined', () => {
				expect(userReducer(undefined, {})).toEqual({
						user: null,
						isAuthChecked: false,
				})
		});

		test('Should return the initial state with real state', () => {
				expect(userReducer(defaultState, {})).toEqual({
						user: null,
						isAuthChecked: false,
				})
		});

		test('Should return the initial state get order request', () => {
				expect(userReducer(defaultState, {type: UserActionTypes.SET_AUTH_CHECKED, payload: true})).toEqual({
						user: null,
						isAuthChecked: true,
				})
		});

		test('Should return the initial state get order request', () => {
				expect(userReducer(defaultState, {type: UserActionTypes.ADD_USER, payload: [123]})).toEqual({
						user: [123],
						isAuthChecked: false,
				})
		});
})
