import React, { Component } from "react";

import "./ProductList.styles.scss";
import ProductCard from "./ProductCard/ProductCard.component";

// Mock data
const API = "http://localhost:3000/data/productlist/productlist_0.json";
// Backend API
// const API = "http://10.58.4.20:8000/product?productList=1&sort_type=0";

class ProductList extends Component {
  state = {
    isCategoryClick: true,
    isSortingClick: false,
    categories: [],
    products: [],
    sortings: [],
    activeSorting: 0,
    activeCategory: 0,
  };

  handleCategory = (e) => {
    const { id } = e.target;
    const { isCategoryClick } = this.state;
    console.log(id);
    this.setState({ isCategoryClick: !isCategoryClick, activeCategory: id });
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
      //local test
      const response = await fetch(
        `http://localhost:3000/data/productlist/productlist_${id}.json`
      );
      //backend API
      // const response = await fetch(
      //   `http://10.58.4.20:8000/product?productList=1&sort_type=${id}`
      // );
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
      const response = await fetch(API);
      if (response.status !== 200) {
        throw new Error("cannot fetch the data");
      }
      const { categories, products, available_sort } = await response.json();
      this.setState({ categories, products, sortings: available_sort });
    } catch (err) {
      console.log("!!error alert!!");
    }
  };

  componentDidMount = () => {
    this.getProductList();
  };

  render() {
    const {
      isCategoryClick,
      isSortingClick,
      categories,
      products,
      sortings,
      activeSorting,
      activeCategory,
    } = this.state;

    return (
      <section className="ProductList">
        <div className="category-nav">
          <div className="category-title">
            <i className="far fa-carrot" />
            <span>채소</span>
          </div>
          <div className="category-list">
            <ul>
              {categories.length &&
                categories.map(({ id, name }) => (
                  <li
                    key={id}
                    id={id}
                    onClick={this.handleCategory}
                    className={`${
                      isCategoryClick & (id === activeCategory)
                        ? "active-category"
                        : ""
                    }`}
                  >
                    {name}
                  </li>
                ))}
            </ul>
            <div
              className={`sort-trigger ${isSortingClick && "active-color"}`}
              onClick={this.handleSorting}
            >
              <span>{sortings[activeSorting]}</span>
              <i
                className={`fas fa-chevron-${isSortingClick ? "up" : "down"}`}
              ></i>
            </div>
            <div
              className={`sort-list ${!isSortingClick && "display-none"}`}
              onClick={this.handleSorting}
            >
              <ul>
                {sortings.map((sortName, sortId) => (
                  <li key={sortId} id={sortId} onClick={this.sortingList}>
                    {sortName}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="card-list">
          <ul>
            {products.length &&
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
