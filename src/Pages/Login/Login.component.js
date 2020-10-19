import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Login.styles.scss";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      userId: "",
      userPwd: "",
    };
  }

  handleIdPwd = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="Login">
        <div className="login-container">
          <h3 className="login-title">로그인</h3>
          <form className="login-form">
            <input
              className="id-input"
              name="userId"
              type="text"
              placeholder="아이디를 입력해주세요"
              onChange={this.handleIdPwd}
            />
            <input
              className="pwd-input"
              name="userPwd"
              type="text"
              placeholder="비밀번호를 입력해주세요"
              onChange={this.handleIdPwd}
            />
            <div className="check-and-search">
              <div className="check">
                <label htmlFor="connect-type">
                  <input type="checkbox" name="connect" id="connect-type" />
                  보안접속
                </label>
              </div>
              <div className="search">
                <Link className="search-id">아이디 찾기</Link>
                <span className="bar">|</span>
                <Link className="search-pwd">비밀번호 찾기</Link>
              </div>
            </div>
            <button className="loginButton">로그인</button>
            <Link className="moveSingup">회원가입</Link>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
