import {IsLoadingActionTypes} from "../types/isLoading";

export const isLoadingAction = (payload: boolean) => ({type: IsLoadingActionTypes.SET_IS_LOADING, payload})
