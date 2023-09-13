import {SET_BURGER_INGREDIENTS} from '../reducers/burgerIngredients'
import {SET_BURGER_INGREDIENTS_ARRAY} from '../reducers/burgerIngredients'
import {ADD_BURGER_INGREDIENTS} from '../reducers/burgerIngredients'
import {REMOVE_BURGER_INGREDIENT_BY_ID} from '../reducers/burgerIngredients'

export const setBurgerIngredientsAction = (payload) => ({type: SET_BURGER_INGREDIENTS, payload})
export const setBurgerIngredientsArrayAction = (payload) => ({type: SET_BURGER_INGREDIENTS_ARRAY, payload})
export const addBurgerIngredientsAction = (payload) => ({type: ADD_BURGER_INGREDIENTS, payload})
export const removeBurgerIngredientByIdAction = (payload) => ({type: REMOVE_BURGER_INGREDIENT_BY_ID, payload})
