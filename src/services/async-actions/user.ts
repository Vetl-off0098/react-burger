import api from "../../utils/api";
import checkResponse from "../../utils/check-response";
import {getCookie} from "../../utils/cookie";
import {RefreshTokenFetch} from "../../utils/refreshTokenFetch";
import {Dispatch} from "redux";
import {TUserAction, UserActionTypes} from "../types/user";

export const fetchUser = (): any => {
	return function(dispatch: Dispatch<TUserAction>) {
		fetch(`${api}/auth/user`, {
			method: 'GET',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + getCookie('token')
			},
			redirect: 'follow',
			referrerPolicy: 'no-referrer'
		})
			.then(data => checkResponse(data))
			.then(data => {
				dispatch({type: UserActionTypes.ADD_USER, payload: data.user});
				// dispatch(addUserAction(data.user)); - почему-то не работает в таком виде
			})
			.catch(e => {
				console.log(e)

				if (e.message === 'jwt expired') {
					RefreshTokenFetch().then(() => fetchUser());
				} else {
					dispatch({type: UserActionTypes.ADD_USER, payload: null});
					// dispatch(addUserAction(null)); - почему-то не работает в таком виде
				}
			})
			.finally(() => dispatch({type: UserActionTypes.SET_AUTH_CHECKED, payload: true}))
			// dispatch(setAuthChecked(true)); - почему-то не работает в таком виде
	}
}
