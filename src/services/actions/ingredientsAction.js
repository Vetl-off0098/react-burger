import {ADD_INGREDIENTS} from '../reducers/ingredientsReducer'
import {INCREASE_COUNT_INGREDIENT} from '../reducers/ingredientsReducer'
import {DECREASE_COUNT_INGREDIENT} from '../reducers/ingredientsReducer'
import {RESET_COUNT_INGREDIENT} from '../reducers/ingredientsReducer'
import {SET_COUNT_INGREDIENT_BUN} from '../reducers/ingredientsReducer'
import {SET_COUNT_INGREDIENT} from '../reducers/ingredientsReducer'

export const addIngredientsAction = (payload) => ({type: ADD_INGREDIENTS, payload})
export const increaseCountIngredientAction = (payload) => ({type: INCREASE_COUNT_INGREDIENT, payload})
export const decreaseCountIngredientAction = (payload) => ({type: DECREASE_COUNT_INGREDIENT, payload})
export const resetCountIngredientAction = (payload) => ({type: RESET_COUNT_INGREDIENT, payload})
export const setCountIngredientBunAction = (payload) => ({type: SET_COUNT_INGREDIENT_BUN, payload})
export const setCountIngredientAction = (payload) => ({type: SET_COUNT_INGREDIENT, payload})
