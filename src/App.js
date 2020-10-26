import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ProductList from "./Pages/ProductList/ProductList.component";
import Nav from "./Components/Nav/Nav.component";
import Main from "./Pages/Main/Main.component";
import Footer from "./Components/Footer/Footer.component";
import CartItems from "./Pages/CartItems/CartItems.component";
import MyPage from "./Pages/MyPage/MyPage.component";

// For Testing Some Functions Before Launching
import Test from "./Pages/Test/Test.component";

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
            <Route exact path="/test" component={Test} />
          </Switch>
        </div>
        <Footer />
      </Router>
    );
  }
}

export default App;
