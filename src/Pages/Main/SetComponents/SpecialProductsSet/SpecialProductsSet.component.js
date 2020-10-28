import React, { Component } from "react";
import SpecialProductsItem from "./SpecialProductItem/SpecialProductsItem.component";
import "./SpecialProductsSet.styles.scss";

class SpecialProductsSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsList: [],
      itemsCount: 0,
      listXcoordinate: 0,
      isLeftButtonVisible: false,
      isRightButtonVisible: true,
    };
  }

  componentDidMount = () => {
    const { sectionId } = this.props;
    fetch(this.getAPI())
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "SUCCESS") {
          this.setState({
            itemsList:
              sectionId === 1000
                ? res.products
                : res.section_list[sectionId]["products"],
            itemsCount:
              sectionId === 1000
                ? res.products.length
                : res.section_list[sectionId]["products"].length,
          });
        } else {
          console.log("error");
        }
      });
  };

  getAPIData = async () => {
    const { sectionId, categoryId } = this.props;
    const section = sectionId === 1000 ? "md" : "products";
    const sectionTable = {
      md: {
        api: `http://10.58.4.20:8000/products/home/md-choice?category=${categoryId}`,
        dataKey: "products",
      },
      products: {
        api: "http://10.58.4.20:8000/products/home/section",
        dataKey: "section_list",
      },
    };
    try {
      const res = await fetch(sectionTable[section]["api"]);
      const data = await res.json();
      this.setState({
        itemsList: data[sectionTable[section]["dataKey"]],
      });
    } catch (error) {
      console.log(error);
    }
  };

  getAPI = () => {
    const { sectionId, categoryId } = this.props;
    if (sectionId === 1000) {
      return `http://10.58.4.20:8000/products/home/md-choice?category=${categoryId}`;
    } else {
      return "http://10.58.4.20:8000/products/home/section";
    }
  };

  slideList = (e) => {
    const { itemsCount, listXcoordinate } = this.state;
    const isClickLeft = e.target.className.includes("left");
    const plusMinus = !isClickLeft ? -1 : 1;
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
      isRightButtonVisible: !isFinalRightClickConditionReached,
      isLeftButtonVisible: !isFinalLeftClickConditionReached,
    });
  };

  render() {
    const {
      itemsList,
      listXcoordinate,
      isLeftButtonVisible,
      isRightButtonVisible,
    } = this.state;
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
            {!itemsList.length
              ? ""
              : itemsList.map((item) => {
                  return (
                    <SpecialProductsItem
                      id={item.id}
                      name={item.name}
                      imageUrl={item.imageUrl}
                      discountPercent={item.discountPercent}
                      discountName={item.discountName}
                      discountContent={item.discountContent}
                      discountPrice={item.discountPrice}
                      originalPrice={item.originalPrice}
                      key={item.id}
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
