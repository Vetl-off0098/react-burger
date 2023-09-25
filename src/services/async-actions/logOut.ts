import api from "../../utils/api";
import checkResponse from "../../utils/check-response";
import {getCookie} from "../../utils/cookie";
import {setBurgerIngredientsArrayAction} from "../actions/burgerIngredientsActions";
import {Dispatch} from "redux";
import {TBurgerAction} from "../types/burger";
import {TUserAction, UserActionTypes} from "../types/user";

export const fetchLogOut = (): any => {
	return function(dispatch: Dispatch<TBurgerAction | TUserAction>) {
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
			.then(data => {
				console.log(data);

				dispatch(setBurgerIngredientsArrayAction([]))
				dispatch({type: UserActionTypes.ADD_USER, payload: null})
				dispatch({type: UserActionTypes.SET_AUTH_CHECKED, payload: true})
				// dispatch(addUserAction(null)); //- почему-то не работает в таком виде
				// dispatch(setAuthChecked(true)); - почему-то не работает в таком виде

				// setCookie('token', null);
				// setCookie('refresh', null);
			})
			.catch(e => console.log(e))
	}
}
