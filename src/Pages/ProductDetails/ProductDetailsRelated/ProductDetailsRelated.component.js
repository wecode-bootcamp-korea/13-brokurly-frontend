import React, { Component } from "react";
import ProductDetailsCard from "./ProductDetailsCard/ProductDetailsCard.component";

import "./ProductDetailsRelated.styles.scss";

class ProductDetailsRelated extends Component {
  state = {
    itemsCount: this.props.products.length,
    listXcoordinate: 0,
    isRightButtonVisible: true,
    isLeftButtonVisible: false,
  };

  resizeImage = (e) => {
    const sizeCheck = e.target.naturalWidth >= e.target.naturalHeight;
    this.setState({ isWidthBiggerThanHeight: sizeCheck });
  };

  slideList = (e) => {
    const { itemsCount, listXcoordinate } = this.state;
    const isClickLeft = e.target.className.includes("left");
    const plusMinus = !isClickLeft ? -1 : 1;
    const itemWidth = 190;
    const containerCountLimit = 5;
    const containerWidth = itemWidth * containerCountLimit;
    const divisionCount = itemsCount / containerCountLimit;
    const itemsCountModulo = itemsCount % containerCountLimit;
    const numClickable =
      divisionCount % 1 === 0
        ? divisionCount - 1
        : divisionCount - (divisionCount % 1);
    const xIncrementCount =
      numClickable <= 1 && Math.abs(listXcoordinate) > 0
        ? 1
        : Math.ceil(Math.abs(listXcoordinate) / containerWidth);
    const numRightClickRemaining = numClickable - xIncrementCount;
    const isFinalRightClickConditionReached =
      !isClickLeft && numRightClickRemaining === 1;
    const isFirstLeftClick = isClickLeft && numRightClickRemaining === 0;
    const isFinalLeftClickConditionReached =
      isClickLeft && xIncrementCount === 1;
    const xIncrementPercentage =
      itemsCountModulo === 0 ? 1 : itemsCountModulo / containerCountLimit;
    const xIncrement =
      isFinalRightClickConditionReached || isFirstLeftClick
        ? containerWidth * xIncrementPercentage * plusMinus
        : containerWidth * plusMinus;
    this.setState({
      listXcoordinate: listXcoordinate + xIncrement,
      isRightButtonVisible: isFinalRightClickConditionReached ? false : true,
      isLeftButtonVisible: isFinalLeftClickConditionReached ? false : true,
    });
  };

  render() {
    const itemsTranslation = {
      transform: `translate(${this.state.listXcoordinate}px, 0)`,
      transition: `transform 600ms`,
    };

    const { products } = this.props;
    return (
      <div className="ProductDetailsRelated">
        <div className="relation-title">
          <span></span>
          <span>related product</span>
        </div>
        <div className="relation-cardlist">
          <button
            onClick={this.slideList}
            className="left"
            disabled={!this.state.isLeftButtonVisible}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <div className="relation-card">
            <ul style={itemsTranslation}>
              {products.map((product) => (
                <ProductDetailsCard product={product} key={product.id} />
              ))}
            </ul>
          </div>
          <button
            onClick={this.slideList}
            className="right"
            disabled={!this.state.isRightButtonVisible}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default ProductDetailsRelated;
