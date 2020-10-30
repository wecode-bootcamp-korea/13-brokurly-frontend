import React, { Component } from "react";

import "./OverlapCheck.styles.scss";

class OverlapCheck extends Component {
  render() {
    return (
      <p className="OverlapCheck" onClick={this.props.onCheckOverlap}>
        {this.props.content}
      </p>
    );
  }
}

export default OverlapCheck;
