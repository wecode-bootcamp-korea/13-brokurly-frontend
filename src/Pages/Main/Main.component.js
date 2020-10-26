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
      scrollTop: 0,
    };
    this.myRef = React.createRef();
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

  updateScrollTop = () => {
    const scrollYRealTime = window.scrollY;
    const scrollTop = this.myRef.current.scrollTop;
    console.log(scrollYRealTime);
    this.setState({
      scrollTop: scrollTop,
    });
  };

  render() {
    const { specialSections, scrollTop } = this.state;
    return (
      <div
        className="Main"
        ref={this.myRef}
        onScroll={this.updateScrollTop}
        scrollTop={scrollTop}
      >
        <MainBanner />
        <SideMenu />
        {specialSections.map((section) => (
          <SectionRender section={section} key={section.id} />
        ))}
      </div>
    );
  }
}

export default Main;
