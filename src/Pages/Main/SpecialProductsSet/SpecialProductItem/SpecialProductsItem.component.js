import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./SpecialProductsItem.styles.scss";

class SpecialProductsItem extends Component {
  render() {
    return (
      <li className="SpecialProductsItem" key={this.props.id}>
        <Link className="Link" to="/product-page">
          <div className="special-products-item-img">
            <div className={this.props.isOnSale ? "sale-box" : "sale-box hide"}>
              <p className="sale-type">{this.props.saleType}</p>
              <p className="sale-amount">{this.props.saleAmount}</p>
            </div>
            <img
              className="item-img-main"
              src={this.props.mainImage}
              alt="product item"
            />
          </div>
        </Link>
        <div className="special-products-item-info">
          <Link className="Link" to="/product-page">
            <p className="product-name">
              <span
                className={
                  this.props.hasBrandName ? "brand-name" : "brand-name hide"
                }
              >
                {`[${this.props.brandName}] `}
              </span>
              {this.props.productName}
            </p>
          </Link>
          <p className="price">{`${this.props.price}원`}</p>
          <p
            className={
              this.props.hasOriginalPrice
                ? "original-price"
                : "original-price hide"
            }
          >
            {`${this.props.originalPrice}원`}
          </p>
        </div>
      </li>
    );
  }
}

export default SpecialProductsItem;
