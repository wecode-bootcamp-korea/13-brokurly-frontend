import FrequentlyPurchaseActionTypes from "./frequentlyPurhcase.types";
import { checkFrequentlyPurchaseItem } from "./frequentlyPurchase.utils";

const INITIAL_STATE = {
  frequentlyPurchaseList: [],
};

const frequentlyPurchaseReducer = (
  state = INITIAL_STATE,
  { type, payload }
) => {
  switch (type) {
    case FrequentlyPurchaseActionTypes.CLEAR_FREQUENTLY_PURCHASE_ITEM_LIST:
      return {
        ...state,
        frequentlyPurchaseList: [],
      };
    case FrequentlyPurchaseActionTypes.GET_FREQUENTLY_PURCHASE_ITEMS:
      return {
        ...state,
        frequentlyPurchaseList: [...payload],
      };
    case FrequentlyPurchaseActionTypes.FREQUENTLY_PURCHASE_ITEMS_ORDER_ALL:
      return state;
    case FrequentlyPurchaseActionTypes.FRQUENTLY_ITEM_ADD_TO_CARTLIST:
      return {
        ...state,
        frequentlyPurchaseList: checkFrequentlyPurchaseItem(
          state.frequentlyPurchaseList,
          payload
        ),
      };
    default:
      return state;
  }
};

export default frequentlyPurchaseReducer;
