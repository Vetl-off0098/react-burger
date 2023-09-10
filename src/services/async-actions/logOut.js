import api from "../../utils/api";
import checkResponse from "../../utils/check-response";
import {getCookie, setCookie} from "../../utils/cookie";
import {addUserAction, setAuthChecked} from "../actions/userActions";
import {setBurgerIngredientsArrayAction} from "../actions/burgerIngredientsActions";

export const fetchLogOut = () => {
		return function(dispatch) {
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
								dispatch(addUserAction(null));
								dispatch(setAuthChecked(true));

								setCookie('token', null);
								setCookie('refresh', null);
						})
						.catch(e => console.log(e))
		}
}
