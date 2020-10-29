import React, { Component } from "react";
import { RESIZE_IMAGE } from "../../../utils";

import carrots from "../../../Images/ProductDetails/carrots.svg";
import pepper from "../../../Images/ProductDetails/pepper.svg";

import "./ProductDetailsMain.styles.scss";

class ProductDetailsMain extends Component {
  state = {
    isWidthBiggerThanHeight: false,
  };

  render() {
    const { isWidthBiggerThanHeight } = this.state;
    const { productDetail } = this.props;
    return (
      <main className="ProductDetailsMain">
        <figure>
          <img
            src={productDetail?.imageUrl}
            className={isWidthBiggerThanHeight ? "" : "main-vertical-align"}
            onLoad={(e) => RESIZE_IMAGE(e, this)}
            alt="product_main_image"
          />
        </figure>
        <div className="product-info">
          <h1 className="product-info-title">
            <span>무농약 콩으로 기른 장인의 나물</span>
            <span>{productDetail?.name}</span>
          </h1>
          <p>
            동산에는 뜨거운지라, 석가는 따뜻한 생생하며, 평화스러운 착목한는
            구하지 피부가 것이다. 장식하는 그들의 이것은 심장의 아니다. 그들의
            얼마나 황금시대를 보이는 노래하며 그리하였는가? 보는 거친 싶이
            교향악이다. 거선의 행복스럽고 이것은 위하여서. 보이는 청춘의 거선의
            그와 창공에 위하여 많이 길지 이상은 그리하였는가? 보내는 그들은 이상
            창공에 있음으로써 얼마나 있다. 이상의 꽃이 그와 주며, 아름답고 갑
            들어 용감하고 아름다우냐? 얼마나 그것을 원질이 있는가?
          </p>
          <div className="product-checkpoint">
            <h3>
              <span></span>
              <span>Kurly's Check Point</span>
            </h3>
            <div className="checkpoint-info">
              <div>
                <div className="check-title">
                  <img src={carrots} alt="" />
                  <span>재료와 성분</span>
                  <span>Ingredients</span>
                </div>
                <ul>
                  <li>국내산 콩 100%</li>
                  <li>아스파라긴산 성분 함유</li>
                </ul>
              </div>
              <div>
                <div className="check-title">
                  <img src={pepper} alt="" />
                  <span>활용법</span>
                  <span>Recommendation</span>
                </div>
                <ul>
                  <li>콩나물 무침, 국 등 일상 요리 필수 재료</li>
                  <li>콩나물 밥, 콩나물 불고기 등에 활용</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default ProductDetailsMain;
