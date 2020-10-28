import React, { Component } from "react";

import Purchase from "../Purchase/Purchase.component";
import FrequentlyPurchase from "../FrequentlyPurchase/FrequentlyPurchase.component";

import "./MyKurlyMain.styles.scss";

class MyKurlyMain extends Component {
  render() {
    const categoryPagesArray = [<Purchase />, <FrequentlyPurchase />];
    const { showCategoryNumber } = this.props;
    return <main>{categoryPagesArray[showCategoryNumber]}</main>;
  }
}

export default MyKurlyMain;
