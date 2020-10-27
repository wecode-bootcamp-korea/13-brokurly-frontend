import React, { Component } from "react";

import "./OrderProductList.styles.scss";

import carrot from "../../../Images/carrot.jpeg";

class OrderProductList extends Component {
  render() {
    return (
      <li className="OrderProductList">
        <img src={carrot} alt="이미지 데이터" />
        <div className="product-detail">
          <span className="product-title">[초록동당근] 상품 당근 10종</span>
          <span className="product-subtitle">
            [초록동당근] 1개 / 개 당 15,000원
          </span>
        </div>
        <span className="product-price">15,000원</span>
      </li>
    );
  }
}

export default OrderProductList;
