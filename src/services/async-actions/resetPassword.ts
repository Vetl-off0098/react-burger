import api from "../../utils/api";
import checkResponse from "../../utils/check-response";

export const fetchResetPassword = (password: string, kode: string | null, cb: () => void): any => {
	return function() {
		fetch(`${api}/password-reset/reset`, {
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
				password: password,
				token: kode
			})
		})
			.then(data => checkResponse(data))
			.then(data => {
				console.log(data)
				cb();
			})
			.catch(e => console.log(e))
	}
}
