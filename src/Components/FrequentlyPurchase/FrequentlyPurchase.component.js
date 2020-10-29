import React, { Component } from "react";
import { connect } from "react-redux";

import FrequentlyPurchaseElement from "../FrequentlyPurchaseElement/FrequentlyPurchaseElement.component";

import { addItemToCart } from "../../redux/cart/cart.actions";

import {
  clearFrequentlyPurchaseItemList,
  frequentlyPurchaseItemToCartList,
} from "../../redux/frequentlyPurchase/frequentlyPurchase.actions";

import { GET_SHOPPINGBASKET_API } from "../../config";

import "./FrequentlyPurchase.styles.scss";

class FrequentlyPurchase extends Component {
  purchaseAllItems = async () => {
    const { frequentlyPurchaseList, addItemToCart, userToken } = this.props;

    await frequentlyPurchaseList.map((frequentlyPurchaseItem) => {
      fetch(GET_SHOPPINGBASKET_API, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: userToken,
        },
        body: JSON.stringify({
          product_id: frequentlyPurchaseItem.product_id,
          quantity: frequentlyPurchaseItem.quantity,
        }),
      });
      return addItemToCart(frequentlyPurchaseItem);
    });
  };

  render() {
    const {
      frequentlyPurchaseList,
      clearFrequentlyPurchaseItemList,
    } = this.props;
    return (
      <div className="FrequentlyPurchase">
        <div className="frequently-purchase-list-name">
          <span>늘 사는 것</span>
          <span>늘 사는 것으로 등록하신 상품 목록입니다</span>
        </div>
        <div className="frequently-purchase-list-container">
          {!frequentlyPurchaseList.length ? (
            <span>늘 사는 것이 없습니다</span>
          ) : (
            frequentlyPurchaseList.map((frequentlyPurchaseItem, idx) => (
              <FrequentlyPurchaseElement
                key={idx}
                frequentlyPurchaseItem={frequentlyPurchaseItem}
              />
            ))
          )}
        </div>
        <div className="select-button">
          <button onClick={clearFrequentlyPurchaseItemList}>
            늘 사는 것 비우기
          </button>
          <button onClick={this.purchaseAllItems}>전체 주문하기</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ frequentlyPurchase, user }) => ({
  frequentlyPurchaseList: frequentlyPurchase.frequentlyPurchaseList,
  userToken: user.userToken,
});

export default connect(mapStateToProps, {
  clearFrequentlyPurchaseItemList,
  frequentlyPurchaseItemToCartList,
  addItemToCart,
})(FrequentlyPurchase);
