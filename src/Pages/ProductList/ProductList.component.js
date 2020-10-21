import React, { Component } from "react";

import "./ProductList.styles.scss";
import ProductCard from "./ProductCard/ProductCard.component";

const API = "http://localhost:3000/data/productlist/productlist.json";
// const API = "http://10.58.4.20:8000/category?main=1";

class ProductList extends Component {
  state = {
    isCategoryClick: false,
    isSortingClick: false,
    categories: "",
    products: "",
  };

  handleSorting = () => {
    const { isSortingClick } = this.state;
    this.setState({
      isSortingClick: !isSortingClick,
    });
  };

  componentDidMount = async () => {
    const response = await fetch(API);
    // custom error handler
    if (response.status !== 200) {
      throw new Error("cannot fetch the data");
    }
    const data = await response.json();
    this.setState({ categories: data.categories, products: data.products });
  };

  render() {
    const { isSortingClick, categories, products } = this.state;
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
              <span>추천순</span>
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
                <li>추천순</li>
                <li>신상품순</li>
                <li>인기상품순</li>
                <li>낮은 가격순</li>
                <li>높은 가격순</li>
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
