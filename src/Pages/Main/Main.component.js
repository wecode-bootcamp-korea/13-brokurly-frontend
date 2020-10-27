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
      lastScrollTop: 0,
      position: -2,
    };
    this.main = React.createRef();
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
    const scrollTop = this.main.current.scrollTop;
    this.setState({
      scrollTop,
    });
  };

  onScrollDown = () => {
    this.setState(
      {
        position: -1,
      },
      () => {
        setTimeout(() => {
          const scrollTop = this.main.current.scrollTop;
          this.setState({ position: scrollTop >= 5100 ? -3 : 0 });
          setTimeout(() => {
            this.setState({ scrollTop });
          }, 500);
        }, 500);
      }
    );
  };

  onScrollUp = () => {
    this.setState(
      {
        position: 1,
      },
      () => {
        setTimeout(() => {
          const scrollTop = this.main.current.scrollTop;
          this.setState({ position: scrollTop === 0 ? -2 : 0 });
          setTimeout(() => {
            this.setState({ scrollTop });
          }, 500);
        }, 500);
      }
    );
  };

  toggleSideMenuPosition = () => {
    const { lastScrollTop } = this.state;
    const scrollTop = this.main.current.scrollTop;
    this.setState({
      scrollTop,
    });
    console.log(scrollTop);
    if (lastScrollTop === 0 && scrollTop >= 240) {
      this.setState({
        lastScrollTop: 240,
        position: 0,
      });
    } else if (scrollTop < 240) {
      this.setState({
        lastScrollTop: 0,
        position: -2,
      });
    } else if (
      lastScrollTop > 0 &&
      scrollTop >= 240 &&
      scrollTop > this.state.scrollTop
    ) {
      this.onScrollDown();
    } else if (
      lastScrollTop > 0 &&
      scrollTop >= 240 &&
      scrollTop < this.state.scrollTop
    ) {
      this.onScrollUp();
    }
  };

  render() {
    const { specialSections, position } = this.state;
    return (
      <div
        className="Main"
        ref={this.main}
        onScroll={this.toggleSideMenuPosition}
      >
        <MainBanner />
        <SideMenu position={position} />
        {specialSections.map((section) => (
          <SectionRender section={section} key={section.id} />
        ))}
      </div>
    );
  }
}

export default Main;
