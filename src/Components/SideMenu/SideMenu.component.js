import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import "./SideMenu.styles.scss";

class SideMenu extends Component {
  constructor() {
    super();
    this.state = {
      itemsCount: 0,
      listYcoordinate: 0,
      isTopButtonVisible: false,
      isBottomButtonVisible: true,
      isImgVertical: true,
    };
  }

  componentDidMount = () => {
    const { recentlySeenList } = this.props;
    this.setState({
      itemsCount: recentlySeenList.length,
    });
  };

  resizeImage = (e) => {
    console.log("height: " + e.target.naturalHeight);
    console.log("width: " + e.target.naturalWidth);
    this.setState({
      isImgVertical: e.target.naturalHeight > e.target.naturalWidth,
    });
  };

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
      isBottomButtonVisible: !isFinalBottomClickConditionReached,
      isTopButtonVisible: !isFinalTopClickConditionReached,
    });
  };

  render() {
    const {
      listYcoordinate,
      isTopButtonVisible,
      isBottomButtonVisible,
      isImgVertical,
    } = this.state;
    const { position, recentlySeenList } = this.props;
    const itemsTranslation = {
      transform: `translate(0, ${listYcoordinate}px)`,
      transition: `transform 600ms`,
    };
    const positionToClassName = {
      "-2": "SideMenu",
      "-1": "SideMenu on-scroll-down",
      0: "SideMenu default",
      1: "SideMenu on-scroll-up",
      2: "SideMenu scroll-end",
    };
    return (
      <div className={positionToClassName[position]}>
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
          <button
            className={
              isTopButtonVisible ? "button-arrow top" : "button-arrow top hide"
            }
            disabled={!isTopButtonVisible}
            onClick={this.slideList}
          >
            <img
              className="button-arrow-img top"
              src="https://media.vlpt.us/images/dhlee91/post/6fa24700-bf3d-4ef4-9371-d9ff3f03bdbe/button_arrow.png"
              alt="recent list top button"
            />
          </button>
          <button
            className={
              isBottomButtonVisible
                ? "button-arrow bottom"
                : "button-arrow bottom hide"
            }
            disabled={!isBottomButtonVisible}
            onClick={this.slideList}
          >
            <img
              className="button-arrow-img bottom"
              src="https://media.vlpt.us/images/dhlee91/post/6fa24700-bf3d-4ef4-9371-d9ff3f03bdbe/button_arrow.png"
              alt="recent list bottom button"
            />
          </button>
          <p>최근 본 상품</p>
          <div className="recently-seen-container">
            <ul style={itemsTranslation}>
              {recentlySeenList.reverse().map((item) => (
                <li
                  key={item.id}
                  onClick={() =>
                    this.props.history.push(`/productdetails/${item.id}`)
                  }
                >
                  <img
                    className={
                      isImgVertical
                        ? "item-img full-width"
                        : "item-img full-height"
                    }
                    src={item.imageUrl}
                    alt="recently seen product"
                    id={item.id}
                    onLoad={this.resizeImage}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ recentlySeen }) => ({
  recentlySeenList: recentlySeen.recentlySeenList,
});

export default withRouter(connect(mapStateToProps)(SideMenu));
