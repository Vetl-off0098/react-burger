import api from "../../utils/api";
import checkResponse from "../../utils/check-response";
import {setCookie} from "../../utils/cookie";
import {addUserAction, setAuthChecked} from "../actions/userActions";

export const fetchLogin = (params, cb) => {
		return function(dispatch) {
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

								dispatch(addUserAction(data.user));
								dispatch(setAuthChecked(true));

								console.log('callback')
								cb();
						})
						.catch(e => console.log(e))
		}
}
