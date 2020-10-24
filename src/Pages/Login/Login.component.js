import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

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
    this.setState({ [e.target.name]: e.target.value });
  };

  handleLoginButton = (e) => {
    e.preventDefalult();
    const { user_id, password } = this.state;
    if (user_id !== "" && password !== "") {
      fetch("API", {
        method: "POST",
        body: JSON.stringify({
          user_id,
          password,
        }),
      })
        .then((response) => response.json)
        .then((result) => {
          if (result === "SUCCESS") {
            localStorage.setItem("wtw-token", result.token);
            this.goToMain();
          }
        });
    } else {
      alert("값을 입력해주세요.");
    }
  };

  render() {
    return (
      <div className="Login">
        <div className="login-container">
          <h3 className="login-title">로그인</h3>
          <form className="login-form" onSubmit={this.handleLoginButton}>
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
              type="text"
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
            <button className="login-button">로그인</button>
            <Link className="move-signup">회원가입</Link>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
