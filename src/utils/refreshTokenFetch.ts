import api from "./api";
import {getCookie, setCookie} from "./cookie";
import checkResponse from "./check-response";

export const RefreshTokenFetch = () => {
	return fetch(`${api}/auth/token`, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
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
		})
		.catch(e => console.log(e))
}
