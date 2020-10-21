import React, { Component } from "react";

import "./SpecialProductsSet.styles.scss";
import SpecialProductsItem from "./SpecialProductItem/SpecialProductsItem.component";

class SpecialProductsSet extends Component {
  constructor() {
    super();
    // this.state = {
    //   specialProductsList: [],
    //   productsItemWidth: 260,
    //   productsItemsCount: 0,
    //   productsItemsCountRemainder: 0,
    //   listXcoordinate: 0,
    //   isLeftButtonClicked: true,
    //   isRightButtonClicked: false,
    // };
    this.state = {
      itemsList: [],
      itemsCount: 0,
      listXcoordinate: 0,
      isLeftButtonVisible: false,
      isRightButtonVisible: true,
    };
  }

  componentDidMount = () => {
    fetch("http://localhost:3000/Data/MainSpecialProductsData.json")
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          itemsList: res.specialProductsItems,
          itemsCount: res.specialProductsItems.length,
        });
      })
      .catch((error) => console.log(error.message));
  };

  // slideLeft = () => {
  //   const {
  //     productsItemWidth,
  //     productsItemsCount,
  //     listXcoordinate,
  //   } = this.state;
  //   const xIncrement = (productsItemsCount - 4) * productsItemWidth * -1;
  //   this.setState({
  //     listXcoordinate: listXcoordinate + xIncrement,
  //     isRightButtonClicked: true,
  //     isLeftButtonClicked: false,
  //   });
  // };

  // slideRight = () => {
  //   const {
  //     productsItemWidth,
  //     productsItemsCount,
  //     listXcoordinate,
  //   } = this.state;
  //   const xIncrement = (productsItemsCount - 4) * productsItemWidth;
  //   this.setState({
  //     listXcoordinate: listXcoordinate + xIncrement,
  //     isRightButtonClicked: false,
  //     isLeftButtonClicked: true,
  //   });
  // };

  slideList = (e) => {
    const { itemsCount, listXcoordinate } = this.state;
    const plusMinus = e.target.className.includes("right") ? -1 : 1;
    const itemWidth = 260;
    const containerCountLimit = 4;
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
        : Math.abs(listXcoordinate / containerWidth);
    const numRightClickRemaining = numClickable - xIncrementCount;
    const isFinalRightClickConditionReached = numRightClickRemaining === 1;
    const isFirstLeftClick = numRightClickRemaining === 0;
    const isFinalLeftClickConditionReached = xIncrementCount === 1;
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
    const {
      itemsList,
      listXcoordinate,
      isLeftButtonVisible,
      isRightButtonVisible,
    } = this.state;
    const { categoryId } = this.props;
    let itemsTranslation = {
      transform: `translate(${listXcoordinate}px, 0)`,
      transition: `transform 600ms`,
    };
    return (
      <div className="SpecialProductsSet">
        <div
          className={
            isLeftButtonVisible ? "button-arrow left" : "button-arrow left hide"
          }
          onClick={this.slideList}
        >
          <img
            className="button-arrow-img left"
            src="./Images/Main/SpecialProductsSet/button_left_arrow.png"
            alt="left button"
          />
        </div>
        <div
          className={
            isRightButtonVisible
              ? "button-arrow right"
              : "button-arrow right hide"
          }
          onClick={this.slideList}
        >
          <img
            className="button-arrow-img right"
            src="./Images/Main/SpecialProductsSet/button_right_arrow.png"
            alt="right button"
          />
        </div>
        <div className="special-products-set-container">
          <ul className="special-products-set-items" style={itemsTranslation}>
            {!itemsList
              ? ""
              : itemsList.map((item) => {
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
