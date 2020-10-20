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

  emphasizeImage = (e) => {
    // hover effect 처리하기
    // console.log(e.target.naturalWidth);
    // console.log(e.target.naturalHeight);
  };

  render() {
    // console.log(this.state);
    const { product, isWidthBiggerThanHeight } = this.state;
    // console.log(product);
    return (
      <li className="ProductCard">
        <div className="card-thumbnail">
          <div className="card-event">
            <span>SAVE</span>
            <div>
              <span>10</span>
              <span>%</span>
            </div>
          </div>
          <img
            src={product.image_url}
            alt={product.id}
            className={isWidthBiggerThanHeight ? "full-height" : "full-width"}
            onLoad={this.resizeImage}
            onMouseEnter={this.emphasizeImage}
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
