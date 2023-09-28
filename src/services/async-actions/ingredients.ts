import api from "../../utils/api";
import checkResponse from "../../utils/check-response";
import {addIngredientsAction, setCountIngredientAction} from "../actions/ingredientsAction";
import {isLoadingAction} from "../actions/isLoadingActions";
import {createOrderAction} from "../actions/createdOrderActions";
import {isLoadingOrderAction} from "../actions/isLoadingOrderActions";
import {TIngredientsAction} from "../types/ingredients";
import {Dispatch} from "redux";
import {TIsLoadingAction} from "../types/isLoading";
import {TCreatedOrderAction} from "../types/createdOrder";
import {TIsLoadingOrderAction} from "../types/isLoadingOrder";
import {IIngredient} from '../../models/ingredient';
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../reducers";
import {TBurgerAction} from "../types/burger";
import {TUserAction} from "../types/user";

export const fetchIngredients = (burger: IIngredient[] | []): ThunkAction<void, AppStateType, unknown, TIngredientsAction | TIsLoadingAction> => {
	return function(dispatch) {
		fetch(`${api}/ingredients`)
			.then(data => checkResponse(data))
			.then(response => {
				response.data = response.data.map((el: IIngredient) => {
					return {
						...el,
						count: 0
					}
				})
				console.log('Set count 0')
				console.log(burger)
				dispatch(addIngredientsAction(response.data));

				if (burger && burger.length) {
					burger.forEach((el: IIngredient) => {
						let ingredient = response.data.find((item: IIngredient) => item._id === el._id);

						if (ingredient) {
							dispatch(setCountIngredientAction({ingredient, newCount: el.count}))
						}
					})
				}
			})
			.catch(e => {
				console.error(e);
			})
			.finally(() => dispatch(isLoadingAction(false)))
	}
}

export const fetchCreateOrder = (burger: IIngredient[] | []): ThunkAction<void, AppStateType, unknown, TCreatedOrderAction | TIsLoadingOrderAction> => {
	const bun = burger.find((el: IIngredient) => el.type === 'bun');

	return function(dispatch) {
		fetch(`${api}/orders`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				'ingredients': [
					bun,
					bun,
					...burger.filter((el: IIngredient) => el.type !== 'bun'),
				].map((el: IIngredient | undefined) => {
					if (el?._id) {
						return el._id
					}
				})
			})
		})
			.then(data => checkResponse(data))
			.then(data => {
				dispatch(createOrderAction({isOpen: true, isSuccess: data.success, orderId: String(data.order.number)}))
				dispatch(isLoadingOrderAction(false));
			})
			.catch(e => {
				console.log(e);
				dispatch(isLoadingOrderAction(false));
			})
	}
}
