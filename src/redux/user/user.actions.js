import UserActionTypes from "./user.types";

export const getCurrentUser = (user) => ({
  type: UserActionTypes.GET_CURRENT_USER,
  payload: user,
});

export const userLogout = () => ({
  type: UserActionTypes.USER_LOGOUT,
});

export const getToken = (token) => ({
  type: UserActionTypes.GET_TOKEN,
  payload: token,
});

export const clearToken = () => ({
  type: UserActionTypes.CLEAR_TOKEN,
});
