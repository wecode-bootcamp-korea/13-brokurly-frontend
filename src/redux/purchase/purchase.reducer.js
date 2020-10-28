import PurchaseActionTypes from "./purchase.types";

const INITIAL_STATE = {
  purchaseList: [],
};

const purchaseReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case PurchaseActionTypes.GET_PURCHASE_LIST:
      return {
        ...state,
        purchaseList: [...payload],
      };
    case PurchaseActionTypes.LOGOUT_CLEAR_PURCHASE_LIST:
    case PurchaseActionTypes.ORDER_PURCHASE_LIST:
      return {
        ...state,
        purchaseList: [],
      };
    default:
      return state;
  }
};

export default purchaseReducer;
