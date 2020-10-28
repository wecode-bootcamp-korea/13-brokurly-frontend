import React, { Component } from "react";

import "./OrderProductList.styles.scss";

class OrderProductList extends Component {
  render() {
    const { name, imeage, price, quantity, numberComma } = this.props;
    return (
      <li className="OrderProductList">
        <img src={imeage} alt="이미지 데이터" />
        <div className="product-detail">
          <span className="product-title">{name}</span>
          <span className="product-subtitle">{`${quantity}개 / 1개 당 ${numberComma(
            price
          )}원`}</span>
        </div>
        <span className="product-price">{`${numberComma(
          price * quantity
        )}원`}</span>
      </li>
    );
  }
}

export default OrderProductList;
