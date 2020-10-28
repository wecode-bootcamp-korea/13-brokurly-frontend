import React, { Component } from "react";
import { connect } from "react-redux";

import PurchaseElement from "../PurchaseElement/PurchaseElement.component";

import "./Purchase.styles.scss";

class Purchase extends Component {
  render() {
    const { purchaseList } = this.props;
    return (
      <>
        <div className="purchase-list-name">
          <span>주문 내역</span>
          <span>지난 3년간의 주문 내역 조회가 가능합니다</span>
        </div>
        <div className="purchase-list-container">
          {purchaseList.map(
            ({ product_name, price, order_number, product_image_url }, idx) => (
              <PurchaseElement
                key={idx}
                product_name={product_name}
                price={price}
                order_number={order_number}
                product_image_url={product_image_url}
              />
            )
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ purchase }) => ({
  purchaseList: purchase.purchaseList,
});

export default connect(mapStateToProps)(Purchase);
