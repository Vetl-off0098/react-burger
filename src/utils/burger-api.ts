import {IOrder} from "../models/feed";
import {TUser} from "../services/types/user";
import {getCookie, setCookie} from "./cookie";

const BURGER_API_URL = "https://norma.nomoreparties.space/api";
export const BURGER_API_WSS_FEED: string = "wss://norma.nomoreparties.space/orders/all";
export const BURGER_API_WSS_ORDERS = "wss://norma.nomoreparties.space/orders";

const checkResponse = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export type TServerResponse<T> = {
  success: boolean;
} & T;

type TOrderResponse = TServerResponse<{
  orders: IOrder[];
}>;

export const getOrderByNumber = (number: number) => {
  return fetch(`${BURGER_API_URL}/orders/${number}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => checkResponse<TOrderResponse>(res));
};

type TUserResponse = TServerResponse<{ user: TUser }>;

export const getUserApi = () => {
  return fetchWithRefresh<TUserResponse>(`${BURGER_API_URL}/auth/user`, {
    headers: {
      authorization: getCookie("accessToken"),
    } as HeadersInit,
  });
};

export const fetchWithRefresh = async<T>(url: RequestInfo, options: RequestInit) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse<T>(res);
  } catch (err) {
    if ((err as { message: string }).message === "jwt expired") {
      const refreshData = await refreshToken();
      if (options.headers) {
        (options.headers as { [key: string]: string }).authorization = refreshData.accessToken;
      }
      const res = await fetch(url, options);
      return await checkResponse<T>(res);
    } else {
      return Promise.reject(err);
    }
  }
};

type TRefreshResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
}>

export const refreshToken = (): Promise<TRefreshResponse> => {
  return fetch(`${BURGER_API_URL}/auth/token`, {
    method: "POST",
    cache: 'no-cache',
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    })
  })
    .then((res) => checkResponse<TRefreshResponse>(res))
    .then((refreshData) => {
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      setCookie("refreshToken", refreshData.refreshToken);
      setCookie("accessToken", refreshData.accessToken);
      return refreshData;
    })
};

export type TLoginData = {
  email: string,
  password: string,
};

type TAuthResponse = TServerResponse<{
  refreshToken: string,
  accessToken: string,
  user: TUser
}>

export const loginUserApi = (data: TLoginData) => {
  return fetch(`${BURGER_API_URL}/auth/login`, {
    method: "POST",
    cache: 'no-cache',
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify(data)
  })
    .then((res) => checkResponse<TAuthResponse>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    })
};

export type TRegisterData = {
  email: string;
  name: string;
  password: string;
};

export const logoutApi = () => {
  return fetch(`${BURGER_API_URL}/auth/logout`, {
    method: "POST",
    cache: 'no-cache',
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: getCookie("refreshToken")
    })
  })
    .then((res) => checkResponse<TServerResponse<{}>>(res));
};

export const registerUserApi = (data: TRegisterData) => {
  return fetch(`${BURGER_API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkResponse<TAuthResponse>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    })
};

export const forgotPasswordApi = (data: {email: string}) => {
  return fetch(`${BURGER_API_URL}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkResponse<TServerResponse<{}>>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    })
};

export const resetPasswordApi = (data: {password: string, kode: string}) => {
  return fetch(`${BURGER_API_URL}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkResponse<TServerResponse<{}>>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
}
