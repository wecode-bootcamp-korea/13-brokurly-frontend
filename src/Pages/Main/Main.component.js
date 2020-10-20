import React, { Component } from "react";

import Login from "../Login/Login.component";
import SearchPwd from "../Login/SearchPwd/SearchPwd.component";
import SearchId from "../Login/SearchId/SearchId.component";
import Signup from "../Signup/Signup.component";

import "./Main.styles.scss";

class Main extends Component {
  render() {
    return (
      // <Login />
      // <SearchId />
      // <SearchPwd />
      <Signup />
    );
  }
}

export default Main;
