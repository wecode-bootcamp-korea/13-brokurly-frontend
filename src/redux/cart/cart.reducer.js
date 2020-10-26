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
  cartItems: [
    // {
    //   checked: true,
    //   id: 4,
    //   image_url:
    //     "https://images.unsplash.com/photo-1582515073490-39981397c445?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    //   name: "한끼 당근 1개",
    //   option: 0,
    //   option_name: "",
    //   option_price: 1300,
    //   option_sales: "",
    //   option_sold_out: "",
    //   price: 1300,
    //   product_id: 2,
    //   quantity: 3,
    //   sales: 1,
    //   sold_out: true,
    //   user_id: 19,
    // },
    // {
    //   checked: false,
    //   id: 8,
    //   image_url:
    //     "https://images.unsplash.com/photo-1598806243937-2072d39bc11d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=633&q=80",
    //   name: "간편 간식 브리또 8종",
    //   option: 2,
    //   option_name: "불고기 브리또",
    //   option_price: 2800,
    //   option_sales: 1,
    //   option_sold_out: false,
    //   price: 2800,
    //   product_id: 5,
    //   quantity: 1,
    //   sales: 1,
    //   sold_out: true,
    //   user_id: 19,
    // },
    // {
    //   checked: false,
    //   id: 9,
    //   image_url:
    //     "https://images.unsplash.com/photo-1598806243937-2072d39bc11d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=633&q=80",
    //   name: "간편 간식 브리또 8종",
    //   option: 3,
    //   option_name: "야채 브리또",
    //   option_price: 2800,
    //   option_sales: 1,
    //   option_sold_out: false,
    //   price: 2800,
    //   product_id: 5,
    //   quantity: 1,
    //   sales: 1,
    //   sold_out: false,
    //   user_id: 19,
    // },
  ],
  allSelect: true,
  seletectedItemsAmount: 0,
  selectedItemsTotalPrice: 0,
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.INCREASE_ITEM_AMOUNT:
      return {
        ...state,
        cartItems: increaseItemAmount(state.cartItems, action.payload),
      };
    case CartActionTypes.DECREASE_ITEM_AMOUNT:
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
        cartItems: [...action.payload],
      };
    case CartActionTypes.DELETE_SOLDOUT_ITEMS:
      return {
        ...state,
        cartItems: filterOutSoldoutItems(state.cartItems),
      };
    case CartActionTypes.ADD_ITEM_TO_CART:
      return {
        ...state,
        cartItems: checkAddItemToCart(state.cartItems, action.payload),
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
