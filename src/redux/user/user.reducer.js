import UserActionTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: {},
  userToken: "",
  userMileage: 0,
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
    case UserActionTypes.GET_TOKEN:
      return {
        ...state,
        userToken: payload,
      };
    case UserActionTypes.CLEAR_TOKEN:
      return {
        ...state,
        userToken: "",
      };
    case UserActionTypes.ADD_MILEAGE:
      return {
        ...state,
        userMileage: state.userMileage + payload,
      };
    default:
      return state;
  }
};

export default userReducer;
