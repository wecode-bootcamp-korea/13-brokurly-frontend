import React, { Component } from "react";

import { connect } from "react-redux";

import { getCartItems } from "../../redux/cart/cart.actions";
import { getFrequentlyPurchaseItems } from "../../redux/frequentlyPurchase/frequentlyPurchase.actions";
import { getPurchaseList } from "../../redux/purchase/purchase.actions";

import {
  GET_SHOPPINGBASKET_API,
  GET_FREQUENTLY_PRODUCT_API,
  GET_PURHCASE_LIST_API,
} from "../../config";

import "./Main.styles.scss";

class Main extends Component {
  componentDidMount() {
    const {
      userToken,
      getCartItems,
      getFrequentlyPurchaseItems,
      getPurchaseList,
    } = this.props;

    fetch(GET_SHOPPINGBASKET_API, {
      headers: {
        "content-type": "application/json",
        Authorization: userToken,
      },
    })
      .then((res) => res.json())
      .then((data) => data.shopping_list)
      .then((cartItems) => getCartItems(cartItems))
      .catch((error) => console.log(error));

    fetch(GET_FREQUENTLY_PRODUCT_API, {
      headers: {
        "content-type": "application/json",
        Authorization: userToken,
      },
    })
      .then((res) => res.json())
      .then((data) => data.product_list)
      .then((product_list) => getFrequentlyPurchaseItems(product_list))
      .catch((error) => console.log(error));

    fetch(GET_PURHCASE_LIST_API, {
      headers: {
        "content-type": "application/json",
        Authorization: userToken,
      },
    })
      .then((res) => res.json())
      .then((data) => data.order_list)
      .then((purchaseList) => getPurchaseList(purchaseList))
      .catch((error) => console.log(error));
  }
  render() {
    return <div></div>;
  }
}

const mapStateToProps = ({ user }) => ({
  userToken: user.userToken,
});

const mapDispatchToProps = (dispatch) => ({
  getCartItems: (cartItems) => dispatch(getCartItems(cartItems)),
  getFrequentlyPurchaseItems: (purchaseItems) =>
    dispatch(getFrequentlyPurchaseItems(purchaseItems)),
  getPurchaseList: (purchaseItems) => dispatch(getPurchaseList(purchaseItems)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
