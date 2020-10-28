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
    this.getAPIData();
  };

  getAPIData = async () => {
    const { type } = this.props;
    const typeTable = {
      events: {
        api: "/data/main/MainEventsData.json",
        dataKey: "events_list",
      },
      recipe: {
        api: "http://10.58.6.216:8000/recipe/category/0",
        dataKey: "recipe_list",
      },
    };
    try {
      const res = await fetch(typeTable[type]["api"]);
      const data = await res.json();
      if ((data.message = "SUCCESS")) {
        this.setState({
          eventsList: data[typeTable[type]["dataKey"]],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  resizeImage = (e) => {
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
