import React, { Component } from "react";
import { connect } from "react-redux";

import FrequentlyPurchaseElement from "../FrequentlyPurchaseElement/FrequentlyPurchaseElement.component";

import {
  frequentlyPurchaseItemsBuyAll,
  clearFrequentlyPurchaseItemList,
} from "../../redux/frequentlyPurchase/frequentlyPurchase.actions";

import "./FrequentlyPurchase.styles.scss";

class FrequentlyPurchase extends Component {
  render() {
    const { frequentlyPurchaseItemsBuyAll } = this.props;
    return (
      <div className="FrequentlyPurchase">
        <div className="frequently-purchase-list-name">
          <span>늘 사는 것</span>
          <span>늘 사는 것으로 등록하신 상품 목록입니다</span>
        </div>
        <div className="frequently-purchase-list-container">
          <FrequentlyPurchaseElement />
          <FrequentlyPurchaseElement />
        </div>
        <div className="select-button">
          <button>늘 사는 것 비우기</button>
          <button onClick={frequentlyPurchaseItemsBuyAll}>전체 주문하기</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ frequentlyPurchase }) => ({
  frequentlyPurchaseList: frequentlyPurchase.frequentlyPurchaseList,
});

const mapDispatchToProps = (dispatch) => ({
  frequentlyPurchaseItemsBuyAll: () =>
    dispatch(frequentlyPurchaseItemsBuyAll()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FrequentlyPurchase);
