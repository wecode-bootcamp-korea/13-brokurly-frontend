import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./MainBanner.styles.scss";

const bannerImages = [
  {
    id: 1,
    src: "./Images/Main/Banner/banner-img-1.png",
    alt: "banner main",
  },
  {
    id: 2,
    src: "./Images/Main/Banner/banner-img-2.png",
    alt: "banner 2",
  },
  {
    id: 3,
    src: "./Images/Main/Banner/banner-img-3.png",
    alt: "banner 3",
  },
  {
    id: 4,
    src: "./Images/Main/Banner/banner-img-4.png",
    alt: "banner 4",
  },
  {
    id: 5,
    src: "./Images/Main/Banner/banner-img-5.png",
    alt: "banner 5",
  },
  {
    id: 1,
    src: "./Images/Main/Banner/banner-img-1.png",
    alt: "banner main",
  },
];

class MainBanner extends Component {
  constructor() {
    super();
    this.state = {
      bannerImgItemWidth: window.innerWidth,
      bannerImgItemCount: 0,
      bannerImgItemsTotalWidth: 0,
      bannerImgItemsXcoordinate: 0,
    };
  }

  componentDidMount = () => {
    const {
      bannerImgItemWidth,
      // bannerImgItemCount,
      // bannerImgItemsTotalWidth,
      // bannerImgItemsXcoordinate,
    } = this.state;
    this.setState({
      bannerImgItemCount: bannerImages.length,
      bannerImgItemsTotalWidth: bannerImgItemWidth * bannerImages.length,
    });

    // const autoslide = () => {
    //   this.setState(
    //     bannerImgItemsXcoordinate > bannerImgItemsTotalWidth
    //       ? {
    //           bannerImgItemsXcoordinate:
    //             bannerImgItemsXcoordinate - bannerImgItemWidth,
    //         }
    //       : { bannerImgItemsXcoordinate: 0 }
    //   );
    // };
    // setInterval(autoslide, 500);
  };

  // bannerSlideAuto = () => {
  //   const {
  //     bannerImgItemWidth,
  //     bannerImgItemsTotalWidth,
  //     bannerImgItemsXcoordinate,
  //   } = this.state;
  //   const autoslide = () => {
  //     this.setState(
  //       bannerImgItemsXcoordinate > bannerImgItemsTotalWidth
  //         ? {
  //             bannerImgItemsXcoordinate:
  //               bannerImgItemsXcoordinate - bannerImgItemWidth,
  //           }
  //         : { bannerImgItemsXcoordinate: 0 }
  //     );
  //   };
  //   setInterval(autoslide, 500);
  // };

  bannerSlideLeft = () => {
    const {
      bannerImgItemWidth,
      bannerImgItemsTotalWidth,
      bannerImgItemsXcoordinate,
    } = this.state;
    const xIncrement = bannerImgItemWidth * -1;
    this.setState(
      bannerImgItemsXcoordinate > bannerImgItemsTotalWidth - bannerImgItemWidth
        ? {
            bannerImgItemsXcoordinate: bannerImgItemsXcoordinate + xIncrement,
          }
        : { bannerImgContainerXcoordinate: 0 }
    );
  };

  bannerSlideRight = () => {
    const {
      bannerImgItemWidth,
      bannerImgItemsTotalWidth,
      bannerImgItemsXcoordinate,
    } = this.state;
    const xIncrement = bannerImgItemWidth;
    this.setState(
      bannerImgItemsXcoordinate < bannerImgItemsTotalWidth - bannerImgItemWidth
        ? {
            bannerImgItemsXcoordinate: bannerImgItemsXcoordinate + xIncrement,
          }
        : { bannerImgItemsXcoordinate: 0 }
    );
  };

  // bannerSlideLeft = () => {
  //   const { bannerImgItemWidth, bannerImgContainerXcoordinate } = this.state;
  //   const xIncrement = bannerImgItemWidth * -1;
  //   this.setState({
  //     bannerImgContainerXcoordinate: bannerImgContainerXcoordinate + xIncrement,
  //   });
  // };

  render() {
    const {
      bannerImgItemWidth,
      bannerImgItemCount,
      bannerImgItemsTotalWidth,
      bannerImgItemsXcoordinate,
    } = this.state;
    let bannerTranslateStyle = {
      transform: `translate(${bannerImgItemsXcoordinate}px, 0)`,
      transition: `transform 600ms`,
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
