import CartActionTypes from "./cart.types";
import {
  addItemToCart,
  removeItemFromCart,
  toggleItemCheckBox,
  checkAllSelectCheckBox,
  filterOutSelectedItems,
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
  cartItems: [
    // {
    //   id: 0,
    //   headerName: "[레디어스] 유아 칫솔 3종",
    //   mainName: "[레디어스] 퓨어 베이비 화이트",
    //   productPrice: "3700",
    //   quantity: 2,
    //   checked: true,
    // },
    // {
    //   id: 1,
    //   headerName: "[레디어] 유아 칫솔 3종",
    //   mainName: "[레디어] 퓨어 베이비 화이트",
    //   productPrice: "3600",
    //   quantity: 3,
    //   checked: true,
    // },
    // {
    //   id: 2579,
    //   headerName: "[레디] 유아 칫솔 3종",
    //   mainName: "[레디] 퓨어 베이비 화이트",
    //   productPrice: "3500",
    //   quantity: 4,
    //   checked: true,
    // },
    // {
    //   id: 3,
    //   headerName: "[레] 유아 칫솔 3종",
    //   mainName: "[레] 퓨어 베이비 화이트",
    //   productPrice: "3600",
    //   quantity: 5,
    //   checked: true,
    // },
  ],
  allSelect: true,
  seletectedItemsAmount: 0,
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
    case CartActionTypes.GET_SELECTED_ITEMS_AMOUNT:
      return {
        ...state,
        seletectedItemsAmount: state.cartItems.reduce(
          (accumulator, cartItem) => {
            return cartItem.checked ? accumulator + 1 : accumulator;
          },
          0
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;
