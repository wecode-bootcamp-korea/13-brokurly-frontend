import React, { Component } from "react";

import "./NavUserMenu.styles.scss";

class NavUserMenu extends Component {
  constructor() {
    super();
    this.state = {
      currentUserName: "김제형",
    };
  }

  render() {
    const { currentUserName } = this.state;
    return (
      <div className="Nav-user-menu">
        <div>
          <div>
            <img
              src="https://res.kurly.com/pc/service/common/1908/delivery_190819.gif"
              alt="delivery"
            />
          </div>
          <div>
            {currentUserName ? (
              <div className="current-user">
                <span>웰컴</span>
                <span className="user-name">
                  {currentUserName}님
                  <img
                    src="https://res.kurly.com/pc/service/common/1904/ico_new_20x20.png"
                    alt="new"
                  />
                  <i className="fas fa-caret-down"></i>
                </span>
                <div className="current-user-sub">
                  <span>주문 내역</span>
                  <span>늘 사는 것</span>
                  <span>상품후기</span>
                  <span>적립금</span>
                  <span>쿠폰</span>
                  <span>개인 정보 수정</span>
                  <span>로그아웃</span>
                </div>
              </div>
            ) : (
              <>
                <div className="signup">회원가입</div>
                <div className="login">로그인</div>
              </>
            )}
            <div className="help">
              고객센터
              <i className="fas fa-caret-down"></i>
              <div className="qna-submenu">
                <span>공지사항</span>
                <span>자주하는 질문</span>
                <span>1:1 문의</span>
                <span>상품 제안</span>
                <span>에코포장 피드백</span>
              </div>
            </div>
            <div>배송지역 검색</div>
          </div>
        </div>
      </div>
    );
  }
}

export default NavUserMenu;
