import {
  IAddIngredientsAction, IDecreaseCountIngredientAction,
  IIncreaseCountIngredientAction,
  IIngredientSet,
  IngredientsActionTypes, IResetCountIngredientAction, ISetCountIngredientAction, ISetCountIngredientBunAction
} from '../types/ingredients';
import {IIngredient} from "../../models/ingredient";

export const addIngredientsAction = (payload: IIngredient[]): IAddIngredientsAction => ({type: IngredientsActionTypes.ADD_INGREDIENTS, payload})
export const increaseCountIngredientAction = (payload: IIngredient): IIncreaseCountIngredientAction => ({type: IngredientsActionTypes.INCREASE_COUNT_INGREDIENT, payload})
export const decreaseCountIngredientAction = (payload: IIngredient): IDecreaseCountIngredientAction => ({type: IngredientsActionTypes.DECREASE_COUNT_INGREDIENT, payload})
export const resetCountIngredientAction = (payload: IIngredient): IResetCountIngredientAction => ({type: IngredientsActionTypes.RESET_COUNT_INGREDIENT, payload})
export const setCountIngredientBunAction = (payload: IIngredient): ISetCountIngredientBunAction => ({type: IngredientsActionTypes.SET_COUNT_INGREDIENT_BUN, payload})
export const setCountIngredientAction = (payload: IIngredientSet): ISetCountIngredientAction => ({type: IngredientsActionTypes.SET_COUNT_INGREDIENT, payload})
