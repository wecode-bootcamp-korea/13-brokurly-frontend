import React, { Component } from "react";

import "./ProductList.styles.scss";
import ProductCard from "./ProductCard/ProductCard.component";
import { PRODUCT_VEGE_LIST } from "../../config";

class ProductList extends Component {
  state = {
    isSortingClick: false,
    activeSorting: 0,
    activeCategory: 0,
  };

  handleCategory = async (e) => {
    let response;
    try {
      const { id } = e.target;
      const { activeSorting } = this.state;
      +id !== 0
        ? (response = await fetch(
            `${PRODUCT_VEGE_LIST}&sub=${id}&ordering=${activeSorting}`
          ))
        : (response = await fetch(
            `${PRODUCT_VEGE_LIST}&sub=1&ordering=${activeSorting}`
          ));
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
    try {
      const { id } = e.target;
      const { activeCategory } = this.state;
      const response = await fetch(
        !!+activeCategory
          ? `${PRODUCT_VEGE_LIST}&sub=${activeCategory}&ordering=${id}`
          : `${PRODUCT_VEGE_LIST}&sub=1&ordering=${id}`
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

  getProductList = async () => {
    try {
      const response = await fetch(`${PRODUCT_VEGE_LIST}&ordering=0`);
      if (response.status !== 200) {
        throw new Error("cannot fetch the data");
      }
      const {
        products,
        mainCategories,
        subCategories,
        sortings,
      } = await response.json();
      // whole list
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
    this.getProductList();
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
    } = this.state;

    return (
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
