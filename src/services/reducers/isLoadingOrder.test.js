import {isLoadingOrderReducer} from "./isLoadingOrder";
import {IsLoadingOrderActionTypes} from "../types/isLoadingOrder";

let defaultState = {
		isLoadingOrder: false,
}

describe('Check isLoadingOrderReducer reducer', () => {
		test('Should return the initial state with state is undefined', () => {
				expect(isLoadingOrderReducer(undefined, {})).toEqual({
						isLoadingOrder: false,
				})
		});

		test('Should return the initial state with real state', () => {
				expect(isLoadingOrderReducer(defaultState, {})).toEqual({
						isLoadingOrder: false,
				})
		});

		test('Should return the initial state set is loading order', () => {
				expect(isLoadingOrderReducer(defaultState, {type: IsLoadingOrderActionTypes.SET_IS_LOADING_ORDER, payload: true})).toEqual({
						isLoadingOrder: true,
				})
		});
})
