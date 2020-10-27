import UserActionTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: {},
};

const userReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case UserActionTypes.GET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    case UserActionTypes.USER_LOGOUT:
      return {
        ...state,
        currentUser: {},
      };
    default:
      return state;
  }
};

export default userReducer;
