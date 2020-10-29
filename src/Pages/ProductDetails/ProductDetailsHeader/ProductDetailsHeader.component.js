import React, { Component } from "react";
import { GET_SHOPPINGBASKET_API } from "../../../config";
import { RESIZE_IMAGE } from "../../../utils";

import "./ProductDetailsHeader.styles.scss";
let cnt = 1;

class ProductDetailsHeader extends Component {
  constructor(props) {
    super(props);
    const { productDetail } = props;
    this.state = {
      isWidthBiggerThanHeight: false,
      isMinusAmount: true,
      rootPrice: this.getRealPrice(productDetail),
      totalPrice: this.getRealPrice(productDetail),
      productId: productDetail.id,
    };
  }

  resizeImage = (e) => {
    this.setState({ isWidthBiggerThanHeight: RESIZE_IMAGE(e) });
  };

  getNumberWithCommas = (price) => {
    return price.toLocaleString();
  };

  getRealPrice = ({ discountPrice, originalPrice }) => {
    return discountPrice ? discountPrice : originalPrice;
  };

  handleAmount = (e) => {
    const { name } = e.target;
    const { rootPrice } = this.state;
    name === "plus" && cnt++;
    name === "minus" && cnt--;

    this.setState({
      totalAmount: cnt,
      totalPrice: cnt * rootPrice,
      isMinusAmount: cnt < 1,
    });
  };

  sendShoppingList = async () => {
    try {
      const { productId, totalAmount } = this.state;
      const response = await fetch(GET_SHOPPINGBASKET_API, {
        method: "POST",
        headers: {
          Authorization:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiaGFydW0ifQ.nMUcgev8vz4rbQY-3z2F0tFFSKQjBMgwCVWOOTm91Qw",
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
    } catch (err) {
      console.log("!! error alert !!");
    }
  };

  componentDidMount = () => {
    this.setState({
      totalAmount: 1,
    });
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

    const {
      totalPrice,
      totalAmount,
      isMinusAmount,
      isWidthBiggerThanHeight,
    } = this.state;

    return (
      <div className="ProductDetailsHeader">
        <figure className="product-image">
          <img
            src={imageUrl}
            className={isWidthBiggerThanHeight ? "full-height" : "full-width"}
            onLoad={this.resizeImage}
            alt=""
          />
        </figure>
        <div className="orderinfo">
          <div className="order-header">
            <div>
              <span>{name}</span>
              <span>{content}</span>
            </div>
            <button>
              <i className="far fa-share-alt" />
            </button>
          </div>
          <div className="order-price">
            <div>회원할인가</div>
            <div className="sale-price">
              <span>
                {discountPrice
                  ? this.getNumberWithCommas(discountPrice)
                  : this.getNumberWithCommas(originalPrice)}
              </span>
              <span>원</span>
              <span>{discountContent}</span>
            </div>
            <div
              className={`original-price ${!discountPrice && "display-none"}`}
            >
              <span>{originalPrice}</span>
              <span>원</span>
              <i className="far fa-question-circle" />
            </div>
            <div>로그인 후, 회원할인가와 적립혜택이 제공됩니다.</div>
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
                  disabled={isMinusAmount}
                >
                  -
                </button>
                <input type="number" name="" defaultValue={totalAmount} />
                <button onClick={this.handleAmount} name="plus">
                  +
                </button>
              </dd>
            </dl>
          </div>
          <div className="order-total">
            <div>
              <span>총 상품금액:</span>
              <span>{this.getNumberWithCommas(+totalPrice)}</span>
              <span>원</span>
            </div>
            <div>
              <div>적립</div>
              <span>로그인 후, 회원할인가와 적립혜택 제공</span>
            </div>
          </div>
          <div className="order-button">
            <button>재입고 알림</button>
            <button>늘 사는 거</button>
            <button onClick={this.sendShoppingList}>장바구니 담기</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetailsHeader;
