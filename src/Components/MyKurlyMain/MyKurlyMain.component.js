import React, { Component } from "react";

import { connect } from "react-redux";

import { GET_PURHCASE_LIST_API } from "../../config";

import PurchaseElement from "../PurchaseElement/PurchaseElement.component";

import "./MyKurlyMain.styles.scss";

class MyKurlyMain extends Component {
  // componentDidMount() {
  //   fetch(GET_PURHCASE_LIST_API, {

  //   });
  // }
  render() {
    const { purchaseList } = this.props;
    console.log(purchaseList.length);
    return (
      <main>
        <div className="purchase-list-name">
          <span>주문 내역</span>
          <span>지난 3년간의 주문 내역 조회가 가능합니다</span>
        </div>
        <div className="purchase-list-container">
          {/* {purchaseList.length === 0 ? (
            <span>주문내역이 없습니다</span>
          ) : (
            <PurchaseElement />
          )} */}
          {/* <span>주문내역이 없습니다</span> */}
          <PurchaseElement />
          <PurchaseElement />
          <PurchaseElement />
        </div>
      </main>
    );
  }
}

const mapStateToProps = ({ purchase }) => ({
  purchaseList: purchase.purchaseList,
});

export default connect(mapStateToProps)(MyKurlyMain);
