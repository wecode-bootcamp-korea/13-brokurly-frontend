import React, { Component } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";

import { GET_SHOPPINGBASKET_API, PRODUCT_FAVORITE } from "../../../config";
import { RESIZE_IMAGE } from "../../../utils";
import { addItemToCart } from "../../../redux/cart/cart.actions";
import { frequentlyPurchaseItemToCartList } from "../../../redux/frequentlyPurchase/frequentlyPurchase.actions";

import "./ProductDetailsHeader.styles.scss";
class ProductDetailsHeader extends Component {
  constructor(props) {
    super(props);
    const { id, discountPrice, originalPrice } = props.productDetail;
    this.state = {
      isWidthBiggerThanHeight: false,
      rootPrice: discountPrice ? discountPrice : originalPrice,
      totalPrice: discountPrice ? discountPrice : originalPrice,
      productId: id,
      totalAmount: 1,
    };
  }
  handleAmount = (e) => {
    const { totalAmount, rootPrice } = this.state;
    const { name } = e.target;
    const setCalc = name === "minus" ? -1 : 1;
    const nextCount = totalAmount + setCalc;
    this.setState({
      totalAmount: nextCount,
      totalPrice: nextCount * rootPrice,
    });
  };
  sendFavorite = async () => {
    try {
      const { productId } = this.state;
      const { userToken, frequentlyPurchaseItemToCartList } = this.props;
      const { name, imageUrl, originalPrice, id } = this.props.productDetail;
      const response = await fetch(PRODUCT_FAVORITE, {
        method: "POST",
        headers: {
          Authorization: userToken,
        },
        body: JSON.stringify({
          product_id: productId,
        }),
      });
      if (response.state === 200) {
        throw new Error("cannot fetch the data");
      }
      Swal.fire({
        position: "center",
        icon: "success",
        title: "늘 사는 거에 담겼습니다",
        showConfirmButton: false,
        timer: 2000,
      });
      frequentlyPurchaseItemToCartList({
        name,
        price: originalPrice,
        image_url: imageUrl,
        product_id: id,
        quantity: 1,
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log("!! error alert !!");
    }
  };

  sendShoppingList = async () => {
    try {
      const { productId, totalAmount } = this.state;
      const { addItemToCart, userToken } = this.props;
      const response = await fetch(GET_SHOPPINGBASKET_API, {
        method: "POST",
        headers: {
          Authorization: userToken,
        },
        body: JSON.stringify({
          product_id: productId,
          quantity: totalAmount,
        }),
      });
      if (response.state === 200) {
        throw new Error("cannot fetch the data");
      }
      const result = await response.json();
      console.log(result);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "장바구니에 담겼습니다",
        showConfirmButton: false,
        timer: 2000,
      });
      addItemToCart({ product_id: productId, quantity: totalAmount });
    } catch (err) {
      console.log("!! error alert !!");
    }
  };
  render() {
    const {
      name,
      size,
      content,
      imageUrl,
      originalPrice,
      discountPrice,
      discountContent,
      salesUnit,
      otherInformation,
    } = this.props.productDetail;
    const { userToken } = this.props;
    const { totalPrice, totalAmount, isWidthBiggerThanHeight } = this.state;
    return (
      <div className="ProductDetailsHeader">
        <figure className="product-image">
          <img
            src={imageUrl}
            className={isWidthBiggerThanHeight ? "full-height" : "full-width"}
            onLoad={(e) => RESIZE_IMAGE(e, this)}
            alt=""
          />
        </figure>
        <div className="orderinfo">
          <div className="order-header">
            <div>
              <span>{name}</span>
              <span>{content}</span>
            </div>
            <button className="display-none">
              <i className="far fa-share-alt" />
            </button>
          </div>
          <div className="order-price">
            <div>회원할인가</div>
            <div className="sale-price">
              <span>
                {discountPrice
                  ? discountPrice.toLocaleString()
                  : originalPrice.toLocaleString()}
              </span>
              <span>원</span>
              <span>{discountContent}</span>
            </div>
            <div
              className={`original-price ${
                discountPrice === originalPrice && "display-none"
              }`}
            >
              <span>{originalPrice}</span>
              <span>원</span>
              <i className="far fa-question-circle" />
            </div>
            {userToken ? (
              ""
            ) : (
              <div>로그인 후, 회원할인가와 적립혜택이 제공됩니다.</div>
            )}
          </div>
          <div className="order-info">
            <dl>
              <dt>판매단위</dt>
              <dd>{salesUnit}</dd>
            </dl>
            <dl>
              <dt>중량/용량</dt>
              <dd>{size}</dd>
            </dl>
            {otherInformation.map((info, idx) => {
              return (
                info.description && (
                  <dl key={idx}>
                    <dt>{info.category}</dt>
                    <dd>{info.description}</dd>
                  </dl>
                )
              );
            })}
            <dl>
              <dt>구매수량</dt>
              <dd>
                <button
                  onClick={this.handleAmount}
                  name="minus"
                  disabled={totalAmount < 1}
                >
                  -
                </button>
                <input type="number" name="" value={totalAmount} />
                <button onClick={this.handleAmount} name="plus">
                  +
                </button>
              </dd>
            </dl>
          </div>
          <div className="order-total">
            <div>
              <span>총 상품금액:</span>
              <span>{totalPrice.toLocaleString()}</span>
              <span>원</span>
            </div>
            {userToken ? (
              ""
            ) : (
              <div>
                <div>적립</div>
                <span>로그인 후, 회원할인가와 적립혜택 제공</span>
              </div>
            )}
          </div>
          <div className="order-button">
            <button>재입고 알림</button>
            <button onClick={this.sendFavorite}>늘 사는 거</button>
            <button onClick={this.sendShoppingList}>장바구니 담기</button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ user }) => ({
  userToken: user.userToken,
});

export default connect(mapStateToProps, {
  addItemToCart,
  frequentlyPurchaseItemToCartList,
})(ProductDetailsHeader);
