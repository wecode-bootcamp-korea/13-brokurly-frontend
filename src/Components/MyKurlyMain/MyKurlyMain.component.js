import React, { Component } from "react";

import Purchase from "../Purchase/Purchase.component";
import FrequentlyPurchase from "../FrequentlyPurchase/FrequentlyPurchase.component";

import "./MyKurlyMain.styles.scss";

class MyKurlyMain extends Component {
  render() {
    return (
      <main>
        {/* <Purchase /> */}
        <FrequentlyPurchase />
      </main>
    );
  }
}

export default MyKurlyMain;
