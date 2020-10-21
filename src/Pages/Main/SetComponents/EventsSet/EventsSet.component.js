import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./EventsSet.styles.scss";

const events = [
  {
    title: "호주 청정우 모음전",
    subtitle: "호주 대자연의 건강함",
    src: "https://img-cf.kurly.com/shop/data/main/3/pc_img_1603104074.jpg",
    alt: "event 1",
  },
  {
    title: "커트러리 모음전",
    subtitle: "테이블 세팅의 완성",
    src: "https://img-cf.kurly.com/shop/data/main/3/pc_img_1603104079.jpg",
    alt: "event 2",
  },
  {
    title: "홈카페 특가전 최대 15% 할인",
    subtitle: "나만의 작은 카페",
    src: "https://img-cf.kurly.com/shop/data/main/3/pc_img_1603104098.jpg",
    alt: "event 3",
  },
];

class EventsSet extends Component {
  constructor() {
    super();
    this.state = {
      eventsList: [],
    };
  }

  componentDidMount = () => {
    fetch("http://localhost:3000/Data/MainEventsData.json")
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          eventsList: res.eventsItems,
        });
      })
      .catch((error) => console.log(error.message));
  };

  render() {
    const { eventsList } = this.state;
    const eventsToShow = eventsList.slice(0, 3);
    return (
      <ul className="EventsSet">
        {eventsToShow.map((event) => {
          return (
            <li className="events-set-item">
              <Link className="Link" to="">
                <div className="event-image">
                  <img className="event-img" src={event.src} alt={event.alt} />
                </div>
              </Link>
              <div className="event-info">
                <h2 className="event-title">{event.title}</h2>
                <h3 className="event-subtitle">{event.subtitle}</h3>
              </div>
              {/* </Link> */}
            </li>
          );
        })}
      </ul>
    );
  }
}

export default EventsSet;
