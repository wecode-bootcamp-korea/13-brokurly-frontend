import React, { Component } from "react";

import ProductCard from "./ProductCard/ProductCard.component";
import { menusToAPI } from "../../categories";
import { PRODUCT_LIST } from "../../config";
import "./ProductList.styles.scss";

class ProductList extends Component {
  state = {
    isSortingClick: false,
    activeSorting: 0,
    activeCategory: 0,
    isLoading: true,
  };

  handleCategory = async (e) => {
    const { name } = this.props.match.params;
    try {
      const { id } = e.target;
      const { activeSorting } = this.state;
      const response = await fetch(
        !!+id
          ? `${PRODUCT_LIST}?main=${menusToAPI[name]}&sub=${id}&ordering=${activeSorting}`
          : `${PRODUCT_LIST}?main=${menusToAPI[name]}&sub=1&ordering=${activeSorting}`
      );
      if (response.state === 200) {
        throw new Error("cannot fetch the data");
      }
      const { products } = await response.json();
      this.setState({ products, activeCategory: id });
    } catch (err) {
      console.log("!! error alert !!");
    }
  };

  handleSorting = () => {
    const { isSortingClick } = this.state;
    this.setState({
      isSortingClick: !isSortingClick,
    });
  };

  sortingList = async (e) => {
    const { name } = this.props.match.params;
    try {
      const { id } = e.target;
      const { activeCategory } = this.state;
      const response = await fetch(
        !!+activeCategory
          ? `${PRODUCT_LIST}?main=${menusToAPI[name]}&sub=${activeCategory}&ordering=${id}`
          : `${PRODUCT_LIST}?main=${menusToAPI[name]}&sub=1&ordering=${id}`
      );
      if (response.status !== 200) {
        throw new Error("cannot fetch the data");
      }
      const { products } = await response.json();
      this.setState({ products, activeSorting: id });
    } catch (err) {
      console.log("!!error alert!!");
    }
  };

  getProductList = async (majorCategory) => {
    try {
      const response = await fetch(
        `${PRODUCT_LIST}?main=${majorCategory}&ordering=0`
      );
      if (response.status !== 200) {
        throw new Error("cannot fetch the data");
      }
      const {
        products,
        mainCategories,
        subCategories,
        sortings,
      } = await response.json();
      // add whole items menu
      subCategories.unshift({ id: 0, name: "전체보기" });
      this.setState({
        products,
        mainCategories,
        subCategories,
        sortings,
      });
    } catch (err) {
      console.log("!!error alert!!");
    }
  };

  componentDidMount = () => {
    const { name } = this.props.match.params;
    this.getProductList(menusToAPI[name]);
    this.setState({ isLoading: false });
  };

  render() {
    const {
      isSortingClick,
      products,
      mainCategories,
      subCategories,
      sortings,
      activeSorting,
      activeCategory,
      isLoading,
    } = this.state;

    return isLoading ? (
      <section className="ProductList loading"></section>
    ) : (
      <section className="ProductList">
        <div className="category-nav">
          {mainCategories && (
            <div className="category-title">
              <img src={mainCategories.imageUrl} alt="" />
              <span>{mainCategories.name}</span>
            </div>
          )}
          <div className="category-list">
            <ul>
              {subCategories &&
                subCategories.map((subCategory) => (
                  <li
                    key={subCategory.id}
                    id={subCategory.id}
                    className={
                      +activeCategory === subCategory.id
                        ? "active-category"
                        : ""
                    }
                    onClick={this.handleCategory}
                  >
                    {subCategory.name}
                  </li>
                ))}
            </ul>
            <div
              className={`sort-trigger ${isSortingClick && "active-color"}`}
              onClick={this.handleSorting}
            >
              <span>{sortings && sortings[activeSorting].name}</span>
              <i
                className={`fas fa-chevron-${isSortingClick ? "up" : "down"}`}
              ></i>
            </div>
            <div
              className={`sort-list ${!isSortingClick && "display-none"}`}
              onClick={this.handleSorting}
            >
              <ul>
                {sortings &&
                  sortings.map((sorting) => (
                    <li
                      key={sorting.id}
                      id={sorting.id}
                      onClick={this.sortingList}
                    >
                      {sorting.name}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="card-list">
          <ul>
            {products &&
              products.map((product) => {
                return <ProductCard product={product} key={product.id} />;
              })}
          </ul>
        </div>
      </section>
    );
  }
}

export default ProductList;
