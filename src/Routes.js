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
import MyPage from "./Pages/MyPage/MyPage.component";

import "./Routes.scss";

class Routes extends Component {
  render() {
    return (
      <Router>
        <Nav />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/cartItems" component={CartItems} />
            <Route exact path="/productlist" component={ProductList} />
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
            <Route exact path="/mypage" component={MyPage} />
          </Switch>
        </div>
        <Footer />
      </Router>
    );
  }
}

export default Routes;
