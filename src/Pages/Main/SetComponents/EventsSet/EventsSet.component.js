import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./EventsSet.styles.scss";

const sectionIdToType = {
  100: "events",
  101: "recipe",
  1000: "md",
};

class EventsSet extends Component {
  constructor() {
    super();
    this.state = {
      eventsList: [],
    };
  }

  componentDidMount = () => {
    const { type } = this.props;
    const eventsAPI = fetch(
      `http://localhost:3000/data/main/Main${type}Data.json`
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          eventsList:
            type === "events"
              ? res.eventsItems
              : type === "recipe"
              ? res.recipeItems
              : "error",
        });
      })
      .catch((error) => console.log(error.message));
  };

  render() {
    const { eventsList } = this.state;
    const { type } = this.props;
    const eventsToShow = eventsList.slice(0, 3);
    console.log(eventsToShow);
    return (
      <ul className="EventsSet">
        {eventsToShow.map((item) => (
          <li className={`${type}-set-item`}>
            <Link className="Link" to="">
              <div className="image">
                <img className="img" src={item.src} alt={item.alt} />
              </div>
            </Link>
            <div className="info">
              <h2 className="title">{item.title}</h2>
              <h3 className="subtitle">{item.subtitle}</h3>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

export default EventsSet;
