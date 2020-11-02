import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Swal from "sweetalert2";

import { addMileage } from "../../../redux/user/user.actions";
import { getCartItems } from "../../../redux/cart/cart.actions";
import { GET_PURHCASE_LIST_API, GET_SHOPPINGBASKET_API } from "../../../config";

class PaymentButton extends Component {
  callback = (response) => {
    const { success, error_msg } = response;
    const { history, userToken, addMileage, totalAmount } = this.props;
    if (success) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "결제 완료하였습니다",
        showConfirmButton: false,
        timer: 2000,
      });
      fetch(GET_PURHCASE_LIST_API, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: userToken,
        },
      });
      addMileage(totalAmount / 10);
      fetch(GET_SHOPPINGBASKET_API, {
        headers: {
          "content-type": "application/json",
          Authorization: userToken,
        },
      })
        .then((res) => res.json())
        .then((data) => data.shopping_list)
        .then((cartItems) => getCartItems(cartItems));
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

export default connect(mapStateToProps, { addMileage, getCartItems })(
  withRouter(PaymentButton)
);
