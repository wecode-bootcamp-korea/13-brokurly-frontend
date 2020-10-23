import React, { Component } from "react";
// import { NavLink } from "react-router-dom";

import "./ProductList.styles.scss";
import ProductCard from "./ProductCard/ProductCard.component";

// Mock data
// const API = "http://localhost:3000/data/productlist/productlist_0.json";
// Backend API
const API = "http://10.58.4.20:8000/product?check=1&main=1&sub=1&sort_type=0";

class ProductList extends Component {
  state = {
    // isCategoryClick: true,
    isSortingClick: false,
    activeSorting: 0,
    activeCategory: 0,
  };

  handleCategory = async (e) => {
    let response;
    try {
      const { id } = e.target;
      const { activeSorting, isCategoryClick } = this.state;
      +id !== 0
        ? (response = await fetch(
            `http://10.58.4.20:8000/product?check=0&main=1&sub=${id}&sort_type=${activeSorting}`
          ))
        : (response = await fetch(
            `http://10.58.4.20:8000/product?check=1&main=1&sub=1&sort_type=${activeSorting}`
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
    let response;
    try {
      const { id } = e.target;
      console.log(id);
      const { activeCategory, isCategoryClick } = this.state;
      //local test
      // const response = await fetch(
      //   `http://localhost:3000/data/productlist/productlist_${id}.json`
      // );
      //backend API
      +activeCategory !== 0
        ? (response = await fetch(
            `http://10.58.4.20:8000/product?check=0&main=1&sub=${activeCategory}&sort_type=${id}`
          ))
        : (response = await fetch(
            `http://10.58.4.20:8000/product?check=1&main=1&sub=1&sort_type=${id}`
          ));
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
      const {
        products,
        mainCategories,
        subCategories,
        sortings,
      } = await response.json();
      // whole list
      subCategories.unshift("전체보기");
      this.setState({ products, mainCategories, subCategories, sortings });
    } catch (err) {
      console.log("!!error alert!!");
    }
  };

  componentDidMount = () => {
    this.getProductList();
  };

  render() {
    const {
      // isCategoryClick,
      isSortingClick,
      products,
      mainCategories,
      subCategories,
      sortings,
      activeSorting,
      // activeCategory,
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
                subCategories.map((subCategory, id) => (
                  <li key={id} id={id} onClick={this.handleCategory}>
                    {subCategory}
                  </li>
                ))}
            </ul>
            <div
              className={`sort-trigger ${isSortingClick && "active-color"}`}
              onClick={this.handleSorting}
            >
              <span>{sortings && sortings[activeSorting]}</span>
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
                  sortings.map((sortName, sortId) => (
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
