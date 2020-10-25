import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import ProductList from "./Pages/ProductList/ProductList.component";
import Nav from "./Components/Nav/Nav.component";
import Main from "./Pages/Main/Main.component";
import Footer from "./Components/Footer/Footer.component";
import CartItems from "./Pages/CartItems/CartItems.component";

// For Testing Some Functions Before Launching
import Test from "./Pages/Test/Test.component";

import { getCartItems } from "./redux/cart/cart.actions";

import { GET_SHOPPINGBASKET_API } from "./config";
import { USER_TOKEN } from "./config";

import "./App.scss";

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
        Authorization: USER_TOKEN,
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
            <Route exact path="/test" component={Test} />
          </Switch>
        </div>
        <Footer />
      </Router>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  getCartItems: (cartItems) => dispatch(getCartItems(cartItems)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
