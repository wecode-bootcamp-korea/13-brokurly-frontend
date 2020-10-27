import React, { Component } from "react";

import MyKurlyAside from "../MyKurlyAside/MyKurlyAside.component";
import MyKurlyMain from "../MyKurlyMain/MyKurlyMain.component";

import "./MyKurly.styles.scss";

class MyKurly extends Component {
  render() {
    return (
      <div className="MyKurly">
        <div className="my-kurly-container">
          <MyKurlyAside />
          <MyKurlyMain />
        </div>
      </div>
    );
  }
}

export default MyKurly;
