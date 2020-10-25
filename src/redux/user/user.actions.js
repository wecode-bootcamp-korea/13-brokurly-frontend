import UserActionTypes from "./user.types";

export const getCurrentUser = (user) => ({
  type: UserActionTypes.GET_CURRENT_USER,
  payload: user,
});

export const userLogout = () => ({
  type: UserActionTypes.USER_LOGOUT,
});
