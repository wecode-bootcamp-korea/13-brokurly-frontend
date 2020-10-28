import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import ProductList from "./Pages/ProductList/ProductList.component";
import SignupComponent from "./Pages/Signup/Signup.component";
import Nav from "./Components/Nav/Nav.component";
import Main from "./Pages/Main/Main.component";
import Footer from "./Components/Footer/Footer.component";
import CartItems from "./Pages/CartItems/CartItems.component";
import SearchId from "./Pages/Login/SearchId/SearchId.component";
import SearchPwd from "./Pages/Login/SearchPwd/SearchPwd.component";
import Login from "./Pages/Login/Login.component";
import Signup from "./Pages/Signup/Signup.component";
import MyPage from "./Pages/MyPage/MyPage.component";

import { getCartItems } from "./redux/cart/cart.actions";
import { getPurchaseList } from "./redux/purchase/purchase.actions";
import { getFrequentlyPurchaseItems } from "./redux/frequentlyPurchase/frequentlyPurchase.actions";

import {
  GET_SHOPPINGBASKET_API,
  GET_PURHCASE_LIST_API,
  GET_FREQUENTLY_PRODUCT_API,
} from "./config";

import "./App.scss";

class App extends Component {
  // componentDidUpdate() {
  //   const { userToken } = this.props;
  //   userToken && this.getCurrentUserCartAndProductData();
  // }

  // getCurrentUserCartAndProductData = () => {
  //   const {
  //     getCartItems,
  //     userToken,
  //     getPurchaseList,
  //     getFrequentlyPurchaseItems,
  //   } = this.props;

  //   fetch(GET_SHOPPINGBASKET_API, {
  //     headers: {
  //       "content-type": "application/json",
  //       Authorization: userToken,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => data["shopping_list"])
  //     .then((cartItems) => getCartItems(cartItems));

  //   fetch(GET_FREQUENTLY_PRODUCT_API, {
  //     headers: {
  //       "content-type": "application/json",
  //       Authorization: userToken,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => data.product_list)
  //     .then((product_list) => getFrequentlyPurchaseItems(product_list))
  //     .catch((error) => console.log(error));

  //   fetch(GET_PURHCASE_LIST_API, {
  //     headers: {
  //       "content-type": "application/json",
  //       Authorization: userToken,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => data.order_list)
  //     .then((purchaseList) => getPurchaseList(purchaseList))
  //     .catch((error) => console.log(error));
  // };

  // componentDidMount() {
  //   this.addScrollEventAndFetchCartItemList();
  // }

  // scrollNavBarChange = () => {
  //   const currentScrollTop = window.scrollY;
  //   if (currentScrollTop > 50 && this.state.hidden === false) {
  //     this.setState({ hidden: true });
  //     console.log("changed1");
  //   }

  //   if (currentScrollTop < 50 && this.state.hidden === true) {
  //     this.setState({ hidden: false });
  //     console.log("changed2");
  //   }
  // };

  // addScrollEventAndFetchCartItemList = () => {
  //   const { getCartItems, currentUser, userToken } = this.props;
  //   window.addEventListener("scroll", this.scrollNavBarChange);
  //   Object.keys(currentUser).length &&
  //     fetch(GET_SHOPPINGBASKET_API, {
  //       headers: {
  //         "content-type": "application/json",
  //         Authorization: userToken,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => data["shopping_list"])
  //       .then((cartItems) => getCartItems(cartItems));
  // };

  render() {
    return (
      <Router>
        <Nav />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/cartItems" component={CartItems} />
            <Route exact path="/productlist" component={ProductList} />
            <Route exact path="/signup" component={SignupComponent} />
            <Route exact path="/searchid" component={SearchId} />
            <Route exact path="/searchpwd" component={SearchPwd} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/mypage" component={MyPage} />
          </Switch>
        </div>
        <Footer />
      </Router>
    );
  }
}
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
  userToken: user.userToken,
});

export default connect(mapStateToProps, {
  getCartItems,
  getPurchaseList,
  getFrequentlyPurchaseItems,
})(App);
