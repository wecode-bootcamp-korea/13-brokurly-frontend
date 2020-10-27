import PurchaseActionTypes from "./purchase.types";

export const getPurchaseList = (purchaseList) => ({
  type: PurchaseActionTypes.GET_PURCHASE_LIST,
  payload: purchaseList,
});

export const logoutClearPurchaseList = () => ({
  type: PurchaseActionTypes.LOGOUT_CLEAR_PURCHASE_LIST,
});
