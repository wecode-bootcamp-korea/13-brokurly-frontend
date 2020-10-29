import React, { Component } from "react";
import { connect } from "react-redux";

import { addItemToCart } from "../../redux/cart/cart.actions";

import { GET_SHOPPINGBASKET_API } from "../../config";

import "./FrequentlyPurchaseElement.styles.scss";

class FrequentlyPurchaseElement extends Component {
  frequentlyPurchaseItemToCart = (product_id, quantity) => {
    const { addItemToCart, userToken, frequentlyPurchaseItem } = this.props;
    addItemToCart({ ...frequentlyPurchaseItem, checked: true });
    fetch(GET_SHOPPINGBASKET_API, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: userToken,
      },
      body: JSON.stringify({
        product_id,
        quantity,
      }),
    });
  };

  render() {
    const { frequentlyPurchaseItem } = this.props;
    const {
      name,
      price,
      image_url,
      product_id,
      quantity,
    } = frequentlyPurchaseItem;
    return (
      <div className="FrequentlyPurchaseElement">
        <div className="bottom">
          <img src={image_url} alt="frequently-purchase-element" />
          <div className="purchase-information">
            <span>{name}</span>
            <span>{price.toLocaleString()}원</span>
          </div>
          <div className="option-buttons">
            <button
              className="review"
              onClick={() =>
                this.frequentlyPurchaseItemToCart(product_id, quantity)
              }
            >
              장바구니 담기
            </button>
            <button className="help">1:1 문의</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  userToken: user.userToken,
});

export default connect(mapStateToProps, {
  addItemToCart,
})(FrequentlyPurchaseElement);
