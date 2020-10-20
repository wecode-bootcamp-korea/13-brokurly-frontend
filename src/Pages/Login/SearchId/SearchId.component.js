import React, { Component } from "react";

import "./SearchId.styles.scss";

class SearchId extends Component {
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
      <div className="SearchId">
        <div className="search-id-container">
          <h3 className="search-id-title">아이디 찾기</h3>
          <form className="search-id-form">
            <strong>이름</strong>
            <input
              className="search-id-input user-name"
              name="userName"
              type="text"
              placeholder="고객님의 이름을 입력해주세요"
              onChange={this.handleNameEmail}
            />
            <strong>이메일</strong>
            <input
              className="search-id-input user-email"
              name="userEmail"
              type="text"
              placeholder="가입 시 등록하신 이메일 주소를 입력해주세요"
              onChange={this.handleNameEmail}
            />
            <button className="search-id-button">확인</button>
          </form>
        </div>
      </div>
    );
  }
}

export default SearchId;
