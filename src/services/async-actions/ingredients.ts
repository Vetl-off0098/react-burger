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

export const fetchIngredients = (burger: any): any => {
	return function(dispatch: Dispatch<TIngredientsAction | TIsLoadingAction>) {
		fetch(`${api}/ingredients`)
			.then(data => checkResponse(data))
			.then(response => {
				response.data = response.data.map((el: any) => {
					return {
							...el,
							count: 0
					}
				})
				console.log('Set count 0')
				console.log(burger)
				dispatch(addIngredientsAction(response.data));

				if (burger && burger.length) {
					burger.forEach((el: any) => {
						let ingredient = response.data.find((item: any) => item._id === el._id);

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

export const fetchCreateOrder = (burger: any): any => {
	const bun = burger.find((el: any) => el.type === 'bun');

	return function(dispatch: Dispatch<TCreatedOrderAction | TIsLoadingOrderAction>) {
		fetch(`${api}/orders`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				'ingredients': [
					bun,
					bun,
					...burger.filter((el: any) => el.type !== 'bun'),
				].map(el => el._id)
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
