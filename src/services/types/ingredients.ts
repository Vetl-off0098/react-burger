import {IIngredient} from "../../models/ingredient";

export interface IIngredientState {
  ingredients: IIngredient[];
}

export enum IngredientsActionTypes {
  ADD_INGREDIENTS = 'ADD_INGREDIENTS',
  INCREASE_COUNT_INGREDIENT = 'INCREASE_COUNT_INGREDIENT',
  DECREASE_COUNT_INGREDIENT = 'DECREASE_COUNT_INGREDIENT',
  RESET_COUNT_INGREDIENT = 'RESET_COUNT_INGREDIENT',
  SET_COUNT_INGREDIENT_BUN = 'SET_COUNT_INGREDIENT_BUN',
  SET_COUNT_INGREDIENT = 'SET_COUNT_INGREDIENT',
}

interface IAddIngredientsAction {
  type: IngredientsActionTypes.ADD_INGREDIENTS;
  payload: any;
}

interface IIncreaseCountIngredientAction {
  type: IngredientsActionTypes.INCREASE_COUNT_INGREDIENT;
  payload: any;
}

interface IDecreaseCountIngredientAction {
  type: IngredientsActionTypes.DECREASE_COUNT_INGREDIENT;
  payload: any;
}

interface IResetCountIngredientAction {
  type: IngredientsActionTypes.RESET_COUNT_INGREDIENT;
  payload: any;
}

interface ISetCountIngredientBunAction {
  type: IngredientsActionTypes.SET_COUNT_INGREDIENT_BUN;
  payload: any;
}

interface ISetCountIngredientAction {
  type: IngredientsActionTypes.SET_COUNT_INGREDIENT;
  payload: any;
}

export type TIngredientsAction = IAddIngredientsAction
  | IIncreaseCountIngredientAction
  | IDecreaseCountIngredientAction
  | IResetCountIngredientAction
  | ISetCountIngredientBunAction
  | ISetCountIngredientAction
