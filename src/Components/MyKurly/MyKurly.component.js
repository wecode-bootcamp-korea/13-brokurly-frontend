import React, { Component } from "react";

import MyKurlyAside from "../MyKurlyAside/MyKurlyAside.component";
import MyKurlyMain from "../MyKurlyMain/MyKurlyMain.component";

import "./MyKurly.styles.scss";

class MyKurly extends Component {
  constructor() {
    super();
    this.state = {
      myKurlyCategoryNumber: 0,
    };
  }

  changeCategoryPage = (num) => this.setState({ myKurlyCategoryNumber: num });

  render() {
    const { myKurlyCategoryNumber } = this.state;
    return (
      <div className="MyKurly">
        <div className="my-kurly-container">
          <MyKurlyAside changePage={this.changeCategoryPage} />
          <MyKurlyMain showCategoryNumber={myKurlyCategoryNumber} />
        </div>
      </div>
    );
  }
}

export default MyKurly;
