import React, { Component } from "react";

import UserInfo from "../../Components/UserInfo/UserInfo.component";
import MyKurly from "../../Components/MyKurly/MyKurly.component";

class MyPage extends Component {
  render() {
    return (
      <div className="MyPage">
        <UserInfo />
        <MyKurly />
      </div>
    );
  }
}

export default MyPage;
