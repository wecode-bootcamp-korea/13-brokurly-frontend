import React, { Component } from "react";
import { Link } from "react-router-dom";

import NavUserMenu from "../NavUserMenu/NavUserMenu.component";
import NavCategoryBar from "../NavCategoryBar/NavCategoryBar.component";

import "./Nav.styles.scss";

class Nav extends Component {
  render() {
    const { hidden } = this.props;
    return (
      <div className="Nav">
        {hidden ? (
          ""
        ) : (
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
