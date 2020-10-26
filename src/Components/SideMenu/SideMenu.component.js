import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./SideMenu.styles.scss";

class SideMenu extends Component {
  constructor() {
    super();
    this.state = {
      itemsList: [1, 2, 3, 4, 5, 6, 7],
      itemsCount: 7,
      listYcoordinate: 0,
      isTopButtonVisible: false,
      isBottomButtonVisible: true,
    };
  }

  slideList = (e) => {
    const { itemsCount, listYcoordinate } = this.state;
    const isClickTop = e.target.className.includes("top");
    const plusMinus = !isClickTop ? -1 : 1;
    const itemWidth = 80;
    const containerCountLimit = 1;
    const containerWidth = itemWidth * containerCountLimit;
    const divisionCount = itemsCount / containerCountLimit;
    const itemsCountModulo = itemsCount % containerCountLimit;
    const numClickable =
      divisionCount % 1 === 0
        ? divisionCount - 1
        : divisionCount - (divisionCount % 1);
    const yIncrementCount =
      numClickable <= 1 && Math.abs(listYcoordinate) > 0
        ? 1
        : Math.ceil(Math.abs(listYcoordinate) / containerWidth);
    const numBottomClickRemaining = numClickable - yIncrementCount;
    const isFinalBottomClickConditionReached =
      !isClickTop && numBottomClickRemaining === 1;
    const isFirstTopClick = isClickTop && numBottomClickRemaining === 0;
    const isFinalTopClickConditionReached = isClickTop && yIncrementCount === 1;
    const yIncrementPercentage =
      itemsCountModulo === 0 ? 1 : itemsCountModulo / containerCountLimit;
    const yIncrement =
      isFinalBottomClickConditionReached || isFirstTopClick
        ? containerWidth * yIncrementPercentage * plusMinus
        : containerWidth * plusMinus;
    this.setState({
      listYcoordinate: listYcoordinate + yIncrement,
      isBottomButtonVisible: isFinalBottomClickConditionReached ? false : true,
      isTopButtonVisible: isFinalTopClickConditionReached ? false : true,
    });
  };

  render() {
    const {
      itemsList,
      listYcoordinate,
      isTopButtonVisible,
      isBottomButtonVisible,
    } = this.state;
    let itemsTranslation = {
      transform: `translate(0, ${listYcoordinate}px)`,
      transition: `transform 600ms`,
    };
    return (
      <div className="SideMenu">
        <div className="delivery-info">
          <p>
            샛별 택배
            <br />
            배송안내
          </p>
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/8646c479493401.5cc4c9ebb7d99.png"
            alt="deliver info sunset img"
          />
        </div>
        <ul className="menus">
          <li>
            <Link className="Link" to="/events">
              이벤트
            </Link>
          </li>
          <li>
            <Link className="Link" to="/recipe">
              레시피
            </Link>
          </li>
        </ul>
        <div className="recently-seen-div">
          <div
            className={
              isTopButtonVisible ? "button-arrow top" : "button-arrow top hide"
            }
            onClick={this.slideList}
          >
            <img
              className="button-arrow-img top"
              src="./Images/SideMenu/button_arrow.png"
              alt="recent list top button"
            />
          </div>
          <div
            className={
              isBottomButtonVisible
                ? "button-arrow bottom"
                : "button-arrow bottom hide"
            }
            onClick={this.slideList}
          >
            <img
              className="button-arrow-img bottom"
              src="./Images/SideMenu/button_arrow.png"
              alt="recent list bottom button"
            />
          </div>
          <p>최근 본 상품</p>
          <div className="recently-seen-container">
            <ul style={itemsTranslation}>
              {itemsList.map((item) => (
                <li>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default SideMenu;
