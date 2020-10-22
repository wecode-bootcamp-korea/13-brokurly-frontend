import React, { Component } from "react";
import { connect } from "react-redux";

import {
  addItem,
  removeItem,
  clearItemFromCart,
  toggleSelectedItemCheckBox,
  checkStatusAllSelectCheckBox,
  selectedItemsTotalPrice,
} from "../../redux/cart/cart.actions";
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
    } = this.props;
    const {
      id,
      headerName,
      mainName,
      productPrice,
      quantity,
      checked,
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
            }}
            checked={checked}
          />
        </div>
        <div className="cart-item-info">
          <div className="cart-item-info-top">
            <span>{headerName}</span>
          </div>
          <div className="cart-item-info-bottom">
            <div className="cart-item-photo">
              <img src="http://placehold.it/60x77" alt="item" />
            </div>
            <div className="cart-item-specific-info-container">
              <div className="cart-item-name-and-price">
                <div className="cart-item-name">
                  <span>{mainName}</span>
                </div>
                <div className="cart-item-price">
                  <span>{productPrice}원</span>
                </div>
              </div>
              <div className="cart-item-quantity">
                <div className="quantity-container">
                  <div
                    className="left"
                    onClick={() => {
                      removeItem(cartItemInfo);
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
                      selectedItemsTotalPrice();
                    }}
                  >
                    <p className="right-element">&#43;</p>
                  </div>
                </div>
              </div>
              <div className="cart-item-total">
                <span>{productPrice * quantity}원</span>
              </div>
              <div
                className="cart-item-delete"
                onClick={() => {
                  clearItemFromCart(cartItemInfo);
                  selectedItemsTotalPrice();
                  checkStatusAllSelectCheckBox();
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
});

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
