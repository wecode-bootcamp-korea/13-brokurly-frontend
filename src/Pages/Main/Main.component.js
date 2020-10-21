import React, { Component } from "react";
import { Link } from "react-router-dom";

import MainBanner from "./MainBanner/MainBanner.component";
import SpecialProductsSet from "./SetComponents/SpecialProductsSet/SpecialProductsSet.component";
import EventsSet from "./SetComponents/EventsSet/EventsSet.component";
import RecipeSet from "./SetComponents/RecipeSet/RecipeSet.component";
import MDRecommend from "./SetComponents/MDRecommend/MDRecommend.component";

import "./Main.styles.scss";

const specialProductsSections = [
  {
    id: 1,
    title: "이 상품 어때요?",
    subtitle: "",
    componentType: "products",
    isLinkToAvailable: false,
    linkTo: "",
    description: "hottest-now",
  },
  {
    id: 2,
    title: "이벤트 소식",
    subtitle: "",
    componentType: "events",
    isLinkToAvailable: true,
    linkTo: "/event-news",
    description: "event news",
  },
  {
    id: 3,
    title: "알뜰 상품",
    subtitle: "",
    componentType: "products",
    isLinkToAvailable: true,
    linkTo: "/thrifty-products",
    description: "thrifty-products",
  },
  {
    id: 4,
    title: "MD의 추천",
    subtitle: "",
    componentType: "md",
    isLinkToAvailable: false,
    linkTo: "",
    description: "",
  },
  {
    id: 5,
    title: "오늘의 신상품",
    subtitle: "매일 정오, 컬리의 새로운 상품을 만나보세요",
    componentType: "products",
    isLinkToAvailable: true,
    linkTo: "/fresh-in-today",
    description: "fresh-in-today",
  },
  {
    id: 6,
    title: "지금 가장 핫한 상품",
    subtitle: "",
    componentType: "products",
    isLinkToAvailable: true,
    linkTo: "/hottest-now",
    description: "hottest-now",
  },
  {
    id: 7,
    title: "브로가 만든 상품",
    subtitle: "",
    componentType: "products",
    isLinkToAvailable: true,
    linkTo: "/bros-made",
    description: "bros-made",
  },
  {
    id: 8,
    title: "브로의 레시피",
    subtitle: "",
    componentType: "recipe",
    isLinkToAvailable: true,
    linkTo: "/bros-recipe",
    description: "bros-recipe",
  },
];

class Main extends Component {
  renderSectionClassName(componentType) {
    if (componentType === "products") {
      return "special-section products";
    } else if (componentType === "events") {
      return "special-section other";
    } else if (componentType === "recipe") {
      return "special-section other";
    } else if (componentType === "md") {
      return "special-section md";
    } else {
      return "error";
    }
  }
  renderComponent(componentType) {
    if (componentType === "products") {
      return <SpecialProductsSet />;
    } else if (componentType === "events") {
      return <EventsSet />;
    } else if (componentType === "recipe") {
      return <RecipeSet />;
    } else if (componentType === "md") {
      return <MDRecommend />;
    } else {
      return "error";
    }
  }

  render() {
    return (
      <div className="Main">
        <MainBanner />
        {specialProductsSections.map((section) => {
          return section.isLinkToAvailable ? (
            <div className={this.renderSectionClassName(section.componentType)}>
              <Link className="Link" to={section.linkTo}>
                <h2
                  className={"special-section-heading " + section.description}
                >
                  {section.title}
                  <div className="right-angle-icon"></div>
                </h2>
                <p
                  className={
                    section.subtitle.length > 0
                      ? "special-section-subtitle"
                      : "special-section-subtitle hide"
                  }
                >
                  {section.subtitle}
                </p>
              </Link>
              {this.renderComponent(section.componentType)}
            </div>
          ) : (
            <div className={this.renderSectionClassName(section.componentType)}>
              <h2 className={"special-section-heading " + section.description}>
                {section.title}
              </h2>
              <p
                className={
                  section.subtitle.length > 0
                    ? "special-section-subtitle"
                    : "special-section-subtitle hide"
                }
              >
                {section.summary}
              </p>
              {this.renderComponent(section.componentType)}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Main;
