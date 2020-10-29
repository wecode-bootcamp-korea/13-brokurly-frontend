import React, { Component } from "react";
import MainBanner from "./MainBanner/MainBanner.component";
import SectionRender from "./SectionRender/SectionRender.component";
import "./Main.styles.scss";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      specialSections: [],
    };
  }

  componentDidMount() {
    this.getAPIdata();
  }

  getAPIdata = async () => {
    const res = await fetch("/data/main/MainPageSectionsDataArr.json");
    const data = await res.json();
    try {
      this.setState({
        specialSections: data.specialProductsSections,
      });
    } catch (error) {
      console.log("error...");
    }
  };

  render() {
    const { specialSections } = this.state;
    return (
      <div className="Main">
        <MainBanner />
        {specialSections.map((section) => (
          <SectionRender section={section} key={section.id} />
        ))}
      </div>
    );
  }
}

export default Main;
