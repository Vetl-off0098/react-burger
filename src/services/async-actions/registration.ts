import api from "../../utils/api";
import checkResponse from "../../utils/check-response";
import {addUserAction, setAuthChecked} from "../actions/userActions";
import {setCookie} from "../../utils/cookie";
import {Dispatch} from "redux";
import {TUserAction, UserActionTypes} from "../types/user";

interface IParams {
	email: string,
	password: string,
	name: string
}

export const fetchRegistration = (params: IParams, cb: () => void): any => {
	return function(dispatch: Dispatch<TUserAction>) {
		fetch(`${api}/auth/register`, {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
			body: JSON.stringify({
				email: params.email,
				password: params.password,
				name: params.name
			})
		})
			.then(data => checkResponse(data))
			.then(data => {
				console.log(data)
				let authToken;
				let refreshToken;

				if (data.accessToken) {
					authToken = data.accessToken.split('Bearer ')[1];
					setCookie('token', authToken);
				}

				if (data.refreshToken) {
					refreshToken = data.refreshToken;
					setCookie('refresh', refreshToken);
				}
				dispatch({type: UserActionTypes.ADD_USER, payload: data.user})
				dispatch({type: UserActionTypes.SET_AUTH_CHECKED, payload: true})

				// dispatch(addUserAction(data.user)); - почему-то не работает в таком виде
				// dispatch(setAuthChecked(true)); - почему-то не работает в таком виде
				cb();
			})
			.catch(e => console.log(e))
	}
}
