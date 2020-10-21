import React, { Component } from "react";

import ProductDetailsHeader from "./ProductDetailsHeader/ProductDetailsHeader.component";
import "./ProductDetails.styles.scss";

class ProductDetails extends Component {
  render() {
    return (
      <section className="ProductDetails">
        <div className="product-screen">
          <ProductDetailsHeader />
        </div>
      </section>
    );
  }
}

export default ProductDetails;
