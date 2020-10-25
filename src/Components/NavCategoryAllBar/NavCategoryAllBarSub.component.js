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
        console.log(specificDataList);
        specificDataList.map((specificData) =>
          this.setState({
            categoryList: [
              ...this.state.categoryList,
              [
                specificData.name,
                specificData.imageUrl,
                specificData.imageActiveUrl,
              ],
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
    const { subCategoryList, categoryList } = this.state;
    this.setState({
      showSubCategoryList: subCategoryList[idx],
    });
    let elementImage = document.querySelectorAll(
      ".all-bar-sub-left-element img"
    );
    elementImage[idx].src = categoryList[idx][2];
  };

  leaveCurrentElement = (idx) => {
    const { categoryList } = this.state;
    let elementImage = document.querySelectorAll(
      ".all-bar-sub-left-element img"
    );
    elementImage[idx].src = categoryList[idx][1];
  };

  render() {
    const { categoryList, showSubCategoryList } = this.state;
    return (
      <div className="NavCategoryAllBarSub">
        {categoryList.map((category, idx) => (
          <div
            className="all-bar-sub-left-element"
            key={idx}
            onMouseEnter={() => this.showRightSubMenu(idx)}
            onMouseLeave={() => this.leaveCurrentElement(idx)}
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
