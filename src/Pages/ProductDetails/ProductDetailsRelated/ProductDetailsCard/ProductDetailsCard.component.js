import React, { Component } from "react";
import { Link } from "react-router-dom";
import { RESIZE_IMAGE } from "../../../../utils";

import "./ProductDetailsCard.styles.scss";

class ProductDetailsCard extends Component {
  state = {
    isWidthBiggerThanHeight: false,
  };

  render() {
    const { isWidthBiggerThanHeight } = this.state;
    const { product } = this.props;
    return (
      <li key={product.id} className="ProductDetailsCard">
        <Link to={`/productdetails/${product.id}`}>
          <figure className="relation-card-thumb">
            <img
              src={product.imageUrl}
              alt=""
              className={isWidthBiggerThanHeight ? "full-height" : "full-width"}
              onLoad={(e) => RESIZE_IMAGE(e, this)}
            />
          </figure>
          <div className="relation-card-desc">
            <div className="relation-card-title">{product.name}</div>
            <div className="relation-card-price">
              <span>{product.originalPrice}</span>
              <span>원</span>
            </div>
          </div>
        </Link>
      </li>
    );
  }
}

export default ProductDetailsCard;
