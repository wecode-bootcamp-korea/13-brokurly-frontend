import React, { Component } from "react";

import "./SearchPwd.styles.scss";

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
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { user_name, user_id, email } = this.state;
    if (
      Object.keys(this.state).every((element) => this.state[element] !== "")
    ) {
      fetch("API", {
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
            alert("아직 작업중이에요");
            //여기 뭔가 추가할까?
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
