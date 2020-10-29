import React, { Component } from "react";

import ProductDetailsHeader from "./ProductDetailsHeader/ProductDetailsHeader.component";
import ProductDetailsRelated from "./ProductDetailsRelated/ProductDetailsRelated.component";
import ProductDetailsReview from "./ProductDetailsReview/ProductDetailsReview.component";
import ProductDetailsMain from "./ProductDetailsMain/ProductDetailsMain.component";
import ProductDetailsRequest from "./ProductDetailsRequest/ProductDetailsRequest.component";
import { PRODUCT_REVIEW_LIST, PRODUCT_ITEM } from "../../config";

import "./ProductDetails.styles.scss";

class ProductDetails extends Component {
  state = {
    activeMenu: 0,
    isLoading: true,
  };

  activeMenu = (e) => {
    const id = e?.target.dataset.idx;
    console.log(id);
    this.setState({
      activeMenu: id,
    });
  };

  getBoardCnt = async () => {
    // const { id } = this.props.match.params;
    const id = this.state.reviewId;
    const OFFSET = 0;
    const LIMIT = 10;
    const request = await fetch(
      `${PRODUCT_REVIEW_LIST}/${id}/reviews?offset=${OFFSET}&limit=${LIMIT}`,
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
      const productDetails = await fetch(`${PRODUCT_ITEM}/${postId}`);
      const relatedProducts = await fetch(
        `${PRODUCT_ITEM}/${postId}/related-products`
      );
      if (productDetails.status !== 200) {
        throw new Error("cannot fetch the data");
      }
      const { product_detail } = await productDetails.json();
      const { related_products } = await relatedProducts.json();
      // console.log(realted_products);
      await this.setState({
        isLoading: true,
        reviewId: postId,
        productDetail: product_detail,
        relatedProducts: related_products,
      });
      setTimeout(() => {
        this.setState({
          isLoading: false,
        });
      }, 2000);
    } catch (err) {
      console.log("!!error alert!!");
    }
  };

  componentDidMount = () => {
    let id = this.props.match.params.id;
    this.getProductDetails(id);
    this.getBoardCnt();
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 2000);
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
      isLoading,
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
    return isLoading ? (
      <section className="loading">
        <div>
          <svg
            className="spinner"
            width="65px"
            height="65px"
            viewBox="0 0 66 66"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="path"
              fill="none"
              stroke-width="6"
              stroke-linecap="round"
              cx="33"
              cy="33"
              r="30"
            ></circle>
          </svg>
        </div>
      </section>
    ) : (
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
                data-idx="0"
                className={+activeMenu === 0 ? "categories-actived" : ""}
                onClick={this.activeMenu}
              >
                상품설명
              </li>
              <li
                data-idx="1"
                className={+activeMenu === 1 ? "categories-actived" : ""}
                onClick={this.activeMenu}
              >
                고객후기 ({totalReviewCount})
              </li>
              <li
                data-idx="2"
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
