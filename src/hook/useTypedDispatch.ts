import {useDispatch as dispatchHook } from 'react-redux'
import type {AppDispatch, AppThunk} from '../services/reducers'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// type DispatchFunc = () => AppDispatch
// export const useTypedDispatch: DispatchFunc = useDispatch
// export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();
export const useDispatch: () => AppDispatch | AppThunk = dispatchHook
