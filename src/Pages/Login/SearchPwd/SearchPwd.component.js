import React, { Component } from "react";

import "./SearchPwd.styles.scss";

import { USER_SEARCH_PASSWORD } from "../../../config";

class SearchPwd extends Component {
  constructor() {
    super();
    this.state = {
      user_name: "",
      user_id: "",
      email: "",
    };
  }

  handleNameIdEmail = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { user_name, user_id, email } = this.state;
    const pwdCondition = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/;

    if (
      Object.keys(this.state).every((element) => this.state[element] !== "")
    ) {
      fetch(USER_SEARCH_PASSWORD, {
        method: "POST",
        body: JSON.stringify({
          user_name,
          user_id,
          email,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.message === "SUCCESS") {
            let newPwd = prompt(
              "10자 이상의 영문,숫자,특수문자 각각 1개 이상의 조합으로 새로 작성해주세요"
            );
            while (newPwd === null || !newPwd.match(pwdCondition)) {
              newPwd = prompt(
                "10자 이상의 영문,숫자,특수문자 각각 1개 이상의 조합으로 새로 작성해주세요"
              );
              console.log(newPwd);
            }
            fetch(USER_SEARCH_PASSWORD, {
              method: "PATCH",
              body: JSON.stringify({
                user_id,
                password: newPwd,
              }),
            }).then(alert("비밀번호 변경이 완료되었습니다."));
          }
        });
    } else {
      alert("빈칸을 채워주세요");
    }
  };

  render() {
    return (
      <div className="SearchPwd">
        <div className="search-pwd-container">
          <h3 className="search-pwd-title">비밀번호 찾기</h3>
          <form className="search-pwd-form">
            <strong>이름</strong>
            <input
              className="search-pwd-input user-name"
              name="user_name"
              type="text"
              onChange={this.handleNameIdEmail}
            />
            <strong>아이디</strong>
            <input
              className="search-pwd-input user-id"
              name="user_id"
              type="text"
              onChange={this.handleNameIdEmail}
            />
            <strong>이메일</strong>
            <input
              className="search-pwd-input user-email"
              name="email"
              type="text"
              onChange={this.handleNameIdEmail}
            />
            <button className="search-pwd-button" onClick={this.handleSubmit}>
              찾기
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default SearchPwd;
