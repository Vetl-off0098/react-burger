import {UserActionTypes, IUser, ISetAuthCheckedAction, IAddUserAction, TUser} from "../types/user";
import {AppDispatch, AppValidThunk} from "../reducers";
import {deleteCookie, getCookie, setCookie} from "../../utils/cookie";
import {getUserApi, loginUserApi, logoutApi, registerUserApi} from "../../utils/burger-api";
import {setBurgerIngredientsArrayAction} from "./burgerIngredientsActions";
import {resetCountAllIngredientsAction} from "./ingredientsAction";

export const setAuthChecked = (payload: boolean): ISetAuthCheckedAction => ({type: UserActionTypes.SET_AUTH_CHECKED, payload})
export const addUserAction = (payload: IUser | null): IAddUserAction => ({type: UserActionTypes.ADD_USER, payload});



export const AUTH_CHECKED = "AUTH_CHECKED";
export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILED = "REGISTER_USER_FAILED";
export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILED = "LOGIN_USER_FAILED";
export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";
export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED = "UPDATE_USER_FAILED";
export const USER_LOGOUT = "USER_LOGOUT";

export type TAuthCheckedAction = {
  readonly type: typeof AUTH_CHECKED;
};

export type TRegisterUserRequestAction = {
  readonly type: typeof REGISTER_USER_REQUEST;
};

export type TRegisterUserSuccessAction = {
  readonly type: typeof REGISTER_USER_SUCCESS;
  readonly payload: TUser;
};

export type TRegisterUserFailedAction = {
  readonly type: typeof REGISTER_USER_FAILED;
  readonly payload: unknown;
};

export type TLoginUserRequestAction = {
  readonly type: typeof LOGIN_USER_REQUEST;
};

export type TLoginUserSuccessAction = {
  readonly type: typeof LOGIN_USER_SUCCESS;
  readonly payload: TUser;
};

export type TLoginUserFailedAction = {
  readonly type: typeof LOGIN_USER_FAILED;
  readonly payload: unknown;
};

export type TGetUserRequestAction = {
  readonly type: typeof GET_USER_REQUEST;
};

export type TGetUserSuccessAction = {
  readonly type: typeof GET_USER_SUCCESS;
  readonly payload: TUser;
};

export type TGetUserFailedAction = {
  readonly type: typeof GET_USER_FAILED;
  readonly payload: unknown;
};

export type TUpdateUserRequestAction = {
  readonly type: typeof UPDATE_USER_REQUEST;
};

export type TUpdateUserSuccessAction = {
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly payload: TUser;
};

export type TUpdateUserFailedAction = {
  readonly type: typeof UPDATE_USER_FAILED;
  readonly payload: unknown;
};

export type TUserLogoutdAction = {
  readonly type: typeof USER_LOGOUT;
};

export type TUserAuthActions =
  | TAuthCheckedAction
  | TRegisterUserRequestAction
  | TRegisterUserSuccessAction
  | TRegisterUserFailedAction
  | TLoginUserRequestAction
  | TLoginUserSuccessAction
  | TLoginUserFailedAction
  | TGetUserRequestAction
  | TGetUserSuccessAction
  | TGetUserFailedAction
  | TUpdateUserRequestAction
  | TUpdateUserSuccessAction
  | TUpdateUserFailedAction
  | TUserLogoutdAction;

export const checkUser = (): AppValidThunk => (dispatch) => {
  if (getCookie("accessToken")) { // закомментировано для тестов!!!!!
    dispatch(getUser()).finally(() => {
      dispatch({type: AUTH_CHECKED});
    })
  } else {
    dispatch({type: AUTH_CHECKED});
  }
};

export const getUser = (): AppValidThunk<Promise<unknown>> => (dispatch: AppDispatch) => {
  dispatch({type: GET_USER_REQUEST});
  return getUserApi()
    .then((res) => {
      dispatch({type: GET_USER_SUCCESS, payload: res.user});
    })
    .catch((err) => {
      dispatch({type: GET_USER_FAILED, payload: err.message});
    })
};

export const loginUser = (email: string, password: string): AppValidThunk<Promise<unknown>> => (dispatch: AppDispatch) => {
  dispatch({ type: LOGIN_USER_REQUEST });
  return loginUserApi({ email, password })
    .then((res) => {
      setCookie("accessToken", res.accessToken);
      setCookie("refreshToken", res.refreshToken);

      dispatch({ type: LOGIN_USER_SUCCESS, payload: res.user })
    })
    .catch((err) => {
      dispatch({ type: LOGIN_USER_FAILED, payload: err.message });
    });
};

export const logoutUser = (): AppValidThunk<Promise<unknown>> => (dispatch: AppDispatch) => {
  return logoutApi()
    .then(() => {
      deleteCookie("refreshToken");
      deleteCookie("accessToken");
      dispatch({ type: USER_LOGOUT });
      dispatch(setBurgerIngredientsArrayAction([]));
      dispatch(resetCountAllIngredientsAction());
    })
    .catch(() => {
      alert("Ошибка выполнения выхода");
    })
};

export const registerUser = (email: string, name: string, password: string): AppValidThunk<Promise<unknown>> => (dispatch: AppDispatch) => {
  dispatch({ type: REGISTER_USER_REQUEST });
  return registerUserApi({ email, name, password })
    .then((res) => {
      setCookie("accessToken", res.accessToken);
      setCookie("refreshToken", res.refreshToken);
      dispatch({ type: REGISTER_USER_SUCCESS, payload: res.user });
    })
    .catch((err) => {
      dispatch({ type: REGISTER_USER_FAILED, payload: err.message })
    })
}
