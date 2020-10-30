import React, { Component } from "react";
import { Link } from "react-router-dom";

import ProductModal from "./ProductModal/ProductModal.component";
import { RESIZE_IMAGE } from "../../../utils";

import "./ProductCard.styles.scss";

class ProductCard extends Component {
  state = {
    isWidthBiggerThanHeight: false,
    isShoppingBasketClicked: false,
  };

  toggleBaksetModal = (e) => {
    const { isShoppingBasketClicked } = this.state;
    const { blur } = this.props;
    this.setState({
      isShoppingBasketClicked: !isShoppingBasketClicked,
    });
    blur();
  };

  render() {
    const { isWidthBiggerThanHeight, isShoppingBasketClicked } = this.state;
    const { product } = this.props;
    return (
      <>
        <li className="ProductCard">
          <Link to={`/productdetails/${product.id}`}>
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
                className={
                  isWidthBiggerThanHeight ? "full-height" : "full-width"
                }
                onLoad={(e) => RESIZE_IMAGE(e, this)}
              />
            </div>
          </Link>
          <div className="card-shopping">
            <button onClick={this.toggleBaksetModal}>
              <i className="far fa-shopping-cart" />
            </button>
          </div>
          <Link to={`/productdetails/${product.id}`}>
            <div className="card-content">
              <span className="card-title">{product.name}</span>
              <div className="card-price">
                <div
                  className={`${
                    product.discountPrice === product.originalPrice &&
                    "display-none"
                  }`}
                >
                  <span>{product.originalPrice.toLocaleString()}원 </span>
                  <i className="fas fa-long-arrow-alt-right" />
                </div>
                <span>
                  {product.discountPrice
                    ? product.discountPrice.toLocaleString()
                    : product.originalPrice.toLocaleString()}
                  원
                </span>
              </div>
              <span className="card-description">{product.content}</span>
            </div>
          </Link>
        </li>
        <ProductModal
          product={product}
          isShoppingBasketClicked={isShoppingBasketClicked}
          closeModal={() => this.toggleBaksetModal()}
        />
      </>
    );
  }
}

export default ProductCard;
