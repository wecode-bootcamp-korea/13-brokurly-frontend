import React, { Component } from "react";

import "./MyKurlyAside.styles.scss";

class MyKurlyAside extends Component {
  render() {
    const { changePage } = this.props;
    return (
      <aside>
        <div className="category-name">
          <span>마이컬리</span>
        </div>
        <div className="category">
          <div onClick={() => changePage(0)}>
            <span>주문 내역</span>
            <i className="fal fa-greater-than" />
          </div>
          <div onClick={() => changePage(1)}>
            <span>늘 사는 것</span>
            <i className="fal fa-greater-than" />
          </div>
          <div>
            <span>상품후기</span>
            <i className="fal fa-greater-than" />
          </div>
          <div>
            <span>적립금</span>
            <i className="fal fa-greater-than" />
          </div>
          <div>
            <span>쿠폰</span>
            <i className="fal fa-greater-than" />
          </div>
          <div>
            <span>개인 정보 수정</span>
            <i className="fal fa-greater-than" />
          </div>
        </div>
        <div className="help">
          <span>도움이 필요하신가요?</span>
          <span>1:1 문의하기</span>
          <i className="fal fa-greater-than" />
        </div>
      </aside>
    );
  }
}

export default MyKurlyAside;
