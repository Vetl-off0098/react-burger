import api from "../../utils/api";
import checkResponse from "../../utils/check-response";
import {addIngredientsAction, setCountIngredientAction} from "../actions/ingredientsAction";
import {isLoadingAction} from "../actions/isLoadingActions";
import {createOrderAction} from "../actions/createdOrderActions";
import {isLoadingOrderAction} from "../actions/isLoadingOrderActions";
import {IIngredient} from '../../models/ingredient';
import {AppDispatch, AppThunk} from "../reducers";
import {getCookie} from "../../utils/cookie";
import {fetchWithRefresh, TServerResponse} from "../../utils/burger-api";
import {TOrder} from "../../models/feed";

export const fetchIngredients: AppThunk = (burger: IIngredient[] | []) => {
	return function(dispatch: AppDispatch) {
		fetch(`${api}/ingredients`)
			.then(data => checkResponse(data))
			.then(response => {
				response.data = response.data.map((el: IIngredient) => {
					return {
						...el,
						count: 0
					}
				})
				dispatch(addIngredientsAction(response.data));

				if (burger && burger.length) {
					burger.forEach((el: IIngredient) => {
						let ingredient:IIngredient = response.data.find((item: IIngredient) => item._id === el._id);

						if (ingredient) {
							dispatch(setCountIngredientAction({...ingredient, newCount: el.count}))
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

type TNewOrderResponse = TServerResponse<{
	order: TOrder;
	name: string;
}>;

export const fetchCreateOrder: AppThunk = (burger: IIngredient[] | []) => {
	const bun = burger.find((el: IIngredient) => el.type === 'bun');

	return function(dispatch: AppDispatch) {
		fetchWithRefresh<TNewOrderResponse>(`${api}/orders`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				authorization: getCookie("accessToken"),
			} as HeadersInit,
			body: JSON.stringify({
				ingredients: [
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
