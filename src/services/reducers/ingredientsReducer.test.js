import {ingredientsReducer} from "./ingredientsReducer";
import {IngredientsActionTypes} from "../types/ingredients";

let defaultState = {
		ingredients: [],
};

describe('Check ingredientsReducer reducer', () => {
		beforeEach(() => {
				defaultState = {
						ingredients: [],
				};
		})

		test('Should return the initial state with state is undefined', () => {
				expect(ingredientsReducer(undefined, {})).toEqual({
						ingredients: [],
				})
		});

		test('Should return the initial state with real state', () => {
				expect(ingredientsReducer(defaultState, {})).toEqual({
						ingredients: [],
				})
		});

		test('Should return the initial state add ingredients', () => {
				const ingredients = [
						{
								_id: "643d69a5c3f7b9001cfa093c",
								name: "Краторная булка N-200i",
								type: "bun",
								proteins: 80,
								fat: 24,
								carbohydrates: 53,
								calories: 420,
								price: 1255,
								image: "https://code.s3.yandex.net/react/code/bun-02.png",
								image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
								image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
								__v: 0,
								count: 0,
						},
						{
								_id: "643d69a5c3f7b9001cfa0941",
								name: "Биокотлета из марсианской Магнолии",
								type: "main",
								proteins: 420,
								fat: 142,
								carbohydrates: 242,
								calories: 4242,
								price: 424,
								image: "https://code.s3.yandex.net/react/code/meat-01.png",
								image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
								image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
								__v:0,
								count: 0,
						}
				];

				expect(ingredientsReducer(defaultState, {type: IngredientsActionTypes.ADD_INGREDIENTS, payload: ingredients})).toEqual({
						ingredients: [
								{
										_id: "643d69a5c3f7b9001cfa093c",
										name: "Краторная булка N-200i",
										type: "bun",
										proteins: 80,
										fat: 24,
										carbohydrates: 53,
										calories: 420,
										price: 1255,
										image: "https://code.s3.yandex.net/react/code/bun-02.png",
										image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
										image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
										__v: 0,
										count: 0,
								},
								{
										_id: "643d69a5c3f7b9001cfa0941",
										name: "Биокотлета из марсианской Магнолии",
										type: "main",
										proteins: 420,
										fat: 142,
										carbohydrates: 242,
										calories: 4242,
										price: 424,
										image: "https://code.s3.yandex.net/react/code/meat-01.png",
										image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
										image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
										__v:0,
										count: 0,
								}
						],
				})
		});

		test('Should return the initial state increase count ingredient', () => {
				defaultState = {
						ingredients: [
								{
										_id: "643d69a5c3f7b9001cfa093c",
										name: "Краторная булка N-200i",
										type: "bun",
										proteins: 80,
										fat: 24,
										carbohydrates: 53,
										calories: 420,
										price: 1255,
										image: "https://code.s3.yandex.net/react/code/bun-02.png",
										image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
										image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
										__v: 0,
										count: 0,
								},
								{
										_id: "643d69a5c3f7b9001cfa0941",
										name: "Биокотлета из марсианской Магнолии",
										type: "main",
										proteins: 420,
										fat: 142,
										carbohydrates: 242,
										calories: 4242,
										price: 424,
										image: "https://code.s3.yandex.net/react/code/meat-01.png",
										image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
										image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
										__v:0,
										count: 0,
								}
						],
				}
				expect(ingredientsReducer(defaultState, {type: IngredientsActionTypes.INCREASE_COUNT_INGREDIENT, payload: {_id: "643d69a5c3f7b9001cfa0941"}})).toEqual({
						ingredients: [
								{
										_id: "643d69a5c3f7b9001cfa093c",
										name: "Краторная булка N-200i",
										type: "bun",
										proteins: 80,
										fat: 24,
										carbohydrates: 53,
										calories: 420,
										price: 1255,
										image: "https://code.s3.yandex.net/react/code/bun-02.png",
										image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
										image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
										__v: 0,
										count: 0,
								},
								{
										_id: "643d69a5c3f7b9001cfa0941",
										name: "Биокотлета из марсианской Магнолии",
										type: "main",
										proteins: 420,
										fat: 142,
										carbohydrates: 242,
										calories: 4242,
										price: 424,
										image: "https://code.s3.yandex.net/react/code/meat-01.png",
										image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
										image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
										__v: 0,
										count: 1,
								}
						],
				})
		})

		test('Should return the initial state decrease count ingredient', () => {
				defaultState = {
						ingredients: [
								{
										_id: "643d69a5c3f7b9001cfa093c",
										name: "Краторная булка N-200i",
										type: "bun",
										proteins: 80,
										fat: 24,
										carbohydrates: 53,
										calories: 420,
										price: 1255,
										image: "https://code.s3.yandex.net/react/code/bun-02.png",
										image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
										image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
										__v: 0,
										count: 0,
								},
								{
										_id: "643d69a5c3f7b9001cfa0941",
										name: "Биокотлета из марсианской Магнолии",
										type: "main",
										proteins: 420,
										fat: 142,
										carbohydrates: 242,
										calories: 4242,
										price: 424,
										image: "https://code.s3.yandex.net/react/code/meat-01.png",
										image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
										image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
										__v:0,
										count: 2,
								}
						],
				}
				expect(ingredientsReducer(defaultState, {type: IngredientsActionTypes.DECREASE_COUNT_INGREDIENT, payload: {_id: "643d69a5c3f7b9001cfa0941"}})).toEqual({
						ingredients: [
								{
										_id: "643d69a5c3f7b9001cfa093c",
										name: "Краторная булка N-200i",
										type: "bun",
										proteins: 80,
										fat: 24,
										carbohydrates: 53,
										calories: 420,
										price: 1255,
										image: "https://code.s3.yandex.net/react/code/bun-02.png",
										image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
										image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
										__v: 0,
										count: 0,
								},
								{
										_id: "643d69a5c3f7b9001cfa0941",
										name: "Биокотлета из марсианской Магнолии",
										type: "main",
										proteins: 420,
										fat: 142,
										carbohydrates: 242,
										calories: 4242,
										price: 424,
										image: "https://code.s3.yandex.net/react/code/meat-01.png",
										image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
										image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
										__v: 0,
										count: 1,
								}
						],
				})
		})

		test('Should return the initial state reset count ingredient', () => {
				defaultState = {
						ingredients: [
								{
										_id: "643d69a5c3f7b9001cfa093c",
										name: "Краторная булка N-200i",
										type: "bun",
										proteins: 80,
										fat: 24,
										carbohydrates: 53,
										calories: 420,
										price: 1255,
										image: "https://code.s3.yandex.net/react/code/bun-02.png",
										image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
										image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
										__v: 0,
										count: 0,
								},
								{
										_id: "643d69a5c3f7b9001cfa0941",
										name: "Биокотлета из марсианской Магнолии",
										type: "main",
										proteins: 420,
										fat: 142,
										carbohydrates: 242,
										calories: 4242,
										price: 424,
										image: "https://code.s3.yandex.net/react/code/meat-01.png",
										image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
										image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
										__v:0,
										count: 2,
								}
						],
				}
				expect(ingredientsReducer(defaultState, {type: IngredientsActionTypes.RESET_COUNT_INGREDIENT, payload: {_id: "643d69a5c3f7b9001cfa0941"}})).toEqual({
						ingredients: [
								{
										_id: "643d69a5c3f7b9001cfa093c",
										name: "Краторная булка N-200i",
										type: "bun",
										proteins: 80,
										fat: 24,
										carbohydrates: 53,
										calories: 420,
										price: 1255,
										image: "https://code.s3.yandex.net/react/code/bun-02.png",
										image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
										image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
										__v: 0,
										count: 0,
								},
								{
										_id: "643d69a5c3f7b9001cfa0941",
										name: "Биокотлета из марсианской Магнолии",
										type: "main",
										proteins: 420,
										fat: 142,
										carbohydrates: 242,
										calories: 4242,
										price: 424,
										image: "https://code.s3.yandex.net/react/code/meat-01.png",
										image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
										image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
										__v: 0,
										count: 0,
								}
						],
				})
		})

		test('Should return the initial state reset count all ingredients', () => {
				defaultState = {
						ingredients: [
								{
										_id: "643d69a5c3f7b9001cfa093c",
										name: "Краторная булка N-200i",
										type: "bun",
										proteins: 80,
										fat: 24,
										carbohydrates: 53,
										calories: 420,
										price: 1255,
										image: "https://code.s3.yandex.net/react/code/bun-02.png",
										image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
										image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
										__v: 0,
										count: 1,
								},
								{
										_id: "643d69a5c3f7b9001cfa0941",
										name: "Биокотлета из марсианской Магнолии",
										type: "main",
										proteins: 420,
										fat: 142,
										carbohydrates: 242,
										calories: 4242,
										price: 424,
										image: "https://code.s3.yandex.net/react/code/meat-01.png",
										image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
										image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
										__v:0,
										count: 2,
								}
						],
				}
				expect(ingredientsReducer(defaultState, {type: IngredientsActionTypes.RESET_COUNT_ALL_INGREDIENTS, payload: {_id: "643d69a5c3f7b9001cfa0941"}})).toEqual({
						ingredients: [
								{
										_id: "643d69a5c3f7b9001cfa093c",
										name: "Краторная булка N-200i",
										type: "bun",
										proteins: 80,
										fat: 24,
										carbohydrates: 53,
										calories: 420,
										price: 1255,
										image: "https://code.s3.yandex.net/react/code/bun-02.png",
										image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
										image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
										__v: 0,
										count: 0,
								},
								{
										_id: "643d69a5c3f7b9001cfa0941",
										name: "Биокотлета из марсианской Магнолии",
										type: "main",
										proteins: 420,
										fat: 142,
										carbohydrates: 242,
										calories: 4242,
										price: 424,
										image: "https://code.s3.yandex.net/react/code/meat-01.png",
										image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
										image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
										__v: 0,
										count: 0,
								},
						],
				})
		})

		test('Should return the initial state set count ingredient bun', () => {
				defaultState = {
						ingredients: [
								{
										_id: "643d69a5c3f7b9001cfa093c",
										name: "Краторная булка N-200i",
										type: "bun",
										proteins: 80,
										fat: 24,
										carbohydrates: 53,
										calories: 420,
										price: 1255,
										image: "https://code.s3.yandex.net/react/code/bun-02.png",
										image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
										image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
										__v: 0,
										count: 0,
								},
						],
				}
				expect(ingredientsReducer(defaultState, {type: IngredientsActionTypes.SET_COUNT_INGREDIENT_BUN, payload: {_id: "643d69a5c3f7b9001cfa093c"}})).toEqual({
						ingredients: [
								{
										_id: "643d69a5c3f7b9001cfa093c",
										name: "Краторная булка N-200i",
										type: "bun",
										proteins: 80,
										fat: 24,
										carbohydrates: 53,
										calories: 420,
										price: 1255,
										image: "https://code.s3.yandex.net/react/code/bun-02.png",
										image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
										image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
										__v: 0,
										count: 2,
								},
						],
				})
		})
})
