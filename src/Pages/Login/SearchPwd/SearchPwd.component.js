import React, { Component } from "react";

import "./SearchPwd.styles.scss";

class SearchPwd extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      userId: "",
      userEmail: "",
    };
  }

  handleNameIdEmail = (e) => {
    this.setState({ [e.target.name]: e.target.value });
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
              name="userName"
              type="text"
              onChange={this.handleNameIdEmail}
            />
            <strong>아이디</strong>
            <input
              className="search-pwd-input user-id"
              name="userId"
              type="text"
              onChange={this.handleNameIdEmail}
            />
            <strong>이메일</strong>
            <input
              className="search-pwd-input user-email"
              name="userEmail"
              type="text"
              onChange={this.handleNameIdEmail}
            />
            <button className="search-pwd-button">찾기</button>
          </form>
        </div>
      </div>
    );
  }
}

export default SearchPwd;
