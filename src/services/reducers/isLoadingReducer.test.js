import {isLoadingReducer} from "./isLoadingReducer";
import {IsLoadingActionTypes} from "../types/isLoading";

let defaultState = {
		isLoading: false,
}

describe('Check isLoadingOrderReducer reducer', () => {
		test('Should return the initial state with state is undefined', () => {
				expect(isLoadingReducer(undefined, {})).toEqual({
						isLoading: false,
				})
		});

		test('Should return the initial state with real state', () => {
				expect(isLoadingReducer(defaultState, {})).toEqual({
						isLoading: false,
				})
		});

		test('Should return the initial state set is loading order', () => {
				expect(isLoadingReducer(defaultState, {type: IsLoadingActionTypes.SET_IS_LOADING, payload: true})).toEqual({
						isLoading: true,
				})
		});
})
