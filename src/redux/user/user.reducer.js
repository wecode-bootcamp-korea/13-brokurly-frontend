import UserActionTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: {},
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.GET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
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
