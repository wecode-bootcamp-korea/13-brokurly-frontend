import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { addMileage } from "../../../redux/user/user.actions";
import { GET_PURHCASE_LIST_API } from "../../../config";

class PaymentButton extends Component {
  callback = (response) => {
    const { success, error_msg } = response;
    const { history, userToken, addMileage, totalAmount } = this.props;
    if (success) {
      alert("결제성공");
      fetch(GET_PURHCASE_LIST_API, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: userToken,
        },
      });
      addMileage(totalAmount / 10);
      history.push("/");
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  };

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

    const { IMP } = window;
    IMP.init("imp98947213");

    const data = {
      pg: payMethod,
      pay_method: payMethod,
      merchant_uid: `mid_${new Date().getTime()}`,
      amount: tryToPay,
      name: orderProductName,
      buyer_name: orderer,
      buyer_tel: ordererPhone,
      buyer_email: email,
      buyer_addr: address,
    };

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

const mapStateToProps = ({ user, cart }) => ({
  userToken: user.userToken,
  cartItems: cart.cartItems,
});

export default connect(mapStateToProps, { addMileage })(
  withRouter(PaymentButton)
);
