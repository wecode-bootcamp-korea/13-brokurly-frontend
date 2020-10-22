import React, { Component } from "react";

import "./NavCategoryAllBarSub.styles.scss";

import { GET_CATEGORY_API } from "../../config";

class NavCategoryAllBarSub extends Component {
  constructor() {
    super();
    this.state = {
      categoryList: [],
      subCategoryList: [],
      showSubCategoryList: [],
    };
  }

  componentDidMount() {
    fetch(GET_CATEGORY_API)
      .then((res) => res.json())
      .then((data) => data["categories"])
      .then((specificDataList) => {
        specificDataList.map((specificData) =>
          this.setState({
            categoryList: [
              ...this.state.categoryList,
              [specificData.name, specificData.imageUrl],
            ],
            subCategoryList: [
              ...this.state.subCategoryList,
              specificData.sub_categories,
            ],
          })
        );
      })
      .catch((error) => console.log(error.message));
  }

  showRightSubMenu = (idx) => {
    const { subCategoryList } = this.state;
    this.setState({ showSubCategoryList: subCategoryList[idx] });
  };

  render() {
    const { categoryList, showSubCategoryList } = this.state;
    return (
      <div className="Nav-category-all-bar-sub">
        {categoryList.map((category, idx) => (
          <div
            className="all-bar-sub-left-element"
            key={idx}
            onMouseEnter={() => this.showRightSubMenu(idx)}
          >
            <img src={category[1]} alt="category" />
            <span>{category[0]}</span>
          </div>
        ))}
        <div className="all-bar-sub-right">
          {showSubCategoryList.map((showSubCategory, idx) => (
            <div key={idx}>
              <span>{showSubCategory.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default NavCategoryAllBarSub;
