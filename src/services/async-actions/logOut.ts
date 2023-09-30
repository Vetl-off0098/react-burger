import api from "../../utils/api";
import checkResponse from "../../utils/check-response";
import {getCookie} from "../../utils/cookie";
import {setBurgerIngredientsArrayAction} from "../actions/burgerIngredientsActions";
import {fetchIngredients} from "./ingredients";
import {AppDispatch, AppThunk} from "../reducers";
import {addUserAction, setAuthChecked} from "../actions/userActions";

export const fetchLogOut: AppThunk = () => {
	return function(dispatch: AppDispatch | any) {
		fetch(`${api}/auth/logout`, {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + getCookie('token')
			},
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
			body: JSON.stringify({
				token: getCookie('refresh')
			})
		})
			.then(data => checkResponse(data))
			.then(() => {
				dispatch(setBurgerIngredientsArrayAction([]));
				dispatch(fetchIngredients([]));

				dispatch(addUserAction(null));
				dispatch(setAuthChecked(true));

				// setCookie('token', null);
				// setCookie('refresh', null);
			})
			.catch(e => console.log(e))
	}
}
