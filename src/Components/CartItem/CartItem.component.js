import React, { Component } from "react";
import { connect } from "react-redux";

import {
  GET_SHOPPINGBASKET_API,
  SEND_RECENT_ITEM_SELECTED_API,
} from "../../config";

import {
  increaseItemAmount,
  decreaseItemAmount,
  clearItemFromCart,
  toggleSelectedItemCheckBox,
  checkStatusAllSelectCheckBox,
  selectedItemsTotalPrice,
  getSelectedItemsAmount,
} from "../../redux/cart/cart.actions";

import { numberWithCommas } from "../../redux/cart/cart.utils";

import "./CartItem.styles.scss";

class CartItem extends Component {
  toggleCheckBox = () => {
    const {
      cartItemInfo,
      toggleSelectedItemCheckBox,
      checkStatusAllSelectCheckBox,
      selectedItemsTotalPrice,
      getSelectedItemsAmount,
      userToken,
    } = this.props;
    const { id } = cartItemInfo;
    toggleSelectedItemCheckBox(id);
    checkStatusAllSelectCheckBox();
    selectedItemsTotalPrice();
    getSelectedItemsAmount();
    fetch(SEND_RECENT_ITEM_SELECTED_API, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: userToken,
      },
      body: JSON.stringify({
        shopbasket_id: id,
        selected: "single",
      }),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
  };

  decreaseButtonClick = () => {
    const {
      cartItemInfo,
      decreaseItemAmount,
      selectedItemsTotalPrice,
      userToken,
    } = this.props;
    decreaseItemAmount(cartItemInfo);
    fetch(GET_SHOPPINGBASKET_API, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: userToken,
      },
      body: JSON.stringify({
        increase_or_decrease: "minus",
        shopbasket_id: cartItemInfo.id,
      }),
    }).catch((error) => console.log(error.message));
    selectedItemsTotalPrice();
  };

  increaseButtonClick = () => {
    const {
      cartItemInfo,
      increaseItemAmount,
      selectedItemsTotalPrice,
      userToken,
    } = this.props;
    increaseItemAmount(cartItemInfo);
    fetch(GET_SHOPPINGBASKET_API, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: userToken,
      },
      body: JSON.stringify({
        increase_or_decrease: "plus",
        shopbasket_id: cartItemInfo.id,
      }),
    }).catch((error) => console.log(error.message));
    selectedItemsTotalPrice();
  };

  clearItemButtonClick = () => {
    const {
      cartItemInfo,
      clearItemFromCart,
      selectedItemsTotalPrice,
      checkStatusAllSelectCheckBox,
      getSelectedItemsAmount,
      userToken,
    } = this.props;
    clearItemFromCart(cartItemInfo);
    selectedItemsTotalPrice();
    checkStatusAllSelectCheckBox();
    getSelectedItemsAmount();
    fetch(GET_SHOPPINGBASKET_API, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: userToken,
      },
      body: JSON.stringify({
        shopbasket_id: cartItemInfo.id,
      }),
    });
  };

  render() {
    const { cartItemInfo } = this.props;
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
      <div className="CartItem">
        <div className="cart-item-select">
          <input
            type="checkbox"
            onChange={this.toggleCheckBox}
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
                  <div className="left" onClick={this.decreaseButtonClick}>
                    <p className="left-element">&#8722;</p>
                  </div>
                  <div className="quantity">
                    <span>{quantity}</span>
                  </div>
                  <div className="right" onClick={this.increaseButtonClick}>
                    <p className="right-element">&#43;</p>
                  </div>
                </div>
              </div>
              <div className="cart-item-total">
                <span>{numberWithCommas(price * quantity)}원</span>
              </div>
              <div
                className="cart-item-delete"
                onClick={this.clearItemButtonClick}
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

const mapStateToProps = ({ cart, user }) => ({
  cartItems: cart.cartItems,
  allSelect: cart.allSelect,
  userToken: user.userToken,
});

const mapDispatchToProps = (dispatch) => ({
  increaseItemAmount: (item) => dispatch(increaseItemAmount(item)),
  decreaseItemAmount: (item) => dispatch(decreaseItemAmount(item)),
  clearItemFromCart: (item) => dispatch(clearItemFromCart(item)),
  toggleSelectedItemCheckBox: (id) => dispatch(toggleSelectedItemCheckBox(id)),
  checkStatusAllSelectCheckBox: () => dispatch(checkStatusAllSelectCheckBox()),
  selectedItemsTotalPrice: () => dispatch(selectedItemsTotalPrice()),
  getSelectedItemsAmount: () => dispatch(getSelectedItemsAmount()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
