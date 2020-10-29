import React, { Component } from "react";
import { withRouter } from "react-router-dom";
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
    this.getCategoryList();
  }
  getCategoryList = async () => {
    try {
      await fetch(GET_CATEGORY_API)
        .then((res) => res.json())
        .then((data) => data.categories)
        .then((specificDataList) => {
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
        });
    } catch (error) {
      console.log(error);
    }
  };
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
  render() {
    const { categoryList, showSubCategoryList } = this.state;
    return (
      <div className="NavCategoryAllBarSub">
        {categoryList.map((category, idx) => (
          <div
            className="all-bar-sub-left-element"
            key={idx}
            onMouseEnter={() => this.showRightSubMenu(idx)}
            onClick={() => this.props.history.push("/productList/vegetables")}
          >
            <img src={category[2]} alt="category" />
            <span>{category[0]}</span>
          </div>
        ))}
        <div className="all-bar-sub-right">
          {showSubCategoryList.map(({ name }, idx) => (
            <div key={idx}>
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default withRouter(NavCategoryAllBarSub);
