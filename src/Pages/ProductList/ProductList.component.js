import React, { Component } from "react";

import "./ProductList.styles.scss";
import ProductCard from "./ProductCard/ProductCard.component";

const API = "http://localhost:3000/data/productlist/productlist_0.json";
// const API = "http://10.58.4.20:8000/product?productList=1&sort_type=0"; //Backend API

class ProductList extends Component {
  state = {
    isCategoryClick: false,
    isSortingClick: false,
    categories: [],
    products: [],
    sortings: [],
    activeSorting: 0,
  };

  handleSorting = () => {
    const { isSortingClick } = this.state;
    this.setState({
      isSortingClick: !isSortingClick,
    });
  };

  sortingList = async (e) => {
    const { id } = e.target;
    // this is for local test
    const response = await fetch(
      `http://localhost:3000/data/productlist/productlist_${id}.json`
    );
    //this is for backend
    // const response = await fetch(
    //   `http://10.58.4.20:8000/product?productList=1&sort_type=${id}`
    // );

    const data = await response.json();
    this.setState({
      products: data.products,
      activeSorting: id,
    });
  };

  componentDidMount = async () => {
    const response = await fetch(API);
    // custom error handler
    if (response.status !== 200) {
      throw new Error("cannot fetch the data");
    }
    const data = await response.json();
    this.setState({
      categories: data.categories,
      products: data.products,
      sortings: data.available_sort,
    });
  };

  render() {
    const {
      isSortingClick,
      categories,
      products,
      sortings,
      activeSorting,
    } = this.state;

    return (
      <section className="ProductList">
        <div className="category-nav">
          <div className="category-title">
            <i className="far fa-carrot"></i>
            <span>채소</span>
          </div>
          <div className="category-list">
            <ul>
              {categories.length &&
                categories.map((category) => (
                  <li key={category.id}>{category.name}</li>
                ))}
            </ul>
            <div
              className={
                isSortingClick ? "sort-trigger active-color" : "sort-trigger"
              }
              onClick={this.handleSorting}
            >
              <span>{sortings[activeSorting]}</span>
              <i
                className={
                  isSortingClick ? "fas fa-chevron-up" : "fas fa-chevron-down"
                }
              ></i>
            </div>
            <div
              className={
                isSortingClick ? "sort-list" : "sort-list display-none"
              }
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
