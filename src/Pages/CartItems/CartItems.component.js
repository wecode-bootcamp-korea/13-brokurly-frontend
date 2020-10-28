import React, { Component } from "react";
import { connect } from "react-redux";

import ViewCart from "../../Components/ViewCart/ViewCart.component";

import { checkDiscountTotalPrice } from "../../redux/cart/cart.actions";

import { GET_SHOPPINGBASKET_API } from "../../config";

import {
  selectedItemsTotalPrice,
  getSelectedItemsAmount,
  checkStatusAllSelectCheckBox,
  getCartItems,
} from "../../redux/cart/cart.actions";

import "./CartItems.styles.scss";

class CartItems extends Component {
  async componentDidMount() {
    const {
      selectedItemsTotalPrice,
      getSelectedItemsAmount,
      checkStatusAllSelectCheckBox,
      checkDiscountTotalPrice,
      userToken,
      getCartItems,
    } = this.props;

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

    selectedItemsTotalPrice();
    getSelectedItemsAmount();
    checkStatusAllSelectCheckBox();
    checkDiscountTotalPrice();
  }

  render() {
    const { totalPrice, discountTotalPrice } = this.props;
    return (
      <div className="CartItems">
        <div className="cart-items-header">
          <h1>장바구니</h1>
          <p>주문하실 상품명 및 수량을 정확하게 확인해 주세요.</p>
        </div>
        <div className="cart-items-content">
          <ViewCart />
        </div>
        <div className="price-result-container">
          <div className="initial-price">
            <span className="initial-price-text">상품금액</span>
            <span className="initial-price-number">{totalPrice} 원</span>
          </div>
          <span>&#8722;</span>
          <div className="discount-amount">
            <span className="discount-amount-text">상품할인금액</span>
            <span className="discount-amount-number">
              {discountTotalPrice} 원
            </span>
          </div>
          <span>&#43;</span>
          <div className="delivery-fee">
            <span className="delivery-fee-text">배송비</span>
            <span className="delivery-fee-number">0 원</span>
          </div>
          <span>&#61;</span>
          <div className="price-result">
            <span className="price-result-text">결제예정금액</span>
            <span className="price-result-number">
              {parseInt(totalPrice - discountTotalPrice).toLocaleString()} 원
            </span>
            <span className="mileage-point-info">
              구매시 {((totalPrice - discountTotalPrice) / 10).toLocaleString()}
              원 적립
            </span>
          </div>
          <div className="price-result-additonal-info">
            <span>*쿠폰, 적립금은 다음화면인 '주문서'에서 확인가능합니다.</span>
          </div>
        </div>
        <div className="goto-order-page">
          <button className="goto-order-page-button">주문하기</button>
        </div>
        <div className="warning">
          <span className="warning-text-top">
            '입금확인'사태일때는 주문내역 상세 페이지에서 직접 주문취소가
            가능합니다.
          </span>
          <span className="warning-text-bottom">
            '입금확인' 이후 상태에는 고객행복센터로 문의해주세요.
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ cart, user }) => ({
  totalPrice: cart.selectedItemsTotalPrice,
  cartItems: cart.cartItems,
  discountTotalPrice: cart.discountTotalPrice,
  userToken: user.userToken,
});

const mapDispatchToProps = (dispatch) => ({
  selectedItemsTotalPrice: () => dispatch(selectedItemsTotalPrice()),
  getSelectedItemsAmount: () => dispatch(getSelectedItemsAmount()),
  checkStatusAllSelectCheckBox: () => dispatch(checkStatusAllSelectCheckBox()),
  getCartItems: (cartItems) => dispatch(getCartItems(cartItems)),
  checkDiscountTotalPrice: () => dispatch(checkDiscountTotalPrice()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartItems);
