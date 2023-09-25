import api from "../../utils/api";
import checkResponse from "../../utils/check-response";
import {setCookie} from "../../utils/cookie";
import {Dispatch} from "redux";
import {TUserAction, UserActionTypes} from "../types/user";
import {addUserAction} from "../actions/userActions";

interface IParams {
	email: string,
	name?: string,
	password?: string
}

export const fetchLogin = (params: IParams, cb?: () => void): any => {
	return function(dispatch: Dispatch<TUserAction>) {
		fetch(`${api}/auth/login`, {
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
			})
		})
			.then(data => checkResponse(data))
			.then(data => {
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

				dispatch({type: UserActionTypes.ADD_USER, payload: data.user});
				// dispatch(addUserAction(data.user)); - почему-то не работает в таком виде
				dispatch({type: UserActionTypes.SET_AUTH_CHECKED, payload: true});

				if (cb) cb();
			})
			.catch(e => console.log(e))
	}
}
