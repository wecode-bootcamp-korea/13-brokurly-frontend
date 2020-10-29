import React, { Component } from "react";

import ProductDetailsHeader from "./ProductDetailsHeader/ProductDetailsHeader.component";
import ProductDetailsRelated from "./ProductDetailsRelated/ProductDetailsRelated.component";
import ProductDetailsReview from "./ProductDetailsReview/ProductDetailsReview.component";
import ProductDetailsMain from "./ProductDetailsMain/ProductDetailsMain.component";
import ProductDetailsRequest from "./ProductDetailsRequest/ProductDetailsRequest.component";
import { PRODUCT_REVIEW_LIST, PRODUCT_ITEM } from "../../config";

import { connect } from "react-redux";
import { push } from "../../redux/recentlySeen/recentlySeen.actions";

import "./ProductDetails.styles.scss";

class ProductDetails extends Component {
  state = {
    activeMenu: 0,
  };

  activeMenu = (e) => {
    const id = e?.target.dataset.idx;
    console.log(id);
    this.setState({
      activeMenu: id,
    });
  };

  getBoardCnt = async () => {
    const OFFSET = 0;
    const LIMIT = 10;
    const request = await fetch(
      `${PRODUCT_REVIEW_LIST}/5/reviews?offset=${OFFSET}&limit=${LIMIT}`,
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
      this.setState({
        productDetail: product_detail,
        relatedProducts: related_products,
      });
    } catch (err) {
      console.log("!!error alert!!");
    }
  };

  componentDidMount = async () => {
    let id = this.props.match.params.id;
    const { pushToList } = this.props;
    await this.getProductDetails(id);
    const { productDetail } = this.state;
    console.log(productDetail);
    pushToList({ id: productDetail.id, imageUrl: productDetail.imageUrl });

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

// export default ProductDetails;

const mapStateToProps = ({ recentlySeen }) => ({
  recentlySeenList: recentlySeen.recentlySeenList,
});

const mapDispatchToProps = (dispatch) => ({
  pushToList: (item) => dispatch(push(item)),
  // popFromList: () => dispatch(pop()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
