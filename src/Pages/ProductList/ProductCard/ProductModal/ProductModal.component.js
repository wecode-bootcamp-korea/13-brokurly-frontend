import React from "react";

import "./ProductModal.styles.scss";

const ProductModal = () => {
  return (
    <div className="ProductModal">
      <div className="modal-title">
        <span>상품 선택</span>
        <button>
          <i className="fas fa-times"></i>
        </button>
      </div>
      <div className="modal-content">
        <div className="modal-cart">[KF365] 감자 1kg</div>
        <div className="modal-list">
          <ul>
            <li>
              <div className="product-name">[KF365] 감자 1kg</div>
              <div className="product-price">
                <span>3180원</span>
                <div>
                  <span></span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div>
          <span>합계</span>
          <span>3180원</span>
        </div>
        <div>
          <span>적립</span>
          <span>로그인 후, 적립혜택 제공</span>
        </div>
        <div>
          <button>취소</button>
          <button>장바구니 담기</button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
