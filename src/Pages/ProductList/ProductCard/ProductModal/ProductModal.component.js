import React, { Component } from "react";

import "./ProductModal.styles.scss";

const API = "http://10.58.6.216:8000/user/shoppingbasket";

class ProductModal extends Component {
  state = {
    isMinusAmount: true,
  };

  getNumberWithCommas = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  getRealPrice = (material) => {
    return material.discountPrice
      ? material.discountPrice
      : material.originalPrice;
  };

  getTotalPrice = () => {
    const { totalAmount, rootPrice } = this.state;
    const newTotalPrice = totalAmount * rootPrice;
    this.setState({
      totalPrice: newTotalPrice,
    });
  };

  handleAmount = async (e) => {
    const { name } = e.target;
    const { totalAmount } = this.state;

    await this.setState({
      totalAmount:
        (name === "plus" && totalAmount + 1) ||
        (name === "minus" && totalAmount - 1),
      isMinusAmount: totalAmount <= 1,
    });

    this.getTotalPrice();
  };

  sendShoppingList = async () => {
    try {
      const { productId, totalAmount } = this.state;
      const response = await fetch(API, {
        method: "POST",
        headers: {
          Authorization:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiaGFydW0ifQ.nMUcgev8vz4rbQY-3z2F0tFFSKQjBMgwCVWOOTm91Qw",
        },
        body: JSON.stringify({
          productId,
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

  componentDidMount = () => {
    const { product } = this.props;
    this.setState({
      rootPrice: this.getRealPrice(product),
      totalPrice: this.getRealPrice(product),
      totalAmount: 1,
      productId: product.id,
    });
  };

  render() {
    const { product, isShoppingBasketClicked, closeModal } = this.props;
    const { totalPrice, totalAmount, isMinusAmount } = this.state;
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
                  <span>{this.getRealPrice(product)}원</span>
                  <div>
                    <button
                      onClick={this.handleAmount}
                      name="minus"
                      disabled={isMinusAmount && isMinusAmount}
                    >
                      -
                    </button>
                    <input type="number" name="" defaultValue={totalAmount} />
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
              <span>{this.getNumberWithCommas(+totalPrice)}</span>
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
