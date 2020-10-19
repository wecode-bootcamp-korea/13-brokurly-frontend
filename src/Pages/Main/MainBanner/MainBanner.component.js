import React, { Component } from "react";

import "./MainBanner.styles.scss";

class MainBanner extends Component {
  render() {
    return (
      <header className="MainBanner">
        <div className="bannerImgDiv">
          <img
            className="bannerImg"
            src="./Images/Main/Banner/banner-img-1.png"
            alt="main page banner"
          />
        </div>
      </header>
    );
  }
}

export default MainBanner;
