import React from "react";

import "./ProductDetailsReview.styles.scss";

const ProductDetailsReview = () => {
  // conditional rendering
  // !data.length && return <div>Loading...</div>
  return (
    <div className="ProductDetailsReview">
      <div className="review-header">
        <h5>product review</h5>
        <div className="review-caution">
          <ul>
            <li>
              상품에 대한 문의를 남기는 공간입니다. 해당 게시판의 성격과 다른
              글은 사전동의 없이 담당 게시판으로 이동될수 있습니다.
            </li>
            <li>
              배송관련, 주문(취소/교환/환불) 관련 문의 및 요청사항은 마이컬리 내{" "}
              <u>1:1문의</u> 에 남겨주세요.
            </li>
          </ul>
          <select name="" id="">
            <option value="1">최근등록순</option>
            <option value="2">좋아요많은순</option>
            <option value="3">조회많은순</option>
          </select>
        </div>
      </div>
      <div className="review-board">
        <table className="review-thead">
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>회원등급</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>도움</th>
              <th>조회</th>
            </tr>
          </thead>
        </table>
        <ul className="review-list">
          <li>
            <table className="review-tbody">
              <tbody>
                <tr>
                  <td>공지</td>
                  <td>금주의 Best 후기 안내</td>
                  <td>bros</td>
                  <td>Brokurly</td>
                  <td>2019-11-01</td>
                  <td>0</td>
                  <td>120</td>
                </tr>
              </tbody>
            </table>
            <div className="review-content">
              <p>
                고객님 안녕하세요, 마켓컬리입니다. <br /> ■ Best 후기 당첨자
                안내 [2020년 10월 12일 ~ 2020년 10월 18일]의 Best 후기 당첨자
                공지드립니다. 정성껏 후기를 작성해주신 모든 고객님께
                감사드립니다. Best 후기는 아래 게시판을 통해 확인 가능합니다.
              </p>
              <img src="" alt="" />
              <p>
                http://www.kurly.com/shop/goods/goods_review_best.php 마켓컬리는
                상품에 대한 고객 여러분의 생생한 의견을 듣고 더 나은 상품을
                준비하기 위해 상품 후기 게시판을 운영하고 있습니다. 실제로
                상품의 후기가 구매 결정에 있어 큰 도움이 된 best 후기를 아래로
                공유드립니다.
              </p>
            </div>
          </li>
          <li>
            <table className="review-tbody">
              <tbody>
                <tr>
                  <td>공지</td>
                  <td>금주의 Best 후기 안내</td>
                  <td>bros</td>
                  <td>Brokurly</td>
                  <td>2019-11-01</td>
                  <td>0</td>
                  <td>120</td>
                </tr>
              </tbody>
            </table>
            <div className="review-content">
              <p>
                고객님 안녕하세요, 마켓컬리입니다. <br /> ■ Best 후기 당첨자
                안내 [2020년 10월 12일 ~ 2020년 10월 18일]의 Best 후기 당첨자
                공지드립니다. 정성껏 후기를 작성해주신 모든 고객님께
                감사드립니다. Best 후기는 아래 게시판을 통해 확인 가능합니다.
              </p>
              <img src="" alt="" />
              <p>
                http://www.kurly.com/shop/goods/goods_review_best.php 마켓컬리는
                상품에 대한 고객 여러분의 생생한 의견을 듣고 더 나은 상품을
                준비하기 위해 상품 후기 게시판을 운영하고 있습니다. 실제로
                상품의 후기가 구매 결정에 있어 큰 도움이 된 best 후기를 아래로
                공유드립니다.
              </p>
            </div>
          </li>
          <li>
            <table className="review-tbody">
              <tbody>
                <tr>
                  <td>공지</td>
                  <td>금주의 Best 후기 안내</td>
                  <td>bros</td>
                  <td>Brokurly</td>
                  <td>2019-11-01</td>
                  <td>0</td>
                  <td>120</td>
                </tr>
              </tbody>
            </table>
            <div className="review-content">
              <p>
                고객님 안녕하세요, 마켓컬리입니다. <br /> ■ Best 후기 당첨자
                안내 [2020년 10월 12일 ~ 2020년 10월 18일]의 Best 후기 당첨자
                공지드립니다. 정성껏 후기를 작성해주신 모든 고객님께
                감사드립니다. Best 후기는 아래 게시판을 통해 확인 가능합니다.
              </p>
              <img src="" alt="" />
              <p>
                http://www.kurly.com/shop/goods/goods_review_best.php 마켓컬리는
                상품에 대한 고객 여러분의 생생한 의견을 듣고 더 나은 상품을
                준비하기 위해 상품 후기 게시판을 운영하고 있습니다. 실제로
                상품의 후기가 구매 결정에 있어 큰 도움이 된 best 후기를 아래로
                공유드립니다.
              </p>
            </div>
          </li>
        </ul>
      </div>
      <button>후기쓰기</button>
      <div>pagenation</div>
      {/* 땡겨오는 법 알아보기 */}
    </div>
  );
};

export default ProductDetailsReview;
