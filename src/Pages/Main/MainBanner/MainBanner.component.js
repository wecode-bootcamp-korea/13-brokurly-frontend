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
      bannerImgsXcoordinate: 0,
      currentBannerId: 1,
    };
  }

  componentDidMount = () => {
    fetch("http://localhost:3000/data/main/MainBannerImagesData.json")
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          bannerImages: res.bannerImages,
          bannerImgCount: res.bannerImages.length,
        });
      });

    const bannerSlideAuto = () => {
      const {
        bannerImages,
        bannerImgWidth,
        bannerImgsXcoordinate,
        currentBannerId,
      } = this.state;
      const xIncrement = bannerImgWidth * -1;
      this.setState(
        currentBannerId === bannerImages.length
          ? {
              currentBannerId: 1,
              bannerImgsXcoordinate: 0,
            }
          : {
              currentBannerId: currentBannerId + 1,
              bannerImgsXcoordinate: bannerImgsXcoordinate + xIncrement,
            }
      );
    };
    setInterval(bannerSlideAuto, 4000);
  };

  bannerSlideLeft = () => {
    const {
      bannerImages,
      bannerImgWidth,
      bannerImgsXcoordinate,
      currentBannerId,
    } = this.state;
    const xIncrement = bannerImgWidth * -1;
    this.setState(
      currentBannerId === bannerImages.length
        ? {
            currentBannerId: 1,
            bannerImgsXcoordinate: 0,
          }
        : {
            currentBannerId: currentBannerId + 1,
            bannerImgsXcoordinate: bannerImgsXcoordinate + xIncrement,
          }
    );
  };

  bannerSlideRight = () => {
    const {
      bannerImages,
      bannerImgWidth,
      bannerImgsXcoordinate,
      currentBannerId,
    } = this.state;
    const xIncrement = bannerImgWidth;
    this.setState(
      currentBannerId === 1
        ? {
            currentBannerId: 0,
            bannerImgsXcoordinate: xIncrement * -1 * (bannerImages.length - 1),
          }
        : {
            currentBannerId: currentBannerId - 1,
            bannerImgsXcoordinate: bannerImgsXcoordinate + xIncrement,
          }
    );
  };

  render() {
    const { bannerImages, bannerImgsXcoordinate } = this.state;
    let bannerTranslateStyle = {
      transform: `translate(${bannerImgsXcoordinate}px, 0)`,
      transition: `transform 800ms`,
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
