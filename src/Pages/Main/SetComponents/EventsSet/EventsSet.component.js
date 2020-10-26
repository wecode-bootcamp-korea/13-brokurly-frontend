import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./EventsSet.styles.scss";

class EventsSet extends Component {
  constructor() {
    super();
    this.state = {
      eventsList: [],
      isImgVertical: true,
    };
  }

  componentDidMount = () => {
    const { type } = this.props;
    const eventsAPI =
      type === "recipe"
        ? "http://10.58.6.216:8000/recipe/category?id=0"
        : type === "events"
        ? "http://localhost:3000/data/main/MainEventsData.json"
        : "error";
    fetch(eventsAPI)
      .then((res) => res.json())
      .then((res) => {
        if (type === "events") {
          this.setState({
            eventsList: res.eventsItems,
          });
        }
        if (res.message === "SUCCESS") {
          this.setState({
            eventsList:
              type === "recipe"
                ? res.recipe_list
                : type === "events"
                ? res.eventsItems
                : "error",
          });
        }
      })
      .catch((error) => console.log(error.message));
  };

  resizeImage = (e) => {
    console.log(e.target.naturalHeight > e.target.naturalWidth);
    this.setState({
      isImgVertical: e.target.naturalHeight > e.target.naturalWidth,
    });
  };

  render() {
    const { eventsList, isImgVertical } = this.state;
    const { type } = this.props;
    const eventsToShow = eventsList.slice(0, 3);
    return (
      <ul className="EventsSet">
        {eventsToShow.map((item) => (
          <li className={`${type}-set-item`} key={item.name}>
            <Link className="Link" to="">
              <div className="image">
                <img
                  className={
                    isImgVertical ? "img full-width" : "img full-height"
                  }
                  src={item.image_url}
                  alt={item.name}
                  onLoad={this.resizeImage}
                />
              </div>
            </Link>
            <div className="info">
              <h2 className="title">{item.name}</h2>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

export default EventsSet;
