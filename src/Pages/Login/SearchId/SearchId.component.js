import React, { Component } from "react";

import "./SearchId.styles.scss";

class SearchId extends Component {
  constructor() {
    super();
    this.state = {
      user_name: "",
      email: "",
    };
  }

  handleNameEmail = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { user_name, email } = this.state;
    if (
      Object.keys(this.state).every((element) => this.state[element] !== "")
    ) {
      fetch("API", {
        method: "POST",
        body: JSON.stringify({
          user_name,
          email,
        }),
      })
        .then((response) => response.json())
        .then((result) => console.log("결과 =>", result));
      // alert()를 사용해서 보여줄 예정
    }
  };

  render() {
    return (
      <div className="SearchId">
        <div className="search-id-container">
          <h3 className="search-id-title">아이디 찾기</h3>
          <form className="search-id-form" onSubmit={this.handleSubmit}>
            <strong>이름</strong>
            <input
              className="search-id-input"
              name="user_name"
              type="text"
              placeholder="고객님의 이름을 입력해주세요"
              onChange={this.handleNameEmail}
            />
            <strong>이메일</strong>
            <input
              className="search-id-input"
              name="email"
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
