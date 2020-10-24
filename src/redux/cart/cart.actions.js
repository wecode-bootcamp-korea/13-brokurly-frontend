import CartActionTypes from "./cart.types";

export const addItem = (item) => ({
  type: CartActionTypes.INCREASE_ITEM_AMOUNT,
  payload: item,
});

export const removeItem = (item) => ({
  type: CartActionTypes.REMOVE_ITEM,
  payload: item,
});

export const clearItemFromCart = (item) => ({
  type: CartActionTypes.CLEAR_ITEM_FROM_CART,
  payload: item,
});

export const toggleAllSelectCheckBox = () => ({
  type: CartActionTypes.TOGGLE_ALL_SELECT_CHECKBOX,
});

export const toggleSelectedItemCheckBox = (cartItemId) => ({
  type: CartActionTypes.TOGGLE_ITEM_CHECKBOX,
  payload: cartItemId,
});

export const checkStatusAllSelectCheckBox = () => ({
  type: CartActionTypes.CHECK_ALL_SELECT_CHECKBOX,
});

export const deleteSelectedItems = () => ({
  type: CartActionTypes.DELETE_SELECTED_ITEMS,
});

export const selectedItemsTotalPrice = () => ({
  type: CartActionTypes.SELECTED_ITEMS_TOTAL_PRICE,
});

export const getSelectedItemsAmount = () => ({
  type: CartActionTypes.GET_SELECTED_ITEMS_AMOUNT,
});

export const getCartItems = (cartItems) => ({
  type: CartActionTypes.GET_CART_ITEMS,
  payload: cartItems,
});

export const filterOutSoldoutItems = () => ({
  type: CartActionTypes.DELETE_SOLDOUT_ITEMS,
});

// export const addItemFromProductPage = ()
