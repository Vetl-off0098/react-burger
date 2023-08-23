import api from "../../utils/api";
import checkResponse from "../../utils/check-response";
import {addIngredientsAction} from "../reducers/ingredientsReducer";
import {isLoadingAction} from "../reducers/isLoadingReducer";
import {setBurgerIngredientsAction} from "../reducers/burgerIngredients";
import {createOrderAction} from "../reducers/createdOrderReducer";
import {isLoadingOrderAction} from "../reducers/isLoadingOrder";

export const fetchIngredients = () => {
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
				response.data.find(el => el.type === 'bun').count = 2;
				dispatch(addIngredientsAction(response.data));
				dispatch(setBurgerIngredientsAction({...response.data.find(el => el.type === 'bun'), burgerIngredientId: Date.now()}));
				dispatch(isLoadingAction(false));
			})
			.catch(e => {
				console.error(e);
				dispatch(isLoadingAction(false));
			})
	}
}

export const fetchCreateOrder = (burger) => {
	return function(dispatch) {
		fetch(`${api}/orders`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				'ingredients': [
					burger.find(el => el.type === 'bun'),
					burger.find(el => el.type === 'bun'),
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
