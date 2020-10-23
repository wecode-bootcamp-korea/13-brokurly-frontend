import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ProductList from "./Pages/ProductList/ProductList.component";
import Nav from "./Components/Nav/Nav.component";
import Main from "./Pages/Main/Main.component";
import Footer from "./Components/Footer/Footer.component";
import CartItems from "./Pages/CartItems/CartItems.component";

class App extends Component {
  constructor() {
    super();
    this.state = {
      hidden: false,
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.ScrollNavBarChange);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.ScrollNavBarChange);
  }

  ScrollNavBarChange = () => {
    const currentScrollTop = window.scrollY;
    if (currentScrollTop > 50) {
      this.setState({ hidden: true });
    } else {
      this.setState({ hidden: false });
    }
  };

  render() {
    return (
      <Router>
        <Nav hidden={this.state.hidden} />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/cartItems" component={CartItems} />
          <Route exact path="/productlist" component={ProductList} />
        </Switch>
        <Footer />
      </Router>
    );
  }
}
export default App;
