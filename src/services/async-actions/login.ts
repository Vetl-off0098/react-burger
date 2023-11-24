import api from "../../utils/api";
import checkResponse from "../../utils/check-response";
import {setCookie} from "../../utils/cookie";
import {addUserAction, setAuthChecked} from "../actions/userActions";
import {AppDispatch, AppThunk} from "../reducers";

interface IParams {
	email: string,
	name?: string,
	password?: string
}

export const fetchLogin: AppThunk = (params: IParams, cb?: () => void) => {
	return function(dispatch: AppDispatch) {
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

				dispatch(addUserAction(data.user));
				dispatch(setAuthChecked(true))

				if (cb) cb();
			})
			.catch(e => console.log(e))
	}
}
