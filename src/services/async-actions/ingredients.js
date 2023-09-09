import api from "../../utils/api";
import checkResponse from "../../utils/check-response";
import {addIngredientsAction, setCountIngredientAction} from "../reducers/ingredientsReducer";
import {isLoadingAction} from "../reducers/isLoadingReducer";
import {createOrderAction} from "../reducers/createdOrderReducer";
import {isLoadingOrderAction} from "../reducers/isLoadingOrder";

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
