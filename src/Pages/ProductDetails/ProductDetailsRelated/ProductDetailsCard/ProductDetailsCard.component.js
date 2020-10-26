import React, { Component } from "react";

import "./ProductDetailsCard.styles.scss";

class ProductDetailsCard extends Component {
  state = {
    isWidthBiggerThanHeight: false,
  };

  resizeImage = (e) => {
    const sizeCheck = e.target.naturalWidth >= e.target.naturalHeight;
    this.setState({ isWidthBiggerThanHeight: sizeCheck });
  };

  render() {
    const { isWidthBiggerThanHeight } = this.state;
    const { product } = this.props;
    return (
      <li key={product.id} className="ProductDetailsCard">
        <figure className="relation-card-thumb">
          <img
            src={product.imageUrl}
            alt=""
            className={isWidthBiggerThanHeight ? "full-height" : "full-width"}
            onLoad={this.resizeImage}
          />
        </figure>
        <div className="relation-card-desc">
          <div className="relation-card-title">{product.name}</div>
          <div className="relation-card-price">
            <span>{product.originalPrice}</span>
            <span>원</span>
          </div>
        </div>
      </li>
    );
  }
}

export default ProductDetailsCard;
