import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ProductList from "./Pages/ProductList/ProductList.component";
import ProductDetails from "./Pages/ProductDetails/ProductDetails.component";
import SignupComponent from "./Pages/Signup/Signup.component";
import Nav from "./Components/Nav/Nav.component";
import Main from "./Pages/Main/Main.component";
import Footer from "./Components/Footer/Footer.component";
import CartItems from "./Pages/CartItems/CartItems.component";
import SearchId from "./Pages/Login/SearchId/SearchId.component";
import SearchPwd from "./Pages/Login/SearchPwd/SearchPwd.component";
import Login from "./Pages/Login/Login.component";
import Signup from "./Pages/Signup/Signup.component";
import Payment from "./Pages/Payment/Payment.component";
import MyPage from "./Pages/MyPage/MyPage.component";
import SideMenu from "./Components/SideMenu/SideMenu.component";
import "./Routes.scss";

class Routes extends Component {
  constructor() {
    super();
    this.state = {
      hidden: false,
      lastScrollY: 0,
      position: -2,
    };
    this.container = React.createRef();
  }

  componentDidMount() {
    this.addSideMenuScrollEvent();
  }

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
          const scrollHeight = this.container.current.scrollHeight + 400 + 175;
          const scrollTotal = scrollHeight - window.innerHeight - 250;
          this.setState({ position: scrollY > scrollTotal ? 2 : 0 });
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
    const posToDefaultCondition = scrollY >= 100;
    const posToInitialCondition = scrollY < 100;
    const posOnScrollDownCondition =
      scrollY >= 100 && scrollY > this.state.lastScrollY;
    const posOnScrollUpCondition =
      scrollY >= 100 && scrollY < this.state.lastScrollY;
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
        <div className="container" ref={this.container}>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/cartItems" component={CartItems} />
            <Route exact path="/productlist/:name" component={ProductList} />
            <Route
              exact
              path="/productdetails/:id"
              component={ProductDetails}
            />
            <Route exact path="/signup" component={SignupComponent} />
            <Route exact path="/searchid" component={SearchId} />
            <Route exact path="/searchpwd" component={SearchPwd} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/payment" component={Payment} />
            <Route exact path="/mypage" component={MyPage} />
          </Switch>
        </div>
        <SideMenu position={position} />
        <Footer />
      </Router>
    );
  }
}
export default Routes;
