import {burgerIngredientsReducer} from "./burgerIngredients";
import {BurgerActionTypes} from "../types/burger";

let defaultState = {
		burger: [],
};
describe('Check reducer burgerIngredients', () => {
		beforeEach(() => {
				defaultState = {
						burger: [],
				};
		});

		test('Should return the initial state with state is undefined', () => {
				expect(burgerIngredientsReducer(undefined, {})).toEqual({
						burger: []
				})
		});

		test('Should return the initial state with real state', () => {
				expect(burgerIngredientsReducer(defaultState, {})).toEqual({
						burger: []
				})
		});

		test('Should return state burger array', () => {
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

				expect(burgerIngredientsReducer(defaultState, {type: BurgerActionTypes.SET_BURGER_INGREDIENTS_ARRAY, payload: ingredients})).toEqual(
						{
								burger: [
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
								]
						}
				)
		});

		test('Should return the initial state one ingredient', () => {
				const ingredient = {
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
				};
				expect(burgerIngredientsReducer(defaultState, {type: BurgerActionTypes.ADD_BURGER_INGREDIENTS, payload: ingredient})).toEqual({
						burger: [
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
								}
						]
				})
		});

		test('Should return the initial state remove one ingredient', () => {
				defaultState ={
						burger: [{
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
								burgerIngredientId: "1702653792597",
						}]
				};
				expect(burgerIngredientsReducer(defaultState, {type: BurgerActionTypes.REMOVE_BURGER_INGREDIENT_BY_ID, payload: "1702653792597"})).toEqual({
						burger: []
				})
		});
})
