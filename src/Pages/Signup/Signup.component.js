import React, { Component } from "react";

import "./Signup.styles.scss";

class Signup extends Component {
  render() {
    return (
      <div className="Signup">
        <div className="signup-container">
          <h3 className="signup-title">회원가입</h3>
          <div className="signup-guide">
            <span>*</span>필수입력사항
          </div>
          <form className="signup-forms">
            <div className="signup-form new-user-id"></div>
            <div className="signup-form new-user-pwd"></div>
            <div className="signup-form new-user-pwd-check"></div>
            <div className="signup-form new-user-name"></div>
            <div className="signup-form new-user-email"></div>
            <div className="signup-form new-user-phone"></div>
            <div className="signup-form new-user-address"></div>
            <div className="signup-form new-user-gender"></div>
            <div className="signup-form new-user-birth"></div>
            <div className="signup-form new-user-adds"></div>
            <div className="signup-form new-user-agrees"></div>
            <div className="signup-form new-user"></div>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
