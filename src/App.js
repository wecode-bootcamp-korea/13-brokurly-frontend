import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import ProductList from "./Pages/ProductList/ProductList.component";
import Nav from "./Components/Nav/Nav.component";
import Main from "./Pages/Main/Main.component";
import Footer from "./Components/Footer/Footer.component";
import CartItems from "./Pages/CartItems/CartItems.component";

import { getCartItems } from "./redux/cart/cart.actions";

import "./App.scss";
import { GET_SHOPPINGBASKET_API } from "./config";

class App extends Component {
  constructor() {
    super();
    this.state = {
      hidden: false,
    };
  }

  componentDidMount() {
    const { getCartItems } = this.props;
    window.addEventListener("scroll", this.scrollNavBarChange);
    fetch(GET_SHOPPINGBASKET_API, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiaGFydW0ifQ.nMUcgev8vz4rbQY-3z2F0tFFSKQjBMgwCVWOOTm91Qw",
      },
    })
      .then((res) => res.json())
      .then((data) => data["shopping_list"])
      .then((cartItems) => getCartItems(cartItems));
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollNavBarChange);
  }

  scrollNavBarChange = () => {
    const currentScrollTop = window.scrollY;
    this.setState({ hidden: currentScrollTop > 50 });
  };

  render() {
    const { hidden } = this.state;
    return (
      <Router>
        <Nav hidden={hidden} />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/cartItems" component={CartItems} />
            <Route exact path="/productlist" component={ProductList} />
          </Switch>
        </div>
        <Footer />
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCartItems: (cartItems) => dispatch(getCartItems(cartItems)),
});

export default connect(null, mapDispatchToProps)(App);
