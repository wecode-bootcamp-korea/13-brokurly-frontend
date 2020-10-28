import React, { Component } from "react";

import "./PaymentMethod.styles.scss";

import kakaopay from "../../../Images/kakaopay.png";
import american from "../../../Images/american.png";

class PaymentMethod extends Component {
  render() {
    return (
      <>
        <li className="PaymentMethod">
          <div className="method-name">카카오 페이</div>
          <label className="payment-check-container">
            <input
              type="checkbox"
              className="check-input"
              name="kakaopay"
              onChange={this.props.onCheck}
              checked={this.props.payMethod === "kakaopay"}
            />
            <span className="checkmark"></span>
            <img src={kakaopay} alt="paymethod" />
          </label>
        </li>
        <li className="PaymentMethod">
          <div className="method-name">신용 카드</div>
          <label className="payment-check-container">
            <input
              type="checkbox"
              className="check-input"
              name="uplus"
              onChange={this.props.onCheck}
              checked={this.props.payMethod === "uplus"}
            />
            <span className="checkmark"></span>
            <img className="american" src={american} alt="paymethod" />
          </label>
        </li>
      </>
    );
  }
}

export default PaymentMethod;
