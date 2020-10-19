import React, { Component } from "react";

import "./SpecialProductsSet.styles.scss";
import SpecialProductsItem from "./SpecialProductItem/SpecialProductsItem.component";

class SpecialProductsSet extends Component {
  constructor() {
    super();
    this.state = {
      specialProductsList: [],
      productsItemWidth: 260,
      productsItemsCount: 0,
      productsSetItemsXCoordinate: 0,
      isLeftButtonClicked: true,
      isRightButtonClicked: false,
    };
  }

  componentDidMount = () => {
    fetch("http://localhost:3000/Data/MainSpecialProductsData.json")
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          specialProductsList: res.specialProductsItems,
          productsItemsCount: res.specialProductsItems.length,
        });
      })
      .catch((error) => console.log(error.message));
  };

  slideLeft = () => {
    const {
      productsItemWidth,
      productsItemsCount,
      productsSetItemsXCoordinate,
    } = this.state;
    const xIncrement = (productsItemsCount - 4) * productsItemWidth * -1;
    this.setState({
      productsSetItemsXCoordinate: productsSetItemsXCoordinate + xIncrement,
      isRightButtonClicked: true,
      isLeftButtonClicked: false,
    });
  };

  slideRight = () => {
    const {
      productsItemWidth,
      productsItemsCount,
      productsSetItemsXCoordinate,
    } = this.state;
    const xIncrement = (productsItemsCount - 4) * productsItemWidth;
    this.setState({
      productsSetItemsXCoordinate: productsSetItemsXCoordinate + xIncrement,
      isRightButtonClicked: false,
      isLeftButtonClicked: true,
    });
  };

  render() {
    const {
      specialProductsList,
      productsSetItemsXCoordinate,
      isLeftButtonClicked,
      isRightButtonClicked,
    } = this.state;
    let productsSetItemsTranslateStyle = {
      transform: `translate(${productsSetItemsXCoordinate}px, 0)`,
      transition: `transform 600ms`,
    };
    return (
      <div className="SpecialProductsSet">
        <div
          className={
            isLeftButtonClicked ? "button-arrow left hide" : "button-arrow left"
          }
          onClick={this.slideRight}
        >
          <img
            className="button-arrow-img left"
            src="./Images/Main/SpecialProductsSet/button_left_arrow.png"
            alt="left button"
          />
        </div>
        <div
          className={
            isRightButtonClicked
              ? "button-arrow right hide"
              : "button-arrow right"
          }
          onClick={this.slideLeft}
        >
          <img
            className="button-arrow-img right"
            src="./Images/Main/SpecialProductsSet/button_right_arrow.png"
            alt="right button"
          />
        </div>
        <div className="special-products-set-container">
          <ul
            className="special-products-set-items"
            style={productsSetItemsTranslateStyle}
          >
            {!specialProductsList
              ? ""
              : specialProductsList.map((item) => {
                  return (
                    <SpecialProductsItem
                      id={item.id}
                      isOnSale={item.isOnSale}
                      saleType={item.saleType}
                      saleAmount={item.saleAmount}
                      mainImage={item.mainImage}
                      hasBrandName={item.hasBrandName}
                      brandName={item.brandName}
                      productName={item.productName}
                      price={item.price}
                      hasOriginalPrice={item.hasOriginalPrice}
                      originalPrice={item.originalPrice}
                    />
                  );
                })}
          </ul>
        </div>
      </div>
    );
  }
}

export default SpecialProductsSet;
