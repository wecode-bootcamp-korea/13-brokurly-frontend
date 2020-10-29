import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import NavCategoryAllBarSub from "../NavCategoryAllBar/NavCategoryAllBarSub.component";

import { CART } from "../../config";

import "./NavCategoryBar.styles.scss";

class NavCategoryBar extends Component {
  checkCartItemPageAccess = () => {
    const { userToken } = this.props;
    if (!userToken) {
      alert("로그인을 해 주세요!");
      return this.props.history.push("/login");
    }
    this.props.history.push("/cartItems");
  };

  render() {
    const { cartItems } = this.props;
    return (
      <div className="NavCategoryBar">
        <div>
          <div className="all">
            <div className="hamburger">
              <span />
              <span />
              <span />
            </div>
            <span>전체 카테고리</span>
            <NavCategoryAllBarSub />
          </div>
          <div className="new">신상품</div>
          <div className="best">베스트</div>
          <div className="affordable">알뜰쇼핑</div>
          <div className="event">이벤트</div>
          <div className="search-and-cart">
            <div>
              <input type="text" placeholder="내 맘대로 끓여먹는 라면" />
              <i className="fa fa-search"></i>
            </div>
            <img
              src={CART}
              alt="cart-icon"
              onClick={this.checkCartItemPageAccess}
            />
            {!!cartItems.length && <span>{cartItems.length}</span>}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ cart, user }) => ({
  cartItems: cart.cartItems,
  userToken: user.userToken,
});

export default withRouter(connect(mapStateToProps)(NavCategoryBar));
