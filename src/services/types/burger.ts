export interface IBurgerState {
  burger: any[];
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

interface ISetBurgerIngredientsArrayAction {
  type: BurgerActionTypes.SET_BURGER_INGREDIENTS_ARRAY;
  payload: any;
}

interface IAddBurgerIngredientsAction {
  type: BurgerActionTypes.ADD_BURGER_INGREDIENTS;
  payload: any;
}

interface IRemoveBurgerIngredientByIdAction {
  type: BurgerActionTypes.REMOVE_BURGER_INGREDIENT_BY_ID;
  payload: any;
}

export type TBurgerAction = ISetBurgerIngredientsAction
  | ISetBurgerIngredientsArrayAction
  | IAddBurgerIngredientsAction
  | IRemoveBurgerIngredientByIdAction
