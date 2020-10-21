import React, { Component } from "react";
// import { Link } from "react-router-dom";

import SpecialProductsSet from "../SpecialProductsSet/SpecialProductsSet.component";

import "./MDRecommend.styles.scss";

class MDRecommend extends Component {
  constructor() {
    super();
    this.state = {
      categoriesList: [],
      selectedCategoryName: "",
      selectedCategoryId: null,
    };
  }

  componentDidMount = () => {
    fetch("http://localhost:3000/Data/MainCategoriesData.json")
      .then((res) => res.json())
      .then((res) => {
        const randomInitialIdx = Math.floor(
          Math.random() * res.categoriesItems.length
        );
        this.setState({
          categoriesList: res.categoriesItems,
          selectedCategoryName: res.categoriesItems[randomInitialIdx].category,
          selectedCategoryId: res.categoriesItems[randomInitialIdx].id,
        });
      })
      .catch((error) => console.log(error.message));
  };

  selectCategory = (categoryName, categoryId) => {
    this.setState({
      selectedCategoryName: categoryName,
      selectedCategoryId: categoryId,
    });
  };

  seeSelectedCategory = () => {
    const { selectedCategoryName } = this.state;
    return selectedCategoryName;
  };

  render() {
    const {
      categoriesList,
      selectedCategoryName,
      selectedCategoryId,
    } = this.state;
    return (
      <div className="MDRecommend">
        <ul className="categories">
          {categoriesList.map((category) => {
            const isCategorySelected =
              category.category === selectedCategoryName;
            return (
              <li
                className={
                  isCategorySelected
                    ? "categories-item selected "
                    : "categories-item"
                }
                key={category.id}
                onClick={() =>
                  this.selectCategory(category.category, category.id)
                }
              >
                <p className="category">{category.category}</p>
              </li>
            );
          })}
        </ul>
        <SpecialProductsSet categoryId={selectedCategoryId} />
        <button className="see-all-of-category-button">
          <p>
            {this.seeSelectedCategory()}
            <span>{" 전체보기"}</span>
          </p>
          <div className="right-angle-icon"></div>
        </button>
      </div>
    );
  }
}

export default MDRecommend;
