import React, { Component } from "react";
import Header from "../../common/header/Header";

import "./Details.css";

export default class Details extends Component {
  render() {
    return (
      <Header
        displayItems={{
          displaySearchBar: false,
        }}
      />
    );
  }
}
