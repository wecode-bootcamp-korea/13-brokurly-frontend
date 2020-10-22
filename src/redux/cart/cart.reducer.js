import CartActionTypes from "./cart.types";
import {
  addItemToCart,
  removeItemFromCart,
  toggleItemCheckBox,
  checkAllSelectCheckBox,
  filterOutSelectedItems,
} from "./cart.utils";

const INITIAL_STATE = {
  cartItems: [
    {
      id: 0,
      headerName: "[레디어스] 유아 칫솔 3종",
      mainName: "[레디어스] 퓨어 베이비 화이트",
      productPrice: "3700",
      quantity: 2,
      checked: true,
    },
    {
      id: 1,
      headerName: "[레디어] 유아 칫솔 3종",
      mainName: "[레디어] 퓨어 베이비 화이트",
      productPrice: "3600",
      quantity: 3,
      checked: true,
    },
    {
      id: 2579,
      headerName: "[레디] 유아 칫솔 3종",
      mainName: "[레디] 퓨어 베이비 화이트",
      productPrice: "3500",
      quantity: 4,
      checked: true,
    },
    {
      id: 3,
      headerName: "[레] 유아 칫솔 3종",
      mainName: "[레] 퓨어 베이비 화이트",
      productPrice: "3600",
      quantity: 5,
      checked: true,
    },
  ],
  allSelect: true,
  selectedItemsTotalPrice: 0,
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload),
      };
    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload),
      };
    case CartActionTypes.CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        ),
      };
    case CartActionTypes.TOGGLE_ITEM_CHECKBOX:
      return {
        ...state,
        cartItems: toggleItemCheckBox(state.cartItems, action.payload),
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
              ? accumulator + cartItem.productPrice * cartItem.quantity
              : accumulator,
          0
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;
