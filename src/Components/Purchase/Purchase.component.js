import React, { Component } from "react";

import PurchaseElement from "../PurchaseElement/PurchaseElement.component";

import "./Purchase.styles.scss";

class Purchase extends Component {
  render() {
    return (
      <>
        <div className="purchase-list-name">
          <span>주문 내역</span>
          <span>지난 3년간의 주문 내역 조회가 가능합니다</span>
        </div>
        <div className="purchase-list-container">
          <PurchaseElement />
          <PurchaseElement />
          <PurchaseElement />
        </div>
      </>
    );
  }
}

export default Purchase;
