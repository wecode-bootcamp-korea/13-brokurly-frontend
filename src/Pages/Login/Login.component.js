import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { getToken, getCurrentUser } from "../../redux/user/user.actions";
import { getCartItems } from "../../redux/cart/cart.actions";
import { getFrequentlyPurchaseItems } from "../../redux/frequentlyPurchase/frequentlyPurchase.actions";
import { getPurchaseList } from "../../redux/purchase/purchase.actions";

import {
  GET_SHOPPINGBASKET_API,
  GET_PURHCASE_LIST_API,
  GET_FREQUENTLY_PRODUCT_API,
} from "../../config";

import "./Login.styles.scss";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      user_id: "",
      password: "",
    };
  }

  goToMain = () => {
    this.props.history.push("/");
  };

  handleIdPwd = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleLoginButton = async (e) => {
    e.preventDefault();
    const { user_id, password } = this.state;
    const {
      getToken,
      getCurrentUser,
      getCartItems,
      getFrequentlyPurchaseItems,
      getPurchaseList,
      userToken,
    } = this.props;
    if (user_id !== "" && password !== "") {
      await fetch("http://10.58.6.216:8000/user/signin", {
        method: "POST",
        body: JSON.stringify({
          user_id,
          password,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.message === "SUCCESS") {
            alert("쓸거면 팍팍써라, 많이 먹는다고 안 죽는다.");
            getToken(result.authorization);
            getCurrentUser(result.user);
            this.goToMain();
          } else {
            alert("잘못된 아이디 혹은 비밀번호입니다.");
          }
        });

      // await fetch(GET_SHOPPINGBASKET_API, {
      //   headers: {
      //     "content-type": "application/json",
      //     Authorization: userToken,
      //   },
      // })
      //   .then((res) => res.json())
      //   .then((data) => data.shopping_list)
      //   .then((cartItems) => getCartItems(cartItems))
      //   .catch((error) => console.log(error));

      // await fetch(GET_FREQUENTLY_PRODUCT_API, {
      //   headers: {
      //     "content-type": "application/json",
      //     Authorization: userToken,
      //   },
      // })
      //   .then((res) => res.json())
      //   .then((data) => data.product_list)
      //   .then((product_list) => getFrequentlyPurchaseItems(product_list))
      //   .catch((error) => console.log(error));

      // await fetch(GET_PURHCASE_LIST_API, {
      //   headers: {
      //     "content-type": "application/json",
      //     Authorization: userToken,
      //   },
      // })
      //   .then((res) => res.json())
      //   .then((data) => data.order_list)
      //   .then((purchaseList) => getPurchaseList(purchaseList))
      //   .catch((error) => console.log(error));
    } else {
      alert("밥먹고 싶으면 제대로 써라!");
    }
  };

  render() {
    return (
      <div className="Login">
        <div className="login-container">
          <h3 className="login-title">로그인</h3>
          <form className="login-form">
            <input
              className="login-input id"
              name="user_id"
              type="text"
              placeholder="아이디를 입력해주세요"
              onChange={this.handleIdPwd}
            />
            <input
              className="login-input pwd"
              name="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              onChange={this.handleIdPwd}
            />
            <div className="check-and-search">
              <div className="check">
                <label>
                  <input type="checkbox" name="connect" />
                  <span>보안접속</span>
                </label>
              </div>
              <div className="search">
                <Link className="search-text id" to="/searchid">
                  아이디 찾기
                </Link>
                <span className="bar">|</span>
                <Link className="search-text pwd" to="/searchpwd">
                  비밀번호 찾기
                </Link>
              </div>
            </div>
            <button
              className="login-button"
              onClick={this.handleLoginButton}
              target="_self"
            >
              로그인
            </button>
            <Link to="/signup" className="move-signup">
              회원가입
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  userToken: user.userToken,
});

const mapDispatchToProps = (dispatch) => ({
  getToken: (token) => dispatch(getToken(token)),
  getCurrentUser: (user) => dispatch(getCurrentUser(user)),
  getCartItems: (cartItems) => dispatch(getCartItems(cartItems)),
  getFrequentlyPurchaseItems: (purchaseItems) =>
    dispatch(getFrequentlyPurchaseItems(purchaseItems)),
  getPurchaseList: (purchaseItems) => dispatch(getPurchaseList(purchaseItems)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
