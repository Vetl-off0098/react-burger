import {IngredientsActionTypes} from '../types/ingredients';

export const addIngredientsAction = (payload: any) => ({type: IngredientsActionTypes.ADD_INGREDIENTS, payload})
export const increaseCountIngredientAction = (payload: any) => ({type: IngredientsActionTypes.INCREASE_COUNT_INGREDIENT, payload})
export const decreaseCountIngredientAction = (payload: any) => ({type: IngredientsActionTypes.DECREASE_COUNT_INGREDIENT, payload})
export const resetCountIngredientAction = (payload: any) => ({type: IngredientsActionTypes.RESET_COUNT_INGREDIENT, payload})
export const setCountIngredientBunAction = (payload: any) => ({type: IngredientsActionTypes.SET_COUNT_INGREDIENT_BUN, payload})
export const setCountIngredientAction = (payload: any) => ({type: IngredientsActionTypes.SET_COUNT_INGREDIENT, payload})
