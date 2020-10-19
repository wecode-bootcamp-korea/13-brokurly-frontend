import React, { Component } from "react";

import "./IdSearch.styles.scss";

class IdSearch extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      userEmail: "",
    };
  }

  handleNameEmail = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="IdSearch">
        <h3 className="title">아이디 찾기</h3>
        <form className="search-id-form">
          <strong>이름</strong>
          <input
            className="user-name-input"
            name="userName"
            type="text"
            placeholder="고객님의 이름을 입력해주세요"
            onChange={this.handleNameEmail}
          />
          <strong>이메일</strong>
          <input
            className="user-email-input"
            name="userEmail"
            type="text"
            placeholder="가입 시 등록하신 이메일 주소를 입력해주세요"
            onChange={this.handleNameEmail}
          />
          <button className="search-id-button">확인</button>
        </form>
      </div>
    );
  }
}

export default IdSearch;
