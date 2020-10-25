import React, { Component } from "react";
import { connect } from "react-redux";

import { EARLY_DELIVERY_INFO } from "../../config";

import "./NavUserMenu.styles.scss";

class NavUserMenu extends Component {
  render() {
    const { currentUser } = this.props;
    console.log(currentUser);
    const { user_name, user_rank } = currentUser;
    return (
      <div className="NavUserMenu">
        <div>
          <div>
            <img
              src="https://res.kurly.com/pc/service/common/1908/delivery_190819.gif"
              alt="delivery"
            />
          </div>
          <div>
            {user_name ? (
              <div className="current-user">
                <span>{user_rank}</span>
                <span className="user-name">
                  {user_name}님
                  {user_rank === "웰컴" ? (
                    <img src={EARLY_DELIVERY_INFO} alt="delivery-ad" />
                  ) : (
                    ""
                  )}
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

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

export default connect(mapStateToProps)(NavUserMenu);
