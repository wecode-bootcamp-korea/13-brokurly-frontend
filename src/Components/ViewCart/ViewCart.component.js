import React, { Component } from "react";
import { connect } from "react-redux";

import { filterOutSoldoutItems } from "../../redux/cart/cart.actions";

import CartItem from "../CartItem/CartItem.component";

import { SEND_RECENT_ITEM_SELECTED_API } from "../../config";

import {
  toggleAllSelectCheckBox,
  deleteSelectedItems,
  selectedItemsTotalPrice,
  checkStatusAllSelectCheckBox,
  getSelectedItemsAmount,
} from "../../redux/cart/cart.actions";

import "./ViewCart.styles.scss";

class ViewCart extends Component {
  componentDidMount() {
    const { checkStatusAllSelectCheckBox, getSelectedItemsAmount } = this.props;
    checkStatusAllSelectCheckBox();
    getSelectedItemsAmount();
  }

  render() {
    const {
      cartItems,
      allSelect,
      toggleAllSelectCheckBox,
      deleteSelectedItems,
      selectedItemsTotalPrice,
      checkStatusAllSelectCheckBox,
      seletectedItemsAmount,
      getSelectedItemsAmount,
      filterOutSoldoutItems,
    } = this.props;
    return (
      <div className="View-cart">
        <div className="selected-items">
          <div className="selected-items-header">
            <div className="selected-items-header-select">
              <label>
                <input
                  type="checkbox"
                  onChange={() => {
                    toggleAllSelectCheckBox();
                    selectedItemsTotalPrice();
                    getSelectedItemsAmount();
                    fetch(SEND_RECENT_ITEM_SELECTED_API, {
                      method: "PUT",
                      headers: {
                        "content-type": "application/json",
                        Authorization:
                          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiaGFydW0ifQ.nMUcgev8vz4rbQY-3z2F0tFFSKQjBMgwCVWOOTm91Qw",
                      },
                      body: JSON.stringify({
                        selected: "all",
                      }),
                    })
                      .then((response) => response.json())
                      .catch((error) => console.log(error));
                  }}
                  checked={allSelect ? true : false}
                />
              </label>
              <span className="select-all">
                전체선택 (<span className="count">{seletectedItemsAmount}</span>
                /<span className="total">{cartItems.length}</span>)
              </span>
            </div>
            <div className="selected-items-header-info">
              <span>상품정보</span>
            </div>
            <div className="selected-items-header-count">
              <span>수량</span>
            </div>
            <div className="selected-items-header-cost">
              <span>상품금액</span>
            </div>
          </div>
          <div className="selected-items-info">
            {cartItems.map((cartItem, idx) => (
              <CartItem key={idx} cartItemInfo={cartItem} productOrder={idx} />
            ))}
          </div>
        </div>
        <div className="selected-options-container">
          <div className="selected-options">
            <div className="select-all">
              <div>
                <input
                  type="checkbox"
                  onChange={() => {
                    toggleAllSelectCheckBox();
                    selectedItemsTotalPrice();
                    getSelectedItemsAmount();
                  }}
                  checked={allSelect ? "checked" : ""}
                />
              </div>
              <span>
                전체선택 {`(${seletectedItemsAmount}/${cartItems.length})`}
              </span>
            </div>
            <button
              className="select-delete"
              onClick={() => {
                deleteSelectedItems();
                selectedItemsTotalPrice();
                checkStatusAllSelectCheckBox();
                getSelectedItemsAmount();
                fetch(SEND_RECENT_ITEM_SELECTED_API, {
                  method: "DELETE",
                  headers: {
                    "content-type": "application/json",
                    Authorization:
                      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiaGFydW0ifQ.nMUcgev8vz4rbQY-3z2F0tFFSKQjBMgwCVWOOTm91Qw",
                  },
                  body: JSON.stringify({
                    delete: "selected",
                  }),
                })
                  .then((response) => response.json())
                  .catch((error) => console.log(error));
              }}
            >
              선택 삭제
            </button>
            <button
              className="sold-out-delete"
              onClick={() => {
                filterOutSoldoutItems();
                selectedItemsTotalPrice();
                checkStatusAllSelectCheckBox();
                getSelectedItemsAmount();
                fetch(SEND_RECENT_ITEM_SELECTED_API, {
                  method: "DELETE",
                  headers: {
                    "content-type": "application/json",
                    Authorization:
                      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiaGFydW0ifQ.nMUcgev8vz4rbQY-3z2F0tFFSKQjBMgwCVWOOTm91Qw",
                  },
                  body: JSON.stringify({
                    delete: "soldout",
                  }),
                })
                  .then((response) => {
                    console.log(response);
                    response.json();
                  })
                  .catch((error) => console.log(error));
              }}
            >
              품절 상품 삭제
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ cart }) => ({
  cartItems: cart.cartItems,
  allSelect: cart.allSelect,
  seletectedItemsAmount: cart.seletectedItemsAmount,
});

const mapDispatchToProps = (dispatch) => ({
  toggleAllSelectCheckBox: () => dispatch(toggleAllSelectCheckBox()),
  deleteSelectedItems: () => dispatch(deleteSelectedItems()),
  selectedItemsTotalPrice: () => dispatch(selectedItemsTotalPrice()),
  checkStatusAllSelectCheckBox: () => dispatch(checkStatusAllSelectCheckBox()),
  getSelectedItemsAmount: () => dispatch(getSelectedItemsAmount()),
  filterOutSoldoutItems: () => dispatch(filterOutSoldoutItems()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewCart);
