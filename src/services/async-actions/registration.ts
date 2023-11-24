import api from "../../utils/api";
import checkResponse from "../../utils/check-response";
import {setCookie} from "../../utils/cookie";
import {addUserAction, setAuthChecked} from "../actions/userActions";
import {AppDispatch, AppThunk} from "../reducers";

interface IParams {
	email: string,
	password: string,
	name: string
}

export const fetchRegistration: AppThunk = (params: IParams, cb: () => any) => {
	return function(dispatch: AppDispatch) {
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
				dispatch(setAuthChecked(true));
				cb();
			})
			.catch(e => console.log(e))
	}
}
