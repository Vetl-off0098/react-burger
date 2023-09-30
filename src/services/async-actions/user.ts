import api from "../../utils/api";
import checkResponse from "../../utils/check-response";
import {getCookie} from "../../utils/cookie";
import {RefreshTokenFetch} from "../../utils/refreshTokenFetch";
import {addUserAction, setAuthChecked} from "../actions/userActions";
import {AppDispatch, AppThunk} from "../reducers";

export const fetchUser: AppThunk = () => {
	return function(dispatch: AppDispatch) {
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
				dispatch(addUserAction(data.user));
			})
			.catch(e => {
				console.log(e)

				if (e.message === 'jwt expired') {
					RefreshTokenFetch().then(() => fetchUser());
				} else {
					dispatch(addUserAction(null));
				}
			})
			.finally(() =>  dispatch(setAuthChecked(true)))
	}
}
