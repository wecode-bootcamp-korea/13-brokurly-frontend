import React, { Component } from "react";

import "./ProductDetailsHeader.styles.scss";

const API = "http://10.58.6.216:8000/user/shoppingbasket";

const otherInfoHeader = {
  productShipping: "배송구분",
  origin: "원산지",
  pakingType: "포장타입",
  shelfLife: "유통기한",
  allergyInformaion: "알레르기정보",
  information: "안내사항",
};

class ProductDetailsHeader extends Component {
  state = {
    isWidthBiggerThanHeight: false,
    isMinusAmount: true,
  };

  resizeImage = (e) => {
    const sizeCheck = e.target.naturalWidth >= e.target.naturalHeight;
    this.setState({ isWidthBiggerThanHeight: sizeCheck });
  };

  getNumberWithCommas = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  getRealPrice = (material) => {
    return material.discountPrice
      ? material.discountPrice
      : material.originalPrice;
  };

  getTotalPrice = () => {
    const { totalAmount, rootPrice } = this.state;
    const newTotalPrice = totalAmount * rootPrice;
    this.setState({
      totalPrice: newTotalPrice,
    });
  };

  handleAmount = async (e) => {
    const { name } = e.target;
    // declare issue!
    const { totalAmount } = this.state;

    await this.setState({
      totalAmount:
        (name === "plus" && totalAmount + 1) ||
        (name === "minus" && totalAmount - 1),
    });

    // NOTE reason using this.state.totalAmount not totalAmount upper is both two things is different.
    await this.setState({
      isMinusAmount: this.state.totalAmount < 1,
    });

    this.getTotalPrice();
  };

  sendShoppingList = async () => {
    try {
      const { productId, totalAmount } = this.state;
      const response = await fetch(API, {
        method: "POST",
        headers: {
          Authorization:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiaGFydW0ifQ.nMUcgev8vz4rbQY-3z2F0tFFSKQjBMgwCVWOOTm91Qw",
        },
        body: JSON.stringify({
          productId,
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
    const { productDetail } = this.props;
    this.setState({
      rootPrice: this.getRealPrice(productDetail),
      totalPrice: this.getRealPrice(productDetail),
      totalAmount: 1,
      productId: productDetail.id,
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
              <i className="far fa-share-alt"></i>
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
              <i className="far fa-question-circle"></i>
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
            {Object.entries(otherInformation).map((info, idx) => {
              return (
                info[1] && (
                  <dl key={idx}>
                    <dt>{otherInfoHeader[info[0]]}</dt>
                    <dd>{info[1]}</dd>
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
