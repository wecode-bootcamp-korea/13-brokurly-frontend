import React, { Component } from "react";

import "./PwdSearch.styles.scss";

class PwdSearch extends Component {
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
      <div className="IdSearch">
        <h3 className="title">비밀번호 찾기</h3>
        <form className="search-id-form">
          <strong>이름</strong>
          <input
            className="user-name-input"
            name="userName"
            type="text"
            onChange={this.handleNameIdEmail}
          />
          <strong>아이디</strong>
          <input
            className="user-id-input"
            name="userId"
            type="text"
            onChange={this.handleNameIdEmail}
          />
          <strong>이메일</strong>
          <input
            className="user-email-input"
            name="userEmail"
            type="text"
            onChange={this.handleNameIdEmail}
          />
          <button className="search-pwd-button">찾기</button>
        </form>
      </div>
    );
  }
}

export default PwdSearch;
