import React, { Component } from "react";

import "./ProductModal.styles.scss";
import { GET_SHOPPINGBASKET_API } from "../../../../config";

class ProductModal extends Component {
  constructor(props) {
    super(props);
    const { discountPrice, originalPrice, id } = this.props.product;
    this.state = {
      rootPrice: discountPrice ? discountPrice : originalPrice,
      totalPrice: discountPrice ? discountPrice : originalPrice,
      totalAmount: 1,
      productId: id,
    };
  }

  handleAmount = (e) => {
    const { name } = e.target;
    const { totalAmount, rootPrice } = this.state;
    const calcConfirm = name === "minus" ? -1 : 1;
    const nextCount = totalAmount + calcConfirm;

    this.setState({
      totalAmount: nextCount,
      totalPrice: nextCount * rootPrice,
    });
  };

  sendShoppingList = async () => {
    try {
      const { productId, totalAmount } = this.state;
      const response = await fetch(GET_SHOPPINGBASKET_API, {
        method: "POST",
        headers: {
          Authorization:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiaGFydW0ifQ.nMUcgev8vz4rbQY-3z2F0tFFSKQjBMgwCVWOOTm91Qw",
        },
        body: JSON.stringify({
          product_id: productId,
          quantity: totalAmount,
        }),
      });
      if (response.state === 200) {
        throw new Error("cannot fetch the data");
      }
      const result = await response.json();
      console.log(result);
    } catch (err) {
      console.log("!! error alert !!");
    }
  };

  render() {
    const { product, isShoppingBasketClicked, closeModal } = this.props;
    const { totalPrice, totalAmount, rootPrice } = this.state;
    return (
      <div
        className={`ProductModal ${
          isShoppingBasketClicked ? "" : "display-none"
        }`}
      >
        <div className="modal-title">
          <span>상품 선택</span>
          <button onClick={closeModal}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="modal-content">
          <div className="modal-cart">{product.name}</div>
          <div className="modal-list">
            <ul>
              <li>
                <div className="product-name">{product.name}</div>
                <div className="product-price">
                  <span>{rootPrice.toLocaleString()}원</span>
                  <div>
                    <button
                      onClick={this.handleAmount}
                      name="minus"
                      disabled={totalAmount < 1}
                    >
                      -
                    </button>
                    <input type="number" name="" value={totalAmount} />
                    <button onClick={this.handleAmount} name="plus">
                      +
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="modal-total-price">
            <span>합계</span>
            <div>
              <span>{totalPrice.toLocaleString()}</span>
              <span>원</span>
            </div>
          </div>
          <div className="modal-discount">
            <span>적립</span>
            <span>로그인 후, 적립혜택 제공</span>
          </div>
          <div className="modal-button">
            <button onClick={closeModal}>취소</button>
            <button onClick={this.sendShoppingList}>장바구니 담기</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductModal;
