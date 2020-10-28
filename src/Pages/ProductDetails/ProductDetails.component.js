import React, { Component } from "react";

import ProductDetailsHeader from "./ProductDetailsHeader/ProductDetailsHeader.component";
import ProductDetailsRelated from "./ProductDetailsRelated/ProductDetailsRelated.component";
import ProductDetailsReview from "./ProductDetailsReview/ProductDetailsReview.component";
import ProductDetailsMain from "./ProductDetailsMain/ProductDetailsMain.component";
import ProductDetailsRequest from "./ProductDetailsRequest/ProductDetailsRequest.component";

import "./ProductDetails.styles.scss";

class ProductDetails extends Component {
  state = {
    activeMenu: 0,
  };

  activeMenu = (e) => {
    const { id } = e.target;
    this.setState({
      activeMenu: id,
    });
  };

  getBoardCnt = async () => {
    const OFFSET = 0;
    const LIMIT = 10;
    const request = await fetch(
      `http://10.58.6.216:8000/user/product/5/reviews?offset=${OFFSET}&limit=${LIMIT}`,
      { method: "GET" }
    );
    const { total_count } = await request.json();

    this.setState({
      totalReviewCount: total_count,
    });
  };

  getProductDetails = async (postId) => {
    try {
      //backend API
      const productDetails = await fetch(
        `http://10.58.4.20:8000/products/${postId}`
      );
      const relatedProducts = await fetch(
        `http://10.58.4.20:8000/products/${postId}/related-products`
      );
      if (productDetails.status !== 200) {
        throw new Error("cannot fetch the data");
      }
      const { product_detail } = await productDetails.json();
      const { related_products } = await relatedProducts.json();
      // console.log(realted_products);
      this.setState({
        productDetail: product_detail,
        relatedProducts: related_products,
      });
    } catch (err) {
      console.log("!!error alert!!");
    }
  };

  componentDidMount = () => {
    let id = this.props.match.params.id;
    this.getProductDetails(id);
    this.getBoardCnt();
  };

  componentDidUpdate(prevProps) {
    const { id } = this.props.match.params;
    if (this.props.location !== prevProps.location) {
      this.getProductDetails(id);
    }
  }

  render() {
    const {
      productDetail,
      activeMenu,
      relatedProducts,
      totalReviewCount,
    } = this.state;
    const detailMenus = {
      0: <ProductDetailsMain productDetail={productDetail} />,
      1: (
        <ProductDetailsReview
          totalReviews={this.getBoardCnt}
          productDetail={productDetail}
        />
      ),
      2: (
        <ProductDetailsRequest
          productDetail={productDetail}
          totalReviews={this.getBoardCnt}
        />
      ),
    };
    return (
      <section className="ProductDetails">
        <div className="product-screen">
          {productDetail && (
            <ProductDetailsHeader productDetail={productDetail} />
          )}
          {relatedProducts && (
            <ProductDetailsRelated products={relatedProducts} />
          )}

          <article className="product-main">
            <ul className="product-categories">
              <li
                id="0"
                className={+activeMenu === 0 ? "categories-actived" : ""}
                onClick={this.activeMenu}
              >
                상품설명
              </li>
              <li
                id="1"
                className={+activeMenu === 1 ? "categories-actived" : ""}
                onClick={this.activeMenu}
              >
                고객후기 ({totalReviewCount})
              </li>
              <li
                id="2"
                className={+activeMenu === 2 ? "categories-actived" : ""}
                onClick={this.activeMenu}
              >
                상품문의 ({totalReviewCount})
              </li>
            </ul>
            {detailMenus[activeMenu]}
            <div className="product-qna"></div>
          </article>
        </div>
      </section>
    );
  }
}

export default ProductDetails;
