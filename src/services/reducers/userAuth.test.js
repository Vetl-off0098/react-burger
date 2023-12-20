import {userAuthReducer} from "./userAuth";
import {
		AUTH_CHECKED, GET_USER_SUCCESS, LOGIN_USER_FAILED, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS,
		REGISTER_USER_FAILED,
		REGISTER_USER_REQUEST,
		REGISTER_USER_SUCCESS,
		USER_LOGOUT
} from "../actions/userActions";

let defaultState = {
		isAuthChecked: false,
		data: null,
		registerUserError: null,
		registerUserRequest: false,
		loginUserError: null,
		loginUserRequest: false,
		updateUserError: null,
		updateUserRequest: false,
		getUserError: null,
		getUserRequest: false,
}

describe('Check userAuthReducer reducer', () => {
		beforeEach(() => {
				defaultState = {
						isAuthChecked: false,
						data: null,
						registerUserError: null,
						registerUserRequest: false,
						loginUserError: null,
						loginUserRequest: false,
						updateUserError: null,
						updateUserRequest: false,
						getUserError: null,
						getUserRequest: false,
				};
		})

		test('Should return the initial state with state is undefined', () => {
				expect(userAuthReducer(undefined, {})).toEqual({
						isAuthChecked: false,
						data: null,
						registerUserError: null,
						registerUserRequest: false,
						loginUserError: null,
						loginUserRequest: false,
						updateUserError: null,
						updateUserRequest: false,
						getUserError: null,
						getUserRequest: false,
				})
		});

		test('Should return the initial state with real state', () => {
				expect(userAuthReducer(defaultState, {})).toEqual({
						isAuthChecked: false,
						data: null,
						registerUserError: null,
						registerUserRequest: false,
						loginUserError: null,
						loginUserRequest: false,
						updateUserError: null,
						updateUserRequest: false,
						getUserError: null,
						getUserRequest: false,
				})
		});

		test('Should return the initial state AUTH_CHECKED', () => {
				expect(userAuthReducer(defaultState, {type: AUTH_CHECKED})).toEqual({
						isAuthChecked: true,
						data: null,
						registerUserError: null,
						registerUserRequest: false,
						loginUserError: null,
						loginUserRequest: false,
						updateUserError: null,
						updateUserRequest: false,
						getUserError: null,
						getUserRequest: false,
				})
		});

		test('Should return the initial state USER_LOGOUT', () => {
				defaultState = {
						isAuthChecked: false,
						data: 'not null',
						registerUserError: null,
						registerUserRequest: false,
						loginUserError: null,
						loginUserRequest: false,
						updateUserError: null,
						updateUserRequest: false,
						getUserError: null,
						getUserRequest: false,
				}

				expect(userAuthReducer(defaultState, {type: USER_LOGOUT, payload: 'error'})).toEqual({
						isAuthChecked: false,
						data: null,
						registerUserError: null,
						registerUserRequest: false,
						loginUserError: null,
						loginUserRequest: false,
						updateUserError: null,
						updateUserRequest: false,
						getUserError: null,
						getUserRequest: false,
				})
		});

		test('Should return the initial state REGISTER_USER_REQUEST', () => {
				defaultState = {
						isAuthChecked: false,
						data: null,
						registerUserError: null,
						registerUserRequest: false,
						loginUserError: null,
						loginUserRequest: false,
						updateUserError: null,
						updateUserRequest: false,
						getUserError: null,
						getUserRequest: false,
				};

				expect(userAuthReducer(defaultState, {type: REGISTER_USER_REQUEST})).toEqual({
						isAuthChecked: false,
						data: null,
						registerUserError: null,
						registerUserRequest: true,
						loginUserError: null,
						loginUserRequest: false,
						updateUserError: null,
						updateUserRequest: false,
						getUserError: null,
						getUserRequest: false,
				})
		});

		test('Should return the initial state REGISTER_USER_SUCCESS', () => {
				defaultState = {
						isAuthChecked: false,
						data: null,
						registerUserError: null,
						registerUserRequest: true,
						loginUserError: null,
						loginUserRequest: false,
						updateUserError: null,
						updateUserRequest: false,
						getUserError: null,
						getUserRequest: false,
				}

				expect(userAuthReducer(defaultState, {type: REGISTER_USER_SUCCESS, payload: [1, 2]})).toEqual({
						isAuthChecked: true,
						data: [1, 2],
						registerUserError: null,
						registerUserRequest: false,
						loginUserError: null,
						loginUserRequest: false,
						updateUserError: null,
						updateUserRequest: false,
						getUserError: null,
						getUserRequest: false,
				})
		});

		test('Should return the initial state REGISTER_USER_FAILED', () => {
				defaultState = {
						isAuthChecked: false,
						data: null,
						registerUserError: null,
						registerUserRequest: true,
						loginUserError: null,
						loginUserRequest: false,
						updateUserError: null,
						updateUserRequest: false,
						getUserError: null,
						getUserRequest: false,
				}

				expect(userAuthReducer(defaultState, {type: REGISTER_USER_FAILED, payload: 'error'})).toEqual({
						isAuthChecked: false,
						data: null,
						registerUserError: 'error',
						registerUserRequest: false,
						loginUserError: null,
						loginUserRequest: false,
						updateUserError: null,
						updateUserRequest: false,
						getUserError: null,
						getUserRequest: false,
				})
		});

		test('Should return the initial state LOGIN_USER_REQUEST', () => {
				defaultState = {
						isAuthChecked: false,
						data: null,
						registerUserError: null,
						registerUserRequest: false,
						loginUserError: null,
						loginUserRequest: false,
						updateUserError: null,
						updateUserRequest: false,
						getUserError: null,
						getUserRequest: false,
				}

				expect(userAuthReducer(defaultState, {type: LOGIN_USER_REQUEST})).toEqual({
						isAuthChecked: false,
						data: null,
						registerUserError: null,
						registerUserRequest: false,
						loginUserError: null,
						loginUserRequest: true,
						updateUserError: null,
						updateUserRequest: false,
						getUserError: null,
						getUserRequest: false,
				})
		});

		test('Should return the initial state LOGIN_USER_SUCCESS', () => {
				defaultState = {
						isAuthChecked: false,
						data: null,
						registerUserError: null,
						registerUserRequest: false,
						loginUserError: null,
						loginUserRequest: true,
						updateUserError: null,
						updateUserRequest: false,
						getUserError: null,
						getUserRequest: false,
				}

				expect(userAuthReducer(defaultState, {type: LOGIN_USER_SUCCESS, payload: [1]})).toEqual({
						isAuthChecked: true,
						data: [1],
						registerUserError: null,
						registerUserRequest: false,
						loginUserError: null,
						loginUserRequest: false,
						updateUserError: null,
						updateUserRequest: false,
						getUserError: null,
						getUserRequest: false,
				})
		});

		test('Should return the initial state LOGIN_USER_FAILED', () => {
				defaultState = {
						isAuthChecked: false,
						data: null,
						registerUserError: null,
						registerUserRequest: false,
						loginUserError: null,
						loginUserRequest: true,
						updateUserError: null,
						updateUserRequest: false,
						getUserError: null,
						getUserRequest: false,
				}

				expect(userAuthReducer(defaultState, {type: LOGIN_USER_FAILED, payload: 'error'})).toEqual({
						isAuthChecked: false,
						data: null,
						registerUserError: null,
						registerUserRequest: false,
						loginUserError: 'error',
						loginUserRequest: false,
						updateUserError: null,
						updateUserRequest: false,
						getUserError: null,
						getUserRequest: false,
				})
		});

		test('Should return the initial state GET_USER_SUCCESS', () => {
				defaultState = {
						isAuthChecked: false,
						data: null,
						registerUserError: null,
						registerUserRequest: false,
						loginUserError: null,
						loginUserRequest: false,
						updateUserError: null,
						updateUserRequest: false,
						getUserError: null,
						getUserRequest: true,
				}

				expect(userAuthReducer(defaultState, {type: GET_USER_SUCCESS, payload: [1]})).toEqual({
						isAuthChecked: false,
						data: [1],
						registerUserError: null,
						registerUserRequest: false,
						loginUserError: null,
						loginUserRequest: false,
						updateUserError: null,
						updateUserRequest: false,
						getUserError: null,
						getUserRequest: false,
				})
		});
})
