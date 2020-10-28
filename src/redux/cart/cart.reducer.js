import CartActionTypes from "./cart.types";
import {
  increaseItemAmount,
  removeItemFromCart,
  toggleItemCheckBox,
  checkAllSelectCheckBox,
  filterOutSelectedItems,
  filterOutSoldoutItems,
  checkAddItemToCart,
} from "./cart.utils";
// shopping_list_json
// shopping_list_element = {
//   [id]
//   [quantity]
//   [user_id] 고객 id
//   [product_id] header 이름
//   [option] 새끼 품목들 id/ option이 없으면 option항목들이 없음
//   [name]
//   [price] 전체
//   [sold_out]
//   [sales]
//   [option_name] 밑에 이름
//   [option_price] 상세 가격
//   [option_sold_out]
//   [option_sales] 판매제한(몇개 이상 혹은 몇개 이하)
// }
const INITIAL_STATE = {
  cartItems: [],
  allSelect: true,
  seletectedItemsAmount: 0,
  selectedItemsTotalPrice: 0,
};

const cartReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case CartActionTypes.INCREASE_ITEM_AMOUNT:
      return {
        ...state,
        cartItems: increaseItemAmount(state.cartItems, payload),
      };
    case CartActionTypes.DECREASE_ITEM_AMOUNT:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, payload),
      };
    case CartActionTypes.CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.id !== payload.id
        ),
      };
    case CartActionTypes.TOGGLE_ITEM_CHECKBOX:
      return {
        ...state,
        cartItems: toggleItemCheckBox(state.cartItems, payload),
      };
    case CartActionTypes.TOGGLE_ALL_SELECT_CHECKBOX:
      return {
        ...state,
        allSelect: !state.allSelect,
        cartItems: state.cartItems.map((cartItem) => {
          cartItem.checked = !state.allSelect;
          return cartItem;
        }),
      };
    case CartActionTypes.CHECK_ALL_SELECT_CHECKBOX:
      return {
        ...state,
        allSelect: checkAllSelectCheckBox(state.cartItems),
      };
    case CartActionTypes.DELETE_SELECTED_ITEMS:
      return {
        ...state,
        cartItems: filterOutSelectedItems(state.cartItems),
      };
    case CartActionTypes.SELECTED_ITEMS_TOTAL_PRICE:
      return {
        ...state,
        selectedItemsTotalPrice: state.cartItems.reduce(
          (accumulator, cartItem) =>
            cartItem.checked
              ? accumulator + cartItem.price * cartItem.quantity
              : accumulator,
          0
        ),
      };
    case CartActionTypes.GET_SELECTED_ITEMS_AMOUNT:
      return {
        ...state,
        seletectedItemsAmount: state.cartItems.reduce(
          (accumulator, cartItem) =>
            cartItem.checked ? accumulator + 1 : accumulator,
          0
        ),
      };
    case CartActionTypes.GET_CART_ITEMS:
      return {
        ...state,
        cartItems: [...payload],
      };
    case CartActionTypes.DELETE_SOLDOUT_ITEMS:
      return {
        ...state,
        cartItems: filterOutSoldoutItems(state.cartItems),
      };
    case CartActionTypes.ADD_ITEM_TO_CART:
      return {
        ...state,
        cartItems: checkAddItemToCart(state.cartItems, payload),
      };
    case CartActionTypes.USER_LOGOUT_CLEAR_CART:
      return {
        ...state,
        cartItems: {},
      };
    default:
      return state;
  }
};

export default cartReducer;
