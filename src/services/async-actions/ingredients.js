import api from "../../utils/api";
import checkResponse from "../../utils/check-response";
import {addIngredientsAction, setCountIngredientAction} from "../actions/ingredientsAction";
import {isLoadingAction} from "../actions/isLoadingActions";
import {createOrderAction} from "../actions/createdOrderActions";
import {isLoadingOrderAction} from "../actions/isLoadingOrderActions";

export const fetchIngredients = (burger) => {
		return function(dispatch) {
				fetch(`${api}/ingredients`)
						.then(data => checkResponse(data))
						.then(response => {
								response.data = response.data.map(el => {
										return {
												...el,
												count: 0
										}
								})
								console.log('Set count 0')
								console.log(burger)
								dispatch(addIngredientsAction(response.data));

								if (burger && burger.length) {
										burger.forEach(el => {
												let ingredient = response.data.find(item => item._id === el._id);

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

export const fetchCreateOrder = (burger) => {
	const bun = burger.find(el => el.type === 'bun');

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
					...burger.filter(el => el.type !== 'bun'),
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
