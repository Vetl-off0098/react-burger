import {CREATE_ORDER} from '../reducers/createdOrderReducer'
import {TOGGLE_ORDER} from '../reducers/createdOrderReducer'

export const createOrderAction = (payload) => ({type: CREATE_ORDER, payload})
export const toggleOrderAction = (payload) => ({type: TOGGLE_ORDER, payload})
