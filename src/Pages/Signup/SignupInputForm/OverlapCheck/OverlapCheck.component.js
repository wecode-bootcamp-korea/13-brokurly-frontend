import React, { Component } from "react";

import "./OverlapCheck.styles.scss";

class OverlapCheck extends Component {
  render() {
    return (
      <p className="OverlapCheck" onClick={this.props.onCheckOverlap}>
        중복확인
      </p>
    );
  }
}

export default OverlapCheck;
