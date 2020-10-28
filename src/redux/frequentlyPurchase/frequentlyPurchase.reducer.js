import FrequentlyPurchaseActionTypes from "./frequentlyPurhcase.types";

const INITIAL_STATE = {
  frequentlyPurchaseList: [],
};

const frequentlyPurchaseReducer = (state = INITIAL_STATE, { type }) => {
  switch (type) {
    case FrequentlyPurchaseActionTypes.FREQUENTLY_PURCHASE_ITEMS_ORDER_ALL:
    case FrequentlyPurchaseActionTypes.CLEAR_FREQUENTLY_PURCHASE_ITEM_LIST:
      return {
        ...state,
        frequentlyPurchaseList: [],
      };
    default:
      return state;
  }
};

export default frequentlyPurchaseReducer;
