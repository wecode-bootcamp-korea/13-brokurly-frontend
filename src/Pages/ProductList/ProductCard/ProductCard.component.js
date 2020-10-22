import React, { Component } from "react";

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

  render() {
    const { product, isWidthBiggerThanHeight } = this.state;
    return (
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
          <i className="far fa-shopping-cart"></i>
        </div>
        <div className="card-content">
          <span className="card-title">{product.name}</span>
          <span className="card-price">{product.price}원</span>
          <span className="card-description">{product.content}</span>
        </div>
      </li>
    );
  }
}

export default ProductCard;
