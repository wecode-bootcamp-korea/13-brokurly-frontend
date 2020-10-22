import React, { Component } from "react";

import OverlapCheck from "./OverlapCheck/OverlapCheck.component";

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
        {onOffCount === 1 && <OverlapCheck onCheckOverlap={onCheckId} />}
        {onOffCount === 2 && <OverlapCheck onCheckOverlap={onCheckEmail} />}
      </div>
    );
  }
}

export default SignupInputForm;
