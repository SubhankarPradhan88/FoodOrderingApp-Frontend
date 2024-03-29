import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "../screens/home/Home";
import { Profile } from "../screens/profile/Profile";
import Details from "./details/Details";
import Checkout from "../screens/checkout/Checkout";


class Controller extends Component {
  constructor(props) {
    super(props);
    this.baseUrl = "http://localhost:8080/api/";
  }
  render() {
    return (
      <Router>
        <div>
          {/* Handle routing of respective components */}
          <Route
            exact
            path="/"
            render={(props) => <Home {...props} baseUrl={this.baseUrl} />}
          />
          <Route
            exact
            path="/profile"
            render={(props) => <Profile {...props} baseUrl={this.baseUrl} />}
          />
          <Route
            exact
            path="/restaurant/:id"
            render={(props) => <Details {...props} baseUrl={this.baseUrl} />}
          />
          <Route
            exact
            path="/checkout"
            render={(props) => <Checkout {...props} baseUrl={this.baseUrl} />}
          />
        </div>
      </Router>
    );
  }
}

export default Controller;
