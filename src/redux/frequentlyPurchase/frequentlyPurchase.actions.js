import FrequentlyPurchaseActionTypes from "./frequentlyPurhcase.types";

// export const frequentlyPurchaseItemsBuyAll = () => ({
//   type: FrequentlyPurchaseActionTypes.FREQUENTLY_PURCHASE_ITEMS_ORDER_ALL,
// });

export const clearFrequentlyPurchaseItemList = () => ({
  type: FrequentlyPurchaseActionTypes.CLEAR_FREQUENTLY_PURCHASE_ITEM_LIST,
});

export const getFrequentlyPurchaseItems = (purchaseItemList) => ({
  type: FrequentlyPurchaseActionTypes.GET_FREQUENTLY_PURCHASE_ITEMS,
  payload: purchaseItemList,
});

export const frequentlyPurchaseItemToCartList = (item) => ({
  type: FrequentlyPurchaseActionTypes.ADD_TO_CARTLIST,
  payload: item,
});
