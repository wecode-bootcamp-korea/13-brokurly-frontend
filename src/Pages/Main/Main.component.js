import React, { Component } from "react";
import { Link } from "react-router-dom";

import MainBanner from "./MainBanner/MainBanner.component";
import SpecialProductsSet from "./SpecialProductsSet/SpecialProductsSet.component";

import "./Main.styles.scss";

class Main extends Component {
  render() {
    const specialProductsSections = [
      {
        id: 1,
        title: "이 상품 어때요?",
        summary: "",
        isLinkToAvailable: false,
        linkTo: "",
        description: "hottest-now",
      },
      {
        id: 2,
        title: "알뜰 상품",
        summary: "",
        isLinkToAvailable: true,
        linkTo: "/thrifty-products",
        description: "thrifty-products",
      },
      {
        id: 3,
        title: "MD의 추천",
        summary: "",
        isLinkToAvailable: false,
        linkTo: "",
        description: "",
      },
      {
        id: 4,
        title: "오늘의 신상품",
        summary: "매일 정오, 컬리의 새로운 상품을 만나보세요",
        isLinkToAvailable: true,
        linkTo: "/fresh-in-today",
        description: "fresh-in-today",
      },
      {
        id: 5,
        title: "지금 가장 핫한 상품",
        summary: "",
        isLinkToAvailable: true,
        linkTo: "/hottest-now",
        description: "hottest-now",
      },
      {
        id: 6,
        title: "컬리가 만든 상품",
        summary: "",
        isLinkToAvailable: true,
        linkTo: "/kurly-made",
        description: "kurly-made",
      },
    ];
    return (
      <div className="Main">
        <MainBanner />
        <div className="special-products">
          {specialProductsSections.map((section) => {
            return section.isLinkToAvailable ? (
              <>
                <Link className="Link" to={section.linkTo}>
                  <h2
                    className={
                      "special-products-heading " + section.description
                    }
                  >
                    {section.title}
                    <div className="right-angle-icon"></div>
                  </h2>
                  <p
                    className={
                      section.summary.length > 0
                        ? "special-products-summary"
                        : "special-products-summary hide"
                    }
                  >
                    {section.summary}
                  </p>
                </Link>
                <SpecialProductsSet />
              </>
            ) : (
              <>
                <h2
                  className={"special-products-heading " + section.description}
                >
                  {section.title}
                </h2>
                <p
                  className={
                    section.summary.length > 0
                      ? "special-products-summary"
                      : "special-products-summary hide"
                  }
                >
                  {section.summary}
                </p>
                <SpecialProductsSet />
              </>
            );
          })}
          {/* <Link className="Link" to="/kurly-made">
            <h2 className="special-products-heading kurly-made">
              컬리가 만든 상품
              <div className="right-angle-icon"></div>
            </h2>
          </Link>
          <SpecialProductsSet /> */}
        </div>
      </div>
    );
  }
}

export default Main;
