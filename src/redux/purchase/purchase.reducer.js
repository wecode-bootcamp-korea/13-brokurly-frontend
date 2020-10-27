import PurchaseActionTypes from "./purchase.types";

const INITIAL_STATE = {
  purchaseList: [],
};

const purchaseReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PurchaseActionTypes.GET_PURCHASE_LIST:
      return {
        ...state,
        purchaseList: [...action.payload],
      };
    case PurchaseActionTypes.LOGOUT_CLEAR_PURCHASE_LIST:
      return {
        ...state,
        purchaseList: [],
      };
    default:
      return state;
  }
};

export default purchaseReducer;
