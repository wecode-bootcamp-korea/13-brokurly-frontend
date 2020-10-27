import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Nav from "./Components/Nav/Nav.component";
import Main from "./Pages/Main/Main.component";
import Footer from "./Components/Footer/Footer.component";
import ProductList from "./Pages/ProductList/ProductList.component";
import ProductDetails from "./Pages/ProductDetails/ProductDetails.component";
import SearchId from "./Pages/Login/SearchId/SearchId.component";
import SearchPwd from "./Pages/Login/SearchPwd/SearchPwd.component";
import Login from "./Pages/Login/Login.component";
import Signup from "./Pages/Signup/Signup.component";

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/productlist" component={ProductList} />
        <Route exact path="/productdetails/:id" component={ProductDetails} />
        <Route exact path="/searchid" component={SearchId} />
        <Route exact path="/searchpwd" component={SearchPwd} />
        <Route exact path="/signup" component={Signup} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
