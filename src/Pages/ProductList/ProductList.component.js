import React, { Component } from "react";

import "./ProductList.styles.scss";
import ProductCard from "./ProductCard/ProductCard.component";
class ProductList extends Component {
  state = {
    isCategoryClick: false,
    isSortingClick: false,
  };

  handleSorting = () => {
    const { isSortingClick } = this.state;
    this.setState({ isSortingClick: !isSortingClick });
  };

  render() {
    const { isCategoryClick, isSortingClick } = this.state;
    return (
      <section className="ProductList">
        <div className="category-nav">
          <div className="category-title">
            <i className="far fa-carrot"></i>
            <span>채소</span>
          </div>
          <div className="category-list">
            <ul>
              <li>전체보기</li>
              <li>기본채소</li>
              <li>쌈*샐러드</li>
              <li>브로콜리*특수채소</li>
              <li>콩나물*버섯류</li>
              <li>시금치*부추*나물</li>
              <li>양파*마늘*생강*파</li>
              <li>파프리카*피망*고추</li>
            </ul>
            <div
              className={
                isSortingClick ? "sort-trigger active-color" : "sort-trigger"
              }
              onClick={this.handleSorting}
            >
              <span>추천순</span>
              <i className="fas fa-chevron-down"></i>
            </div>
            <div className="sort-list">
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
            <ProductCard />
          </ul>
        </div>
      </section>
    );
  }
}

export default ProductList;
