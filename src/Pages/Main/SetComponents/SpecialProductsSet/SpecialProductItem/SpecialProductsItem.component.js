import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./SpecialProductsItem.styles.scss";

function insertCommasToNum(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class SpecialProductsItem extends Component {
  constructor() {
    super();
    this.state = {
      isImgVertical: true,
    };
  }

  resizeImage = (e) => {
    this.setState({
      isImgVertical: e.target.naturalHeight > e.target.naturalWidth,
    });
  };

  render() {
    const { isImgVertical } = this.state;
    const {
      id,
      name,
      imageUrl,
      discountPercent,
      discountName,
      discountPrice,
      originalPrice,
    } = this.props;
    return (
      <li className="SpecialProductsItem" key={id}>
        <Link className="Link" to={`/productdetails/${id}`}>
          <div className="special-products-item-img">
            <div className={discountPercent ? "sale-box" : "sale-box hide"}>
              <p className="sale-type">{discountName}</p>
              <p className="sale-amount">{`${discountPercent}%`}</p>
            </div>
            <img
              className={
                isImgVertical
                  ? "item-img-main full-width"
                  : "item-img-main full-height"
              }
              src={imageUrl}
              alt="product item"
              onLoad={this.resizeImage}
            />
          </div>
        </Link>
        <div className="special-products-item-info">
          <Link className="Link" to="/product-page">
            <p className="product-name">
              <span className={0 ? "brand-name" : "brand-name hide"}>
                {`[${this.props.brandName}] `}
              </span>
              {name}
            </p>
          </Link>
          <p className="price">
            {discountPrice
              ? `${insertCommasToNum(discountPrice)}원`
              : `${insertCommasToNum(originalPrice)}원`}
          </p>
          <p
            className={discountPrice ? "original-price" : "original-price hide"}
          >
            {`${insertCommasToNum(originalPrice)}원`}
          </p>
        </div>
      </li>
    );
  }
}

export default SpecialProductsItem;
