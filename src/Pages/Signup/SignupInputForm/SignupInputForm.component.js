import React, { Component } from "react";

import OverlapCheck from "./OverlapCheck/OverlapCheck.component";

class SignupInputForm extends Component {
  makeOverlapCheck = () => {
    if (this.props.onOffCount === "1") {
      return <OverlapCheck onCheckOverlap={this.props.onCheckId} />;
    }
    if (this.props.onOffCount === "2") {
      return <OverlapCheck onCheckOverlap={this.props.onCheckEmail} />;
    }
  };

  handleWriteData = (e) => {
    this.props.onWriteData(e);
  };

  render() {
    return (
      <div className="SignupInputForm">
        <div className="input-content">
          {this.props.inputContent}
          <span className="signup-ico">*</span>
        </div>
        <input
          className="signup-input"
          name={this.props.name}
          placeholder={this.props.writeHolder}
          type={this.props.textType}
          onChange={this.handleWriteData}
        ></input>
        {this.makeOverlapCheck()}
      </div>
    );
  }
}

export default SignupInputForm;
