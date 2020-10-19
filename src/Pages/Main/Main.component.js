import React, { Component } from "react";
import IdSearch from "../Login/IdSearch/IdSearch.component";
import Login from "../Login/Login.component";
import PwdSearch from "../Login/pwdSearch/PwdSearch.component";

import "./Main.styles.scss";

class Main extends Component {
  render() {
    return (
      <Login />
      // <IdSearch />
      // <PwdSearch />
    );
  }
}

export default Main;
