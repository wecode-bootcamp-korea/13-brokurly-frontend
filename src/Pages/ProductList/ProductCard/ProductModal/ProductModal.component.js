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
                  <button>-</button>
                  <input type="number" name="" defaultValue="1" />
                  <button>+</button>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="modal-total-price">
          <span>합계</span>
          <div>
            <span>3180</span>
            <span>원</span>
          </div>
        </div>
        <div className="modal-discount">
          <span>적립</span>
          <span>로그인 후, 적립혜택 제공</span>
        </div>
        <div className="modal-button">
          <button>취소</button>
          <button>장바구니 담기</button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
