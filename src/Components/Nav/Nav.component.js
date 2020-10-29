import React, { Component } from "react";
import { Link } from "react-router-dom";

import NavUserMenu from "../NavUserMenu/NavUserMenu.component";
import NavCategoryBar from "../NavCategoryBar/NavCategoryBar.component";

import "./Nav.styles.scss";

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      hidden: false,
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.scrollNavBarChange);
  }

  scrollNavBarChange = () => {
    const currentScrollTop = window.scrollY;
    if (currentScrollTop > 50 && this.state.hidden === false)
      this.setState({ hidden: true });

    if (currentScrollTop < 50 && this.state.hidden === true)
      this.setState({ hidden: false });
  };

  render() {
    const { hidden } = this.state;
    return (
      <div className="Nav">
        {!hidden && (
          <>
            <NavUserMenu />
            <div className="logo">
              <Link to="/">
                <img src="Images/new_kurly.png" alt="logo" />
              </Link>
            </div>
          </>
        )}
        <NavCategoryBar />
      </div>
    );
  }
}

export default Nav;
