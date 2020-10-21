import React from "react";

import "./ProductDetailsHeader.styles.scss";

const ProductDetailsHeader = () => {
  return (
    <div className="ProductDetailsHeader">
      <figure className="product-image">
        <img
          src="https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1875&q=80"
          alt=""
        />
      </figure>
      <div className="orderinfo">
        <div className="order-header">
          <div>
            <span>무농약 콩나물 200g</span>
            <span>무농약 콩으로 재배한 콩나불(1봉/200g)</span>
          </div>
          <button>
            <i className="far fa-share-alt"></i>
          </button>
        </div>
        <div className="order-price">
          <div>회원할인가</div>
          <div className="sale-price">
            <span>1,170</span>
            <span>원</span>
            <span>10%</span>
          </div>
          <div className="original-price">
            <span>1,300</span>
            <span>원</span>
            <i className="far fa-question-circle"></i>
          </div>
          <div>로그인 후, 회원할인가와 적립혜택이 제공됩니다.</div>
        </div>
        {/* <hr /> */}
        <div className="order-info">
          <dl>
            <dt>판매단위</dt>
            <dd>1봉</dd>
          </dl>
          <dl>
            <dt>중량/용량</dt>
            <dd>200g</dd>
          </dl>
          <dl>
            <dt>배송구분</dt>
            <dd>샛별배송/택배배송</dd>
          </dl>
          <dl>
            <dt>원산지</dt>
            <dd>국산</dd>
          </dl>
          <dl>
            <dt>포장타입</dt>
            <dd>
              <span>냉장/종이포장</span>
              <span>택배배송은 에코포장이 스티로폼으로 대체됩니다.</span>
            </dd>
          </dl>
          <dl>
            <dt>알레르기정보</dt>
            <dd>대두 함유</dd>
          </dl>
          <dl>
            <dt>유통기한</dt>
            <dd>수령일 포함 최소 1일이상 남은 상품을 배송드립니다.</dd>
          </dl>
          <dl>
            <dt>구매수량</dt>
            <dd>
              <button>-</button>
              <input type="number" name="" defaultValue="1" />
              <button>+</button>
            </dd>
          </dl>
        </div>
        <div className="order-total">
          <div>
            <span>총 상품금액:</span>
            <span>1,300</span>
            <span>원</span>
          </div>
          <div>
            <div>적립</div>
            <span>로그인 후, 회원할인가와 적립혜택 제공</span>
          </div>
        </div>
        <div className="order-button">
          <button>재입고 알림</button>
          <button>늘 사는 거</button>
          <button>장바구니 담기</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsHeader;
