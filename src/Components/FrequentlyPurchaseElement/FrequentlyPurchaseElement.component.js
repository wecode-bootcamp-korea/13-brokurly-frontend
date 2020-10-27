import React, { Component } from "react";

import "./FrequentlyPurchaseElement.styles.scss";

class FrequentlyPurchaseElement extends Component {
  render() {
    return (
      <div className="FrequentlyPurchaseElement">
        <div className="top">
          <span>[고온어다이어트] 미트볼 & 퀴노아영양밥</span>
          <i className="fal fa-greater-than" />
        </div>
        <div className="bottom">
          <img src="http://placehold.it/60x77" alt="frequently-purchase-item" />
          <div className="purchase-information">
            <span>[폴스] 팜하우스 골드 밀크</span>
            <span>3900원</span>
          </div>
          <div className="option-buttons">
            <button className="review">장바구니 담기</button>
            <button className="help">1:1 문의</button>
          </div>
        </div>
      </div>
    );
  }
}

export default FrequentlyPurchaseElement;
