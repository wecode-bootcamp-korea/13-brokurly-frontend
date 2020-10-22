import React, { Component } from "react";

import "./CartItem.styles.scss";

class CartItem extends Component {
  constructor() {
    super();
    this.state = {
      topName: "[레디어스] 유아 칫솔 3종",
      bottomName: "[래디어스] 퓨어 베이비 화이트",
      price: "3,700",
      quantity: 2,
    };
  }

  render() {
    const { topName, bottomName, price, quantity } = this.state;
    const { checkGroupCheckBox } = this.props;
    return (
      <div className="Cart-item">
        <div className="cart-item-select">
          <input type="checkbox" onChange={checkGroupCheckBox} />
        </div>
        <div className="cart-item-info">
          <div className="cart-item-info-top">
            <span>{topName}</span>
          </div>
          <div className="cart-item-info-bottom">
            <div className="cart-item-photo">
              <img src="http://placehold.it/60x77" alt="item" />
            </div>
            <div className="cart-item-specific-info-container">
              <div className="cart-item-name-and-price">
                <div className="cart-item-name">
                  <span>{bottomName}</span>
                </div>
                <div className="cart-item-price">
                  <span>{price}원</span>
                </div>
              </div>
              <div className="cart-item-quantity">
                <div className="quantity-container">
                  <div className="left">
                    <p className="left-element">&#8722;</p>
                  </div>
                  <div className="quantity">
                    <span>{quantity}</span>
                  </div>
                  <div className="right">
                    <p className="right-element">&#43;</p>
                  </div>
                </div>
              </div>
              <div className="cart-item-total">
                <span>7,400원</span>
              </div>
              <div className="cart-item-delete">
                <span>&#10005;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CartItem;
