import React, { Component } from "react";
import SpecialProductsSet from "../SpecialProductsSet/SpecialProductsSet.component";
import "./MDRecommend.styles.scss";

class MDRecommend extends Component {
  constructor() {
    super();
    this.state = {
      categoriesList: [],
      selectedCategoryName: "",
      selectedCategoryId: Math.floor(Math.random() * 16),
    };
  }

  componentDidMount = () => {
    fetch("http://localhost:3000/data/main/MainCategoriesData.json")
      .then((res) => res.json())
      .then((res) => {
        const randomInitialIdx = Math.floor(Math.random() * 4);
        this.setState({
          categoriesList: res.categories,
          selectedCategoryName: res.categories[randomInitialIdx].name,
          selectedCategoryId: res.categories[randomInitialIdx].id,
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

  render() {
    const {
      categoriesList,
      selectedCategoryName,
      selectedCategoryId,
    } = this.state;
    const { sectionId } = this.props;
    return (
      <div className="MDRecommend">
        <ul className="categories">
          {categoriesList.map((category) => {
            const isCategorySelected = category.name === selectedCategoryName;
            return (
              <li
                className={
                  isCategorySelected
                    ? "categories-item selected "
                    : "categories-item"
                }
                key={category.id}
                onClick={() => this.selectCategory(category.name, category.id)}
              >
                <p className="category">{category.name}</p>
              </li>
            );
          })}
        </ul>
        <SpecialProductsSet
          sectionId={sectionId}
          categoryId={selectedCategoryId}
          key={selectedCategoryId}
        />
        <button className="see-all-of-category-button">
          <p>
            {selectedCategoryName}
            <span>{" 전체보기"}</span>
          </p>
          <div className="right-angle-icon"></div>
        </button>
      </div>
    );
  }
}

export default MDRecommend;
