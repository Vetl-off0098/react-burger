import api from "../../utils/api";
import checkResponse from "../../utils/check-response";
import {addIngredientsAction} from "../reducers/ingredientsReducer";
import {isLoadingAction} from "../reducers/isLoadingReducer";
import {setBurgerIngredientsAction} from "../reducers/burgerIngredients";

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
