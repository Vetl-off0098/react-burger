import {IIngredient} from "../../models/ingredient";

export interface IIngredientSet extends IIngredient {
  newCount: number;
}

export interface IIngredientState {
  ingredients: IIngredient[] | [];
}

export enum IngredientsActionTypes {
  ADD_INGREDIENTS = 'ADD_INGREDIENTS',
  INCREASE_COUNT_INGREDIENT = 'INCREASE_COUNT_INGREDIENT',
  DECREASE_COUNT_INGREDIENT = 'DECREASE_COUNT_INGREDIENT',
  RESET_COUNT_INGREDIENT = 'RESET_COUNT_INGREDIENT',
  SET_COUNT_INGREDIENT_BUN = 'SET_COUNT_INGREDIENT_BUN',
  SET_COUNT_INGREDIENT = 'SET_COUNT_INGREDIENT',
}

export interface IAddIngredientsAction {
  readonly type: typeof IngredientsActionTypes.ADD_INGREDIENTS;
  readonly payload: IIngredient[];
}

export interface IIncreaseCountIngredientAction {
  readonly type: typeof IngredientsActionTypes.INCREASE_COUNT_INGREDIENT;
  readonly payload: IIngredient;
}

export interface IDecreaseCountIngredientAction {
  readonly type: typeof IngredientsActionTypes.DECREASE_COUNT_INGREDIENT;
  readonly payload: IIngredient;
}

export interface IResetCountIngredientAction {
  readonly type: typeof IngredientsActionTypes.RESET_COUNT_INGREDIENT;
  readonly payload: IIngredient;
}

export interface ISetCountIngredientBunAction {
  readonly type: typeof IngredientsActionTypes.SET_COUNT_INGREDIENT_BUN;
  readonly payload: IIngredient;
}

export interface ISetCountIngredientAction {
  readonly type: typeof IngredientsActionTypes.SET_COUNT_INGREDIENT;
  readonly payload: IIngredientSet;
}

export type TIngredientsAction = IAddIngredientsAction
  | IIncreaseCountIngredientAction
  | IDecreaseCountIngredientAction
  | IResetCountIngredientAction
  | ISetCountIngredientBunAction
  | ISetCountIngredientAction
