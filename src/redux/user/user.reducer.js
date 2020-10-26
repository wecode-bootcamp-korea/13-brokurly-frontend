import UserActionTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: {},
  userToken: "",
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
    case UserActionTypes.GET_TOKEN:
      return {
        ...state,
        userToken: action.payload,
      };
    case UserActionTypes.CLEAR_TOKEN:
      return {
        ...state,
        userToken: "",
      };
    default:
      return state;
  }
};

export default userReducer;
