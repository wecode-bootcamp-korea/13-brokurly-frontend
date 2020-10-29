import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import OrderProductList from "./OrderProductList/OrderProductList.component";
import PaymentButton from "./PaymentButton/PaymentButton.component";

import "./Payment.styles.scss";

import PaymentMethod from "./PaymentMethod/PaymentMethod.component";
import { getCartItems } from "../../redux/cart/cart.actions";

import { GET_SHOPPINGBASKET_API } from "../../config";

class Payment extends Component {
  constructor() {
    super();
    this.state = {
      onOffSwitch: true,
      checkPayMethod: "",
    };
  }

  numberWithCommas = (price) =>
    price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  handleCheckBox = (e) => {
    this.setState({ checkPayMethod: e.target.name });
  };

  componentDidMount = async () => {
    const { userToken, getCartItems } = this.props;
    await fetch(GET_SHOPPINGBASKET_API, {
      headers: {
        "content-type": "application/json",
        Authorization: userToken,
      },
    })
      .then((res) => res.json())
      .then((data) => data.shopping_list)
      .then((cartItems) => getCartItems(cartItems))
      .catch((error) => console.log(error));
  };

  render() {
    const { onOffSwitch } = this.state;
    const { cartItems, currentUser } = this.props;
    const orderingItems = cartItems.filter((item) => item.checked === true);
    const totalAmount = orderingItems.reduce(
      (acc, curVal) => acc + curVal.discount_price * curVal.quantity,
      0
    );
    return (
      <div className="Payment">
        <div className="payment-container">
          <header>
            <h2>주문서</h2>
            <p>주문하실 상품명 및 수량을 정확하게 확인해 주세요.</p>
          </header>
          <section className="section-name product-info">
            <h3>상품 정보</h3>
            <div className="product-info-container">
              <div
                className={`products-list-before ${onOffSwitch ? "on" : "off"}`}
              >
                <p>{`${orderingItems && orderingItems[0].name} 외 ${
                  orderingItems && orderingItems.length - 1
                }종`}</p>
                <button
                  onClick={() => this.setState({ onOffSwitch: !onOffSwitch })}
                >
                  상세보기<i className="fas fa-angle-down"></i>
                </button>
              </div>
              <div className={`onOffBox ${onOffSwitch ? "off" : "on"}`}>
                <div className={`products-list-bar `}>
                  <span>상품 정보</span>
                  <span>상품 금액</span>
                </div>
                <ul className="order-products">
                  {orderingItems.map((product, idx) => (
                    <OrderProductList
                      name={product.name}
                      imeage={product.image_url}
                      discount_price={product.discount_price}
                      quantity={product.quantity}
                      key={idx}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </section>
          <section className="section-name order-info">
            <h3>주문자 정보</h3>
            <div className="user-info-container">
              <div className="user-info">
                <span className="user-info-content">주문자*</span>
                <span className="user-info-input">{currentUser.user_name}</span>
              </div>
              <div className="user-info">
                <span className="user-info-content">휴대폰*</span>
                <span className="user-info-input">{currentUser.phone}</span>
              </div>
              <div className="user-info">
                <span className="user-info-content">이메일*</span>
                <span className="user-info-input">{currentUser.email}</span>
                <div className="text-info">
                  <p>이메일을 통해 주문처리과정을 보내드립니다.</p>
                  <p>
                    정보 변경은 <b>{`마이컬리 > 개인정보`}</b> 수정 메뉴에서
                    가능합니다.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="section-name delivery-info">
            <h3>배송 정보</h3>
            <p className="delivery-holiday">
              *배송 휴무일:샛별배송(휴무없음),택배배송(일요일)
            </p>
            <div className="delivery-container">
              <div className="delivery-info spot">
                <span className="delivery-info-content">배송지</span>
                <div className="spot-info">
                  <div>
                    <span>샛별배송</span>
                    <span>기본배송지</span>
                  </div>
                  <span className="user-spot-info">{currentUser.address}</span>
                  <span className="user-spot-info">{`${currentUser.user_name}, ${currentUser.phone}`}</span>
                  <button className="change-button">변경</button>
                </div>
              </div>
              <div className="delivery-info receive-info">
                <span className="delivery-info-content">받으실장소</span>
                <div className="spot-info">
                  <span className="receive-method">문 앞</span>
                  <span className="receive-method">
                    출입방법:공동현관 비밀번호
                  </span>
                  <button className="change-button">변경</button>
                </div>
              </div>
            </div>
          </section>
          <section className="section-name payment-info">
            <div className="payment-info-left">
              <h3>결제 수단</h3>
              <div className="payment-method">
                <ul className="method-lists">
                  <PaymentMethod
                    onCheck={this.handleCheckBox}
                    payMethod={this.state.checkPayMethod}
                  />
                </ul>
              </div>
            </div>
            <div className="payment-info-right">
              <h3>결제 금액</h3>
              <div className="payment-price">
                <div>
                  <span>주문 금액</span>
                  <span>{totalAmount.toLocaleString()}</span>
                </div>
                <div>
                  <span className="product-price-sales">상품 금액</span>
                  <span>0원</span>
                </div>
                <div>
                  <span className="product-price-sales">상품 할인</span>
                  <span>0원</span>
                </div>
                <div>
                  <span>배송비</span>
                  <span>0원</span>
                </div>
                <div>
                  <span>적립금 사용</span>
                  <span>0원</span>
                </div>
                <div>
                  <span>최종 결제 금액</span>
                  <span className="total-price">
                    {totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </section>
          <section className="section-name complete-btn">
            <PaymentButton
              payMethod={this.state.checkPayMethod}
              orderProductName={`${orderingItems && orderingItems[0].name} 외 ${
                orderingItems && orderingItems.length - 1
              }종`}
              tryToPay={totalAmount}
              orderer={currentUser.user_name}
              ordererPhone={String(currentUser.phone)}
              email={currentUser.email}
              address={currentUser.address}
            />
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user, cart }) => ({
  currentUser: user.currentUser,
  userToken: user.userToken,
  cartItems: cart.cartItems,
});

const mapDispatchToProps = (dispatch) => ({
  getCartItems: (cartItems) => dispatch(getCartItems(cartItems)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Payment)
);
