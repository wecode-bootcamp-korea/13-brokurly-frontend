import React, { Component } from "react";
import MainBanner from "./MainBanner/MainBanner.component";
import SideMenu from "../../Components/SideMenu/SideMenu.component";
import SectionRender from "./SectionRender/SectionRender.component";
import "./Main.styles.scss";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      specialSections: [],
      scrollY: 0,
    };
  }

  componentDidMount = () => {
    fetch("http://localhost:3000/data/main/MainPageSectionsDataArr.json")
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          specialSections: res.specialProductsSections,
        });
      })
      .catch((error) => console.log(error.message));
  };

  updateScrollY = () => {
    const scrollYRealTime = window.scrollY;
    if (scrollYRealTime > 250) {
      this.setState({
        scrollY: scrollYRealTime,
      });
    }
  };

  render() {
    const { specialSections } = this.state;
    return (
      <div className="Main" onScroll={this.updateScrollY}>
        <MainBanner />
        <SideMenu />
        {specialSections.map((section) => (
          <SectionRender section={section} />
        ))}
      </div>
    );
  }
}

export default Main;
