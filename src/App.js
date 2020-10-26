import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import ProductList from "./Pages/ProductList/ProductList.component";
import SignupComponent from "./Pages/Signup/Signup.component";
import Nav from "./Components/Nav/Nav.component";
import Main from "./Pages/Main/Main.component";
import Footer from "./Components/Footer/Footer.component";
import CartItems from "./Pages/CartItems/CartItems.component";
import MyPage from "./Pages/MyPage/MyPage.component";

import { getCartItems } from "./redux/cart/cart.actions";

// For Testing Some Functions Before Launching
// import Test from "./Pages/Test/Test.component";

import "./App.scss";

class App extends Component {
  constructor() {
    super();
    this.state = {
      hidden: false,
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.scrollNavBarChange);
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
            <Route exact path="/mypage" component={MyPage} />
            <Route exact path="/signup" component={SignupComponent} />

            {/* <Route exact path="/test" component={Test} /> */}
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
