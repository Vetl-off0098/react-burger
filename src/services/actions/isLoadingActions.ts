import {ISetIsLoadingAction, IsLoadingActionTypes} from "../types/isLoading";

export const isLoadingAction = (payload: boolean): ISetIsLoadingAction => ({type: IsLoadingActionTypes.SET_IS_LOADING, payload})
