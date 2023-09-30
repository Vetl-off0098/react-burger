import {IIngredient} from "../../models/ingredient";

export interface IBurgerState {
  burger: IIngredient[];
}

export enum BurgerActionTypes {
  SET_BURGER_INGREDIENTS = 'SET_BURGER_INGREDIENTS',
  SET_BURGER_INGREDIENTS_ARRAY = 'SET_BURGER_INGREDIENTS_ARRAY',
  ADD_BURGER_INGREDIENTS = 'ADD_BURGER_INGREDIENTS',
  REMOVE_BURGER_INGREDIENT_BY_ID = 'REMOVE_BURGER_INGREDIENT_BY_ID',
}

interface ISetBurgerIngredientsAction {
  type: BurgerActionTypes.SET_BURGER_INGREDIENTS;
  payload: any;
}

export interface ISetBurgerIngredientsArrayAction {
  readonly type: typeof BurgerActionTypes.SET_BURGER_INGREDIENTS_ARRAY;
  readonly payload: IIngredient[];
}

export interface IAddBurgerIngredientsAction {
  readonly type: typeof BurgerActionTypes.ADD_BURGER_INGREDIENTS;
  readonly payload: IIngredient;
}

export interface IRemoveBurgerIngredientByIdAction {
  readonly type: typeof BurgerActionTypes.REMOVE_BURGER_INGREDIENT_BY_ID;
  readonly payload: string;
}

export type TBurgerAction = ISetBurgerIngredientsAction
  | ISetBurgerIngredientsArrayAction
  | IAddBurgerIngredientsAction
  | IRemoveBurgerIngredientByIdAction
