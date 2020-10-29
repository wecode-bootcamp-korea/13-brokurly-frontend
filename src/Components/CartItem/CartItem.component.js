import React, { Component } from "react";
import { connect } from "react-redux";
import { checkDiscountTotalPrice } from "../../redux/cart/cart.actions";
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
import "./CartItem.styles.scss";
class CartItem extends Component {
  toggleCheckBox = async (e) => {
    e.persist();
    const {
      cartItemInfo,
      toggleSelectedItemCheckBox,
      checkDiscountTotalPrice,
      userToken,
    } = this.props;
    const { id } = cartItemInfo;
    try {
      await toggleSelectedItemCheckBox(id);
      await this.checkTotalPriceAndAmount();
      await fetch(SEND_RECENT_ITEM_SELECTED_API, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          Authorization: userToken,
        },
        body: JSON.stringify({
          shopbasket_id: id,
          selected: "single",
        }),
      });
      checkDiscountTotalPrice();
    } catch (error) {
      console.error(error);
    }
  };
  checkTotalPriceAndAmount = () => {
    const {
      checkStatusAllSelectCheckBox,
      selectedItemsTotalPrice,
      getSelectedItemsAmount,
      checkDiscountTotalPrice,
    } = this.props;
    checkStatusAllSelectCheckBox();
    selectedItemsTotalPrice();
    getSelectedItemsAmount();
    checkDiscountTotalPrice();
  };
  amountChangeIncreaseOrDecrease = (isIncrease) => {
    const {
      cartItemInfo,
      decreaseItemAmount,
      increaseItemAmount,
      selectedItemsTotalPrice,
      checkDiscountTotalPrice,
      userToken,
    } = this.props;
    const operation = isIncrease ? "plus" : "minus";
    isIncrease
      ? increaseItemAmount(cartItemInfo)
      : decreaseItemAmount(cartItemInfo);
    fetch(GET_SHOPPINGBASKET_API, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: userToken,
      },
      body: JSON.stringify({
        increase_or_decrease: operation,
        shopbasket_id: cartItemInfo.id,
      }),
    }).catch((error) => console.log(error.message));
    selectedItemsTotalPrice();
    checkDiscountTotalPrice();
  };
  clearItemButtonClick = () => {
    const {
      cartItemInfo,
      clearItemFromCart,
      selectedItemsTotalPrice,
      checkStatusAllSelectCheckBox,
      getSelectedItemsAmount,
      checkDiscountTotalPrice,
      userToken,
    } = this.props;
    clearItemFromCart(cartItemInfo);
    selectedItemsTotalPrice();
    checkStatusAllSelectCheckBox();
    getSelectedItemsAmount();
    checkDiscountTotalPrice();
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
    const { cartItemInfo, checked } = this.props;
    const {
      quantity,
      name,
      price,
      sold_out,
      discount_price,
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
          <div className="cart-item-info-bottom">
            <div className="cart-item-photo">
              <img src={image_url} alt="item" />
            </div>
            <div className="specific-info-container">
              <div className="cart-item-name-and-price">
                <div className="cart-item-name">
                  <span>{name}</span>
                  {sold_out && <span className="sold-out">품절</span>}
                </div>
                <div className="cart-item-price">
                  <span>{Number(price).toLocaleString()}원</span>
                  <span>{Number(discount_price).toLocaleString()}원</span>
                </div>
              </div>
              <div className="cart-item-quantity">
                <div className="quantity-container">
                  <div
                    className="minus"
                    onClick={() => this.amountChangeIncreaseOrDecrease(false)}
                  >
                    <p className="minus-element">&#8722;</p>
                  </div>
                  <div className="quantity">
                    <span>{quantity}</span>
                  </div>
                  <div
                    className="plus"
                    onClick={() => this.amountChangeIncreaseOrDecrease(true)}
                  >
                    <p className="plus-element">&#43;</p>
                  </div>
                </div>
              </div>
              <div className="cart-item-total">
                <span>{(discount_price * quantity).toLocaleString()}원</span>
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
  allSelect: cart.allSelect,
  userToken: user.userToken,
});
export default connect(mapStateToProps, {
  increaseItemAmount,
  decreaseItemAmount,
  clearItemFromCart,
  toggleSelectedItemCheckBox,
  checkStatusAllSelectCheckBox,
  selectedItemsTotalPrice,
  getSelectedItemsAmount,
  checkDiscountTotalPrice,
})(CartItem);
