import {useDispatch } from 'react-redux'
import type {AppDispatch } from '../services/reducers'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatch
export const useTypedDispatch: DispatchFunc = useDispatch
