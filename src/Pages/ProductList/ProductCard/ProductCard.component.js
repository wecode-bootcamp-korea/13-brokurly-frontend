import React from "react";

import "./ProductCard.styles.scss";

const ProductCard = () => {
  return (
    <>
      <li className="ProductCard">
        <div className="card-thumbnail">
          <div className="card-event">
            <span>SAVE</span>
            <div>
              <span>10</span>
              <span>%</span>
            </div>
          </div>
          <img
            src="https://img-cf.kurly.com/shop/data/goods/1567574126435l0.jpg"
            alt=""
          />
          <div className="card-shopping">
            <i className="far fa-shopping-cart"></i>
          </div>
        </div>
        <div className="card-content">
          <span className="card-title">
            [김구원 선생] 무농약 콩나물 200g 헬로 월드
          </span>
          <span className="card-price">1,170원</span>
          <span className="card-description">
            무농약 콩으로 재배한 콩나물(1봉/200g)
          </span>
        </div>
      </li>
      <li className="ProductCard">
        <div className="card-thumbnail">
          <div className="card-event">
            <span>SAVE</span>
            <div>
              <span>10</span>
              <span>%</span>
            </div>
          </div>
          <img
            src="https://img-cf.kurly.com/shop/data/goods/1567574126435l0.jpg"
            alt=""
          />
          <div className="card-shopping">
            <i className="far fa-shopping-cart"></i>
          </div>
        </div>
        <div className="card-content">
          <span className="card-title">fjkdlfsdklfjs</span>
          <span className="card-price">1700 won</span>
          <span className="card-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            blanditiis sit odio alias. Hic provident labore quis dignissimos
            tempore, asperiores necessitatibus iste iure! Amet, esse cumque
            earum eaque dolorum voluptatibus.
          </span>
        </div>
      </li>
    </>
  );
};

export default ProductCard;
