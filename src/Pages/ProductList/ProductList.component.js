import React, { Component } from "react";

import "./ProductList.styles.scss";
import ProductCard from "./ProductCard/ProductCard.component";

class ProductList extends Component {
  render() {
    return (
      <section className="ProductList">
        <div className="row">
          <div className="col s12 m4">
            <ProductCard />
          </div>
        </div>
      </section>
    );
  }
}

export default ProductList;
