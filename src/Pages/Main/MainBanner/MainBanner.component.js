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
    this.setState({
      currentBannerId:
        leftClickedOnMainBanner && currentBannerId === bannerImages.length
          ? currentBannerId - 1
          : !leftClickedOnMainBanner && currentBannerId === bannerImages.length
          ? 1
          : currentBannerId + 1,
      bannerImgsXcoordinate:
        leftClickedOnMainBanner && currentBannerId === bannerImages.length
          ? bannerImgsXcoordinate - xIncrement
          : !leftClickedOnMainBanner && currentBannerId === bannerImages.length
          ? 0
          : bannerImgsXcoordinate + xIncrement,
      bannerImgsTransitionDelay:
        !leftClickedOnMainBanner && currentBannerId === bannerImages.length
          ? 0
          : 800,
      slideIntervalDelay:
        !leftClickedOnMainBanner && currentBannerId === bannerImages.length
          ? 0
          : 4000,
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
    this.setState({
      currentBannerId:
        currentBannerId === bannerImages.length ? 1 : currentBannerId + 1,
      bannerImgsXcoordinate:
        currentBannerId === bannerImages.length
          ? 0
          : bannerImgsXcoordinate + xIncrement,
      bannerImgsTransitionDelay:
        currentBannerId === bannerImages.length ? 0 : 800,
      slideIntervalDelay: currentBannerId === bannerImages.length ? 0 : 4000,
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
    this.setState({
      currentBannerId:
        currentBannerId === 1 ? bannerImages.length : currentBannerId - 1,
      bannerImgsXcoordinate:
        currentBannerId === 1
          ? xIncrement * -1 * (bannerImages.length - 1)
          : bannerImgsXcoordinate + xIncrement,
      bannerImgsTransitionDelay: currentBannerId === 1 ? 0 : 800,
      leftClickedOnMainBanner: currentBannerId === 1 ? true : false,
      slideIntervalDelay: currentBannerId === 1 ? 0 : 4000,
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
