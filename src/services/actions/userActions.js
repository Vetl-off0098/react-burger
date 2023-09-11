import {SET_AUTH_CHECKED} from '../reducers/userReducer'
import {ADD_USER} from '../reducers/userReducer'

export const setAuthChecked = (payload) => ({type: SET_AUTH_CHECKED, payload})
export const addUserAction = (payload) => ({type: ADD_USER, payload})
