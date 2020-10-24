import React, { Component } from "react";
import { connect } from "react-redux";

import {
  GET_SHOPPINGBASKET_API,
  SEND_RECENT_ITEM_SELECTED_API,
} from "../../config";

import {
  addItem,
  removeItem,
  clearItemFromCart,
  toggleSelectedItemCheckBox,
  checkStatusAllSelectCheckBox,
  selectedItemsTotalPrice,
  getSelectedItemsAmount,
} from "../../redux/cart/cart.actions";

import { numberWithCommas } from "../../redux/cart/cart.utils";

import "./CartItem.styles.scss";

class CartItem extends Component {
  render() {
    const {
      cartItemInfo,
      addItem,
      removeItem,
      clearItemFromCart,
      toggleSelectedItemCheckBox,
      checkStatusAllSelectCheckBox,
      selectedItemsTotalPrice,
      getSelectedItemsAmount,
    } = this.props;
    const {
      id,
      quantity,
      user_id,
      product_id,
      option,
      name,
      price,
      sold_out,
      sales,
      option_name,
      option_price,
      option_sold_out,
      option_sales,
      checked,
      image_url,
    } = cartItemInfo;
    return (
      <div className="Cart-item">
        <div className="cart-item-select">
          <input
            type="checkbox"
            onChange={() => {
              toggleSelectedItemCheckBox(id);
              checkStatusAllSelectCheckBox();
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
                  shopbasket_id: id,
                  selected: "single",
                }),
              })
                .then((response) => response.json())
                .catch((error) => console.log(error));
            }}
            checked={checked}
          />
        </div>
        <div className="cart-item-info">
          {option_name ? (
            <div className="cart-item-info-top">
              <span>{name}</span>
              <span>{numberWithCommas(price)}원</span>
            </div>
          ) : (
            ""
          )}
          <div className="cart-item-info-bottom">
            <div className="cart-item-photo">
              <img src={image_url} alt="item" />
            </div>
            <div className="cart-item-specific-info-container">
              <div className="cart-item-name-and-price">
                <div className="cart-item-name">
                  {option_name ? (
                    <span>{option_name}</span>
                  ) : (
                    <span>{name}</span>
                  )}
                  {sold_out ? <span className="sold-out">품절</span> : ""}
                </div>
                <div className="cart-item-price">
                  <span>{numberWithCommas(option_price)}원</span>
                </div>
              </div>
              <div className="cart-item-quantity">
                <div className="quantity-container">
                  <div
                    className="left"
                    onClick={() => {
                      removeItem(cartItemInfo);
                      fetch(GET_SHOPPINGBASKET_API, {
                        method: "PUT",
                        headers: {
                          "content-type": "application/json",
                          Authorization:
                            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiaGFydW0ifQ.nMUcgev8vz4rbQY-3z2F0tFFSKQjBMgwCVWOOTm91Qw",
                        },
                        body: JSON.stringify({
                          increase_or_decrease: "minus",
                          shopbasket_id: id,
                        }),
                      })
                        .then((response) => console.log(response))
                        .catch((error) => console.log(error.message));
                      selectedItemsTotalPrice();
                    }}
                  >
                    <p className="left-element">&#8722;</p>
                  </div>
                  <div className="quantity">
                    <span>{quantity}</span>
                  </div>
                  <div
                    className="right"
                    onClick={() => {
                      addItem(cartItemInfo);
                      console.log(id);
                      fetch(GET_SHOPPINGBASKET_API, {
                        method: "PUT",
                        headers: {
                          "content-type": "application/json",
                          Authorization:
                            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiaGFydW0ifQ.nMUcgev8vz4rbQY-3z2F0tFFSKQjBMgwCVWOOTm91Qw",
                        },
                        body: JSON.stringify({
                          increase_or_decrease: "plus",
                          shopbasket_id: id,
                        }),
                      })
                        .then((response) => console.log(response))
                        .catch((error) => console.log(error.message));
                      selectedItemsTotalPrice();
                    }}
                  >
                    <p className="right-element">&#43;</p>
                  </div>
                </div>
              </div>
              <div className="cart-item-total">
                <span>{numberWithCommas(price * quantity)}원</span>
              </div>
              <div
                className="cart-item-delete"
                onClick={() => {
                  clearItemFromCart(cartItemInfo);
                  selectedItemsTotalPrice();
                  checkStatusAllSelectCheckBox();
                  getSelectedItemsAmount();
                  fetch(GET_SHOPPINGBASKET_API, {
                    method: "DELETE",
                    headers: {
                      "content-type": "application/json",
                      Authorization:
                        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiaGFydW0ifQ.nMUcgev8vz4rbQY-3z2F0tFFSKQjBMgwCVWOOTm91Qw",
                    },
                    body: JSON.stringify({
                      shopbasket_id: id,
                    }),
                  }).then((response) => console.log(response));
                }}
              >
                <span>&#10005;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ cart }) => ({
  cartItems: cart.cartItems,
  allSelect: cart.allSelect,
});

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
  removeItem: (item) => dispatch(removeItem(item)),
  clearItemFromCart: (item) => dispatch(clearItemFromCart(item)),
  toggleSelectedItemCheckBox: (id) => dispatch(toggleSelectedItemCheckBox(id)),
  checkStatusAllSelectCheckBox: () => dispatch(checkStatusAllSelectCheckBox()),
  selectedItemsTotalPrice: () => dispatch(selectedItemsTotalPrice()),
  getSelectedItemsAmount: () => dispatch(getSelectedItemsAmount()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
