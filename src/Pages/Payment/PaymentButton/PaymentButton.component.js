import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { GET_SHOPPINGBASKET_API, GET_PURHCASE_LIST_API } from "../../../config";

class PaymentButton extends Component {
  callback = (response) => {
    const { success, error_msg } = response;
    const { history, userToken, cartItems } = this.props;
    if (success) {
      const checkedCartItems = cartItems.filter((cartItem) => cartItem.checked);
      alert("결제성공");
      for (let cartItem of checkedCartItems) {
        const { id } = cartItem;
        fetch(GET_SHOPPINGBASKET_API, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            Authorization: userToken,
          },
          body: JSON.stringify({
            shopbasket_id: id,
          }),
        });
      }
      fetch(GET_PURHCASE_LIST_API, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: userToken,
        },
      });
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

export default connect(mapStateToProps)(withRouter(PaymentButton));
