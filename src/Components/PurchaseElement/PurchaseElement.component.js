import React, { Component } from "react";

import "./PurchaseElement.styles.scss";

class PurchaseElement extends Component {
  render() {
    return (
      <div className="purchase-element-container">
        <div className="top">
          <span>[고온어다이어트] 미트볼 & 퀴노아영양밥</span>
          <i className="fal fa-greater-than" />
        </div>
        <div className="bottom">
          <img src="http://placehold.it/60x77" alt="purchase-item" />
          <div className="purchase-information">
            <div className="purchase-number">
              <span>주문번호</span>
              <span>1601900246927</span>
            </div>
            <div className="purchase-amount">
              <span>결제금액</span>
              <span>29280원</span>
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
