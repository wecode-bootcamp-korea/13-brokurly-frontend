import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class PaymentButton extends Component {
  callback = (response) => {
    const { success, error_msg } = response;
    if (success) {
      alert("결제성공");
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  };

  /* 2. 결제 데이터 정의하기 */

  onClickPayment = () => {
    const {
      payMethod,
      tryToPay,
      orderProductName,
      orderer,
      ordererPhone,
      email,
      address,
    } = this.props;
    /* 1. 가맹점 식별하기 */
    const { IMP } = window;
    IMP.init("imp98947213");

    const data = {
      pg: payMethod, // PG사
      pay_method: payMethod, // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      amount: tryToPay, // 결제금액
      name: orderProductName, // 주문명
      buyer_name: orderer, // 구매자 이름
      buyer_tel: ordererPhone, // 구매자 전화번호
      buyer_email: email, // 구매자 이메일
      buyer_addr: address, // 구매자 주소
    };

    /* 4. 결제 창 호출하기 */
    IMP.request_pay(data, this.callback);
  };
  render() {
    return (
      <button className="pay-button" onClick={this.onClickPayment}>
        결제하기
      </button>
    );
  }
}

export default withRouter(PaymentButton);
