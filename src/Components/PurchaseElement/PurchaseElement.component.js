import React, { Component } from "react";

import "./PurchaseElement.styles.scss";

class PurchaseElement extends Component {
  render() {
    const { product_name, price, order_number, product_image_url } = this.props;
    return (
      <div className="PurchaseElement">
        <div className="top">
          <span>{product_name}</span>
          <i className="fal fa-greater-than" />
        </div>
        <div className="bottom">
          <img src={product_image_url} alt="purchase-item" />
          <div className="purchase-information">
            <div className="purchase-number">
              <span>주문번호</span>
              <span>{order_number}</span>
            </div>
            <div className="purchase-amount">
              <span>결제금액</span>
              <span>{price.toLocaleString()}원</span>
            </div>
            <div className="purchase-shipping-status">
              <span>주문상태</span>
              <span>배송완료</span>
            </div>
          </div>
          <div className="option-buttons">
            <button className="review">후기 쓰기</button>
            <button className="help">1:1 문의</button>
          </div>
        </div>
      </div>
    );
  }
}

export default PurchaseElement;
