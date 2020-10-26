import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./MainBanner.styles.scss";

class MainBanner extends Component {
  constructor() {
    super();
    this.state = {
      bannerImages: [],
      bannerImgWidth: window.innerWidth,
      bannerImgCount: 0,
      currentBannerId: 1,
      bannerImgsXcoordinate: 0,
      bannerImgsTransitionDelay: 800,
      leftClickedOnMainBanner: false,
      slideIntervalDelay: 4000,
    };
  }

  componentDidMount = () => {
    const { slideIntervalDelay } = this.state;
    fetch("http://localhost:3000/data/main/MainBannerImagesData.json")
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          bannerImages: res.bannerImages,
          bannerImgCount: res.bannerImages.length,
        });
      });
    this.timerId = setInterval(this.bannerSlideAuto, slideIntervalDelay);
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { currentBannerId, slideIntervalDelay } = this.state;
    if (currentBannerId !== prevState.currentBannerId) {
      clearInterval(this.timerId);
      this.timerId = setInterval(this.bannerSlideAuto, slideIntervalDelay);
    }
  };

  componentWillUnmount = () => {
    clearInterval(this.timerId);
  };

  bannerSlideAuto = () => {
    const {
      bannerImages,
      bannerImgWidth,
      bannerImgsXcoordinate,
      currentBannerId,
      leftClickedOnMainBanner,
    } = this.state;
    const xIncrement = bannerImgWidth * -1;
    const isLastImgAfterLeftClick =
      leftClickedOnMainBanner && currentBannerId === bannerImages.length;
    const isLastImgNaturally =
      !leftClickedOnMainBanner && currentBannerId === bannerImages.length;
    this.setState({
      currentBannerId: isLastImgAfterLeftClick
        ? currentBannerId - 1
        : isLastImgNaturally
        ? 1
        : currentBannerId + 1,
      bannerImgsXcoordinate: isLastImgAfterLeftClick
        ? bannerImgsXcoordinate - xIncrement
        : isLastImgNaturally
        ? 0
        : bannerImgsXcoordinate + xIncrement,
      bannerImgsTransitionDelay: isLastImgNaturally ? 0 : 800,
      slideIntervalDelay: isLastImgNaturally ? 0 : 4000,
      leftClickedOnMainBanner: false,
    });
  };

  bannerSlideLeft = () => {
    const {
      bannerImages,
      bannerImgWidth,
      bannerImgsXcoordinate,
      currentBannerId,
    } = this.state;
    const xIncrement = bannerImgWidth * -1;
    const isLastImg = currentBannerId === bannerImages.length;
    this.setState({
      currentBannerId: isLastImg ? 1 : currentBannerId + 1,
      bannerImgsXcoordinate: isLastImg ? 0 : bannerImgsXcoordinate + xIncrement,
      bannerImgsTransitionDelay: isLastImg ? 0 : 800,
      slideIntervalDelay: isLastImg ? 0 : 4000,
    });
  };

  bannerSlideRight = () => {
    const {
      bannerImages,
      bannerImgWidth,
      bannerImgsXcoordinate,
      currentBannerId,
    } = this.state;
    const xIncrement = bannerImgWidth;
    const isFirstImg = currentBannerId === 1;
    this.setState({
      currentBannerId: isFirstImg ? bannerImages.length : currentBannerId - 1,
      bannerImgsXcoordinate: isFirstImg
        ? xIncrement * -1 * (bannerImages.length - 1)
        : bannerImgsXcoordinate + xIncrement,
      bannerImgsTransitionDelay: isFirstImg ? 0 : 800,
      leftClickedOnMainBanner: isFirstImg ? true : false,
      slideIntervalDelay: isFirstImg ? 0 : 4000,
    });
  };

  render() {
    const {
      bannerImages,
      bannerImgsXcoordinate,
      bannerImgsTransitionDelay,
    } = this.state;
    let bannerTranslateStyle = {
      transform: `translate(${bannerImgsXcoordinate}px, 0)`,
      transition: `transform ${bannerImgsTransitionDelay}ms`,
    };
    return (
      <header className="MainBanner">
        <div
          className="banner-button-arrow left"
          onClick={this.bannerSlideRight}
        >
          <img
            className="banner-button-arrow-img left"
            src="./Images/Main/Banner/banner-left-arrow.png"
            alt="left button"
          />
        </div>
        <div
          className="banner-button-arrow right"
          onClick={this.bannerSlideLeft}
        >
          <img
            className="banner-button-arrow-img right"
            src="./Images/Main/Banner/banner-right-arrow.png"
            alt="right button"
          />
        </div>
        <ul className="banner-img-container" style={bannerTranslateStyle}>
          {bannerImages.map((image) => {
            return (
              <Link className="Link" to="">
                <li className="banner-img-item" key={image.id}>
                  <img className="banner-img" src={image.src} alt={image.alt} />
                </li>
              </Link>
            );
          })}
        </ul>
      </header>
    );
  }
}

export default MainBanner;
