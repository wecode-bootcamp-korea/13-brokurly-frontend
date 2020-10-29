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
import SideMenu from "./Components/SideMenu/SideMenu.component";

import { getCartItems } from "./redux/cart/cart.actions";

import { GET_SHOPPINGBASKET_API } from "./config";
import { USER_TOKEN } from "./config";

import "./App.scss";

class App extends Component {
  constructor() {
    super();
    this.state = {
      hidden: false,
      lastScrollY: 0,
      position: -2,
      sideMenuTranslateY: 0,
    };
    this.container = React.createRef();
  }

  componentDidMount() {
    this.addScrollEventAndFetchCartItemList();
    this.addSideMenuScrollEvent();
  }

  scrollNavBarChange = () => {
    const currentScrollTop = window.scrollY;
    if (currentScrollTop > 50 && this.state.hidden === false)
      this.setState({ hidden: true });

    if (currentScrollTop < 50 && this.state.hidden === true)
      this.setState({ hidden: false });
  };

  addScrollEventAndFetchCartItemList = () => {
    const { getCartItems, currentUser } = this.props;
    window.addEventListener("scroll", this.scrollNavBarChange);
    Object.keys(currentUser).length &&
      fetch(GET_SHOPPINGBASKET_API, {
        headers: {
          "content-type": "application/json",
          Authorization: USER_TOKEN,
        },
      })
        .then((res) => res.json())
        .then((data) => data["shopping_list"])
        .then((cartItems) => getCartItems(cartItems));
  };

  addSideMenuScrollEvent = () => {
    window.addEventListener("scroll", this.toggleSideMenuPosition);
    this.setState({
      lastScrollY: window.scrollY,
    });
  };

  onScrollDown = () => {
    this.setState(
      {
        position: -1,
      },
      () => {
        setTimeout(() => {
          const scrollY = window.scrollY;
          this.setState({ position: scrollY > 5650 ? 2 : 0 });
        }, 200);
      }
    );
  };

  onScrollUp = () => {
    this.setState(
      {
        position: 1,
      },
      () => {
        setTimeout(() => {
          const scrollY = window.scrollY;
          this.setState({ position: scrollY === 0 ? -2 : 0 });
        }, 200);
      }
    );
  };

  toggleSideMenuPosition = () => {
    const scrollY = window.scrollY;
    const posToDefaultCondition = scrollY >= 240;
    const posToInitialCondition = scrollY < 240;
    const posOnScrollDownCondition =
      scrollY >= 240 && scrollY > this.state.lastScrollY;
    const posOnScrollUpCondition =
      scrollY >= 240 && scrollY < this.state.lastScrollY;
    let position = -2;
    this.setState({
      lastScrollY: scrollY,
    });
    if (posToDefaultCondition) position = 0;
    if (posToInitialCondition) position = -2;
    if (posOnScrollDownCondition) {
      this.onScrollDown();
    } else if (posOnScrollUpCondition) {
      this.onScrollUp();
    } else {
      this.setState({
        position,
      });
    }
  };

  render() {
    const { hidden, position } = this.state;
    return (
      <Router>
        <Nav hidden={hidden} />
        <div
          className="container"
          ref={this.container}
          onScroll={this.toggleSideMenuPosition}
        >
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/cartItems" component={CartItems} />
            <Route exact path="/productlist" component={ProductList} />
            <Route exact path="/signup" component={SignupComponent} />
            <Route exact path="/searchid" component={SearchId} />
            <Route exact path="/searchpwd" component={SearchPwd} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
        <SideMenu position={position} />
        <Footer />
      </Router>
    );
  }
}
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

export default connect(mapStateToProps, { getCartItems })(App);
