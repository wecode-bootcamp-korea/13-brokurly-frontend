import React, { Component } from "react";

import OverlapCheck from "./OverlapCheck/OverlapCheck.component";
import OverlapCheckText from "./OverlapCheckText/OverlapCheckText.component";

class SignupInputForm extends Component {
  handleWriteData = (e) => {
    this.props.onWriteData(e);
  };

  render() {
    const {
      inputContent,
      name,
      writeHolder,
      textType,
      onOffCount,
      onCheckId,
      onCheckEmail,
    } = this.props;
    return (
      <>
        <div className="SignupInputForm">
          <div className="input-content">
            {inputContent}
            <span className="ico">*</span>
          </div>
          <input
            className="input"
            name={name}
            placeholder={writeHolder}
            type={textType}
            onChange={this.handleWriteData}
          />
          {onOffCount === "idCheck" && (
            <OverlapCheck onCheckOverlap={onCheckId} />
          )}
          {onOffCount === "emailCheck" && (
            <OverlapCheck onCheckOverlap={onCheckEmail} />
          )}
        </div>
        <OverlapCheckText
          onOffCount={onOffCount}
          onData={this.props.checkData}
        />
      </>
    );
  }
}

export default SignupInputForm;
