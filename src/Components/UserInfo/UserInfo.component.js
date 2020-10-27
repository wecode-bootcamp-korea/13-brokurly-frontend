import React, { Component } from "react";

import { connect } from "react-redux";

import "./UserInfo.styles.scss";

class UserInfo extends Component {
  render() {
    const { currentUser } = this.props;
    const { user_rank, user_name } = currentUser;
    return (
      <div className="UserInfo">
        <div className="user-info-small-container">
          <div className="user-ranking">
            <div className="top">
              <div className="current-ranking">
                <span>{user_rank}</span>
              </div>
              <div className="ranking-information">
                <p className="name">
                  {user_name}
                  <span>님</span>
                </p>
                <p className="mileage-rating">적립 5%</p>
                <p className="privilege">최초 1회 무료배송</p>
              </div>
            </div>
            <div className="bottom">
              <button>전체등급 보기</button>
              <button>다음 달 예상등급 보기</button>
            </div>
          </div>
          <div className="user-point">
            <div>
              <span>적립금</span>
            </div>
            <div className="point-info">
              <p>
                0 원<span>&#62;</span>
              </p>
              <p>소멸예정 0원</p>
            </div>
          </div>
          <div className="user-coupon">
            <div>
              <span>쿠폰</span>
            </div>
            <div className="coupon-info">
              <p>
                1 개<span>&#62;</span>
              </p>
            </div>
          </div>
          <div className="user-pass">
            <div>
              <span>컬리패스</span>
            </div>
            <div className="coupon-info">
              <p>
                알아보기<span>&#62;</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

export default connect(mapStateToProps)(UserInfo);
