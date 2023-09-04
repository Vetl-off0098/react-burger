import api from "./api";
import {getCookie} from "./cookie";
import checkResponse from "./check-response";

export const RefreshTokenFetch = (cb) => {
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
						cb(data.user)
				})
				.catch(e => console.log(e))
}
