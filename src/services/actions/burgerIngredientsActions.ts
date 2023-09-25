import {BurgerActionTypes} from "../types/burger";

export const setBurgerIngredientsAction = (payload: any) => ({type: BurgerActionTypes.SET_BURGER_INGREDIENTS, payload})
export const setBurgerIngredientsArrayAction = (payload: any) => ({type: BurgerActionTypes.SET_BURGER_INGREDIENTS_ARRAY, payload})
export const addBurgerIngredientsAction = (payload: any) => ({type: BurgerActionTypes.ADD_BURGER_INGREDIENTS, payload})
export const removeBurgerIngredientByIdAction = (payload: any) => ({type: BurgerActionTypes.REMOVE_BURGER_INGREDIENT_BY_ID, payload})
