import React, { Component } from "react";
import Swal from "sweetalert2";

import "./SearchId.styles.scss";

import { USER_SEARCH_ID } from "../../../config";

class SearchId extends Component {
  constructor() {
    super();
    this.state = {
      user_name: "",
      email: "",
    };
  }

  handleNameEmail = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { user_name, email } = this.state;
    if (
      Object.keys(this.state).every((element) => this.state[element] !== "")
    ) {
      fetch(USER_SEARCH_ID, {
        method: "POST",
        body: JSON.stringify({
          user_name,
          email,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.message === "SUCCESS") {
            Swal.fire({
              position: "center",
              icon: "success",
              title: `찾으시는 아이디는 ${result.user_id}입니다.`,
              showConfirmButton: false,
              timer: 2000,
            });
          } else {
            Swal.fire({
              position: "center",
              icon: "warning",
              title: "입력한 정보를 다시 확인해주세요.",
              showConfirmButton: false,
              timer: 2000,
            });
          }
        });
    } else {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "입력한 정보를 다시 확인해주세요.",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  render() {
    return (
      <div className="SearchId">
        <div className="search-id-container">
          <h3 className="search-id-title">아이디 찾기</h3>
          <form className="search-id-form">
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
            <button className="search-id-button" onClick={this.handleSubmit}>
              확인
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default SearchId;
