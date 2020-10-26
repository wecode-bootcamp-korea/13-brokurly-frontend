import React, { Component } from "react";

import UserInfo from "../../Components/UserInfo/UserInfo.component";

import "./MyPage.styles.scss";

class MyPage extends Component {
  render() {
    return (
      <div className="MyPage">
        <UserInfo />
        <div className="my-kurly">
          <div className="my-kurly-container">
            <aside>
              <div className="category-name">
                <span>마이컬리</span>
              </div>
              <div className="category">
                <div>
                  <span>주문 내역</span>
                  <i class="fal fa-greater-than" />
                </div>
                <div>
                  <span>늘 사는 것</span>
                  <i class="fal fa-greater-than" />
                </div>
                <div>
                  <span>상품후기</span>
                  <i class="fal fa-greater-than" />
                </div>
                <div>
                  <span>적립금</span>
                  <i class="fal fa-greater-than" />
                </div>
                <div>
                  <span>쿠폰</span>
                  <i class="fal fa-greater-than" />
                </div>
                <div>
                  <span>개인 정보 수정</span>
                  <i class="fal fa-greater-than" />
                </div>
              </div>
              <div className="help">
                <span>도움이 필요하신가요?</span>
                <span>1:1 문의하기</span>
              </div>
            </aside>
            <main></main>
          </div>
        </div>
      </div>
    );
  }
}

export default MyPage;
