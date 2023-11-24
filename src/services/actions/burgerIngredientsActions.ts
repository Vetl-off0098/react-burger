import {
  BurgerActionTypes,
  IAddBurgerIngredientsAction,
  IRemoveBurgerIngredientByIdAction,
  ISetBurgerIngredientsArrayAction
} from "../types/burger";
import {IIngredient} from "../../models/ingredient";

export const setBurgerIngredientsAction = (payload: any) => ({type: BurgerActionTypes.SET_BURGER_INGREDIENTS, payload})
export const setBurgerIngredientsArrayAction = (payload: IIngredient[]): ISetBurgerIngredientsArrayAction => ({type: BurgerActionTypes.SET_BURGER_INGREDIENTS_ARRAY, payload})
export const addBurgerIngredientsAction = (payload: IIngredient): IAddBurgerIngredientsAction => ({type: BurgerActionTypes.ADD_BURGER_INGREDIENTS, payload})
export const removeBurgerIngredientByIdAction = (payload: string): IRemoveBurgerIngredientByIdAction => ({type: BurgerActionTypes.REMOVE_BURGER_INGREDIENT_BY_ID, payload})
