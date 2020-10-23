import React, { Component } from "react";

import ProductModal from "./ProductModal/ProductModal.component";

import "./ProductCard.styles.scss";

class ProductCard extends Component {
  state = {
    product: this.props.product,
    isWidthBiggerThanHeight: false,
  };

  resizeImage = (e) => {
    const sizeCheck = e.target.naturalWidth >= e.target.naturalHeight;
    this.setState({ isWidthBiggerThanHeight: sizeCheck });
  };

  getNumberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  render() {
    const { isWidthBiggerThanHeight } = this.state;
    const { product } = this.props;
    return (
      <>
        <li className="ProductCard">
          <div className="card-thumbnail">
            <div
              className={`card-event ${
                !product.discountName && "visibility-hidden"
              }`}
            >
              <span>{product.discountName}</span>
              <div>
                <span>{product.discountContent}</span>
              </div>
            </div>
            <img
              src={product.imageUrl}
              alt={product.id}
              className={isWidthBiggerThanHeight ? "full-height" : "full-width"}
              onLoad={this.resizeImage}
            />
          </div>
          <div className="card-shopping">
            <i className="far fa-shopping-cart" />
          </div>
          <div className="card-content">
            <span className="card-title">{product.name}</span>
            <div className="card-price">
              <div className={`${!product.discountPrice && "display-none"}`}>
                <span>
                  {this.getNumberWithCommas(product.originalPrice)}원{" "}
                </span>
                <i className="fas fa-long-arrow-alt-right" />
              </div>
              <span>
                {product.discountPrice
                  ? this.getNumberWithCommas(product.discountPrice)
                  : this.getNumberWithCommas(product.originalPrice)}
                원
              </span>
            </div>
            <span className="card-description">{product.content}</span>
          </div>
        </li>
        <ProductModal />
      </>
    );
  }
}

export default ProductCard;
